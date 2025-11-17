/**
 * File Upload Security
 *
 * Provides utilities for secure file upload handling, including
 * MIME type validation, magic byte checking, and filename generation.
 */

import fileType from 'file-type'
import crypto from 'crypto'

/**
 * Allowed file types for resume uploads
 */
export const ALLOWED_RESUME_TYPES = {
  'application/pdf': ['.pdf'],
  'application/msword': ['.doc'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
  'text/plain': ['.txt'],
  'application/rtf': ['.rtf'],
} as const

/**
 * Allowed file types for image uploads
 */
export const ALLOWED_IMAGE_TYPES = {
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/png': ['.png'],
  'image/webp': ['.webp'],
  'image/gif': ['.gif'],
} as const

/**
 * Magic bytes (file signatures) for common file types
 */
const MAGIC_BYTES = {
  pdf: [0x25, 0x50, 0x44, 0x46], // %PDF
  docx: [0x50, 0x4b, 0x03, 0x04], // PK.. (ZIP format)
  doc: [0xd0, 0xcf, 0x11, 0xe0], // DOC format
  jpg: [0xff, 0xd8, 0xff],
  png: [0x89, 0x50, 0x4e, 0x47],
  gif: [0x47, 0x49, 0x46, 0x38],
  webp: [0x52, 0x49, 0x46, 0x46], // RIFF (needs additional check)
} as const

/**
 * Maximum file sizes (in bytes)
 */
export const MAX_FILE_SIZES = {
  resume: 5 * 1024 * 1024, // 5MB
  image: 10 * 1024 * 1024, // 10MB
  general: 25 * 1024 * 1024, // 25MB
} as const

export interface FileValidationResult {
  valid: boolean
  error?: string
  mimeType?: string
  extension?: string
  size?: number
}

/**
 * Validate file size
 */
export function validateFileSize(
  size: number,
  maxSize: number
): { valid: boolean; error?: string } {
  if (size > maxSize) {
    const maxSizeMB = (maxSize / 1024 / 1024).toFixed(1)
    return {
      valid: false,
      error: `File size exceeds maximum allowed size of ${maxSizeMB}MB`,
    }
  }
  return { valid: true }
}

/**
 * Check if buffer starts with magic bytes
 */
function checkMagicBytes(buffer: Buffer, magicBytes: readonly number[]): boolean {
  if (buffer.length < magicBytes.length) return false

  for (let i = 0; i < magicBytes.length; i++) {
    if (buffer[i] !== magicBytes[i]) return false
  }

  return true
}

/**
 * Validate file type using magic bytes
 */
export async function validateFileType(
  buffer: Buffer,
  expectedMimeType: string
): Promise<{ valid: boolean; error?: string; detectedType?: string }> {
  try {
    // Use file-type library to detect actual MIME type
    const detectedFileType = await fileType.fromBuffer(buffer)

    if (!detectedFileType) {
      return {
        valid: false,
        error: 'Could not determine file type',
      }
    }

    // Check if detected MIME type matches expected
    if (detectedFileType.mime !== expectedMimeType) {
      // Special case: DOCX files are ZIP archives
      if (
        expectedMimeType ===
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document' &&
        detectedFileType.mime === 'application/zip'
      ) {
        // Additional check for DOCX structure
        const isDocx = await validateDocxStructure(buffer)
        if (isDocx) {
          return { valid: true, detectedType: detectedFileType.mime }
        }
      }

      return {
        valid: false,
        error: `File type mismatch. Expected ${expectedMimeType}, but detected ${detectedFileType.mime}`,
        detectedType: detectedFileType.mime,
      }
    }

    return { valid: true, detectedType: detectedFileType.mime }
  } catch (error) {
    return {
      valid: false,
      error: 'Failed to validate file type',
    }
  }
}

/**
 * Validate DOCX structure (ZIP with specific files)
 */
async function validateDocxStructure(buffer: Buffer): Promise<boolean> {
  // Check for ZIP signature
  if (!checkMagicBytes(buffer, MAGIC_BYTES.docx)) {
    return false
  }

  // For more thorough validation, you could use a ZIP library
  // to check for required DOCX files like [Content_Types].xml
  // For now, we'll accept the ZIP signature as sufficient

  return true
}

/**
 * Scan for executable content in file
 * Checks for common executable signatures and script patterns
 */
export function scanForExecutableContent(buffer: Buffer): {
  safe: boolean
  threat?: string
} {
  // Check for executable signatures
  const executableSignatures = [
    [0x4d, 0x5a], // MZ (Windows executable)
    [0x7f, 0x45, 0x4c, 0x46], // ELF (Linux executable)
    [0xca, 0xfe, 0xba, 0xbe], // Mach-O (macOS executable)
    [0x23, 0x21], // #! (Shell script)
  ]

  for (const signature of executableSignatures) {
    if (checkMagicBytes(buffer, signature)) {
      return {
        safe: false,
        threat: 'Executable file detected',
      }
    }
  }

  // Check for embedded scripts in first 1KB
  const head = buffer.slice(0, 1024).toString('utf-8', 0, 1024)
  const scriptPatterns = [
    /<script/i,
    /javascript:/i,
    /vbscript:/i,
    /on\w+\s*=/i, // Event handlers like onclick=
    /<iframe/i,
    /<object/i,
    /<embed/i,
  ]

  for (const pattern of scriptPatterns) {
    if (pattern.test(head)) {
      return {
        safe: false,
        threat: 'Potential script content detected',
      }
    }
  }

  return { safe: true }
}

/**
 * Generate a secure random filename
 */
export function generateSecureFilename(originalFilename: string): string {
  // Extract extension
  const extension = originalFilename.split('.').pop()?.toLowerCase() || ''

  // Generate random name
  const randomName = crypto.randomBytes(16).toString('hex')

  // Combine with timestamp for uniqueness
  const timestamp = Date.now()

  return extension ? `${timestamp}-${randomName}.${extension}` : `${timestamp}-${randomName}`
}

/**
 * Comprehensive file validation
 * Validates size, MIME type, magic bytes, and scans for threats
 */
export async function validateUploadedFile(
  buffer: Buffer,
  originalFilename: string,
  expectedMimeType: string,
  maxSize: number
): Promise<FileValidationResult> {
  // Validate file size
  const sizeCheck = validateFileSize(buffer.length, maxSize)
  if (!sizeCheck.valid) {
    return { valid: false, error: sizeCheck.error }
  }

  // Validate file type
  const typeCheck = await validateFileType(buffer, expectedMimeType)
  if (!typeCheck.valid) {
    return { valid: false, error: typeCheck.error }
  }

  // Scan for executable content
  const securityCheck = scanForExecutableContent(buffer)
  if (!securityCheck.safe) {
    return {
      valid: false,
      error: `File rejected: ${securityCheck.threat}`,
    }
  }

  return {
    valid: true,
    mimeType: typeCheck.detectedType,
    size: buffer.length,
  }
}

/**
 * Validate resume file specifically
 */
export async function validateResumeFile(
  buffer: Buffer,
  originalFilename: string,
  mimeType: string
): Promise<FileValidationResult> {
  // Check if MIME type is allowed
  if (!Object.keys(ALLOWED_RESUME_TYPES).includes(mimeType)) {
    return {
      valid: false,
      error: 'Invalid file type. Allowed types: PDF, DOC, DOCX, TXT, RTF',
    }
  }

  return validateUploadedFile(buffer, originalFilename, mimeType, MAX_FILE_SIZES.resume)
}

/**
 * Validate image file specifically
 */
export async function validateImageFile(
  buffer: Buffer,
  originalFilename: string,
  mimeType: string
): Promise<FileValidationResult> {
  // Check if MIME type is allowed
  if (!Object.keys(ALLOWED_IMAGE_TYPES).includes(mimeType)) {
    return {
      valid: false,
      error: 'Invalid file type. Allowed types: JPEG, PNG, WebP, GIF',
    }
  }

  return validateUploadedFile(buffer, originalFilename, mimeType, MAX_FILE_SIZES.image)
}

/**
 * Get safe content-type header for serving files
 * Prevents browsers from executing uploaded files
 */
export function getSafeContentType(mimeType: string): string {
  // For potentially dangerous types, force download
  const dangerousTypes = [
    'text/html',
    'application/javascript',
    'text/javascript',
    'application/x-javascript',
  ]

  if (dangerousTypes.includes(mimeType)) {
    return 'application/octet-stream'
  }

  return mimeType
}

/**
 * Generate secure file upload response headers
 */
export function getSecureFileHeaders(filename: string, mimeType: string): Record<string, string> {
  return {
    'Content-Type': getSafeContentType(mimeType),
    'Content-Disposition': `attachment; filename="${filename}"`,
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'Cache-Control': 'private, no-cache, no-store, must-revalidate',
  }
}

/**
 * Clean up temporary uploaded files
 */
export async function cleanupTempFile(filepath: string): Promise<void> {
  try {
    const fs = await import('fs/promises')
    await fs.unlink(filepath)
  } catch (error) {
    console.error('Failed to cleanup temp file:', filepath, error)
  }
}
