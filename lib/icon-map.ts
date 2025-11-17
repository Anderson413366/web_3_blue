/**
 * Icon Mapping Utility
 *
 * Maps string icon names to actual Lucide React components.
 * This allows case study data to be serializable (Server Component compatible)
 * while still using actual icon components in Client Components.
 *
 * Usage:
 * ```tsx
 * import { getIconComponent } from '@/lib/icon-map'
 *
 * const IconComponent = getIconComponent('Heart')
 * return <IconComponent className="h-5 w-5" />
 * ```
 */

import {
  Heart,
  Building2,
  Factory,
  // Add more icons here as needed for future case studies
  Briefcase,
  GraduationCap,
  ShoppingBag,
  Stethoscope,
  Warehouse,
  // Process steps icons
  ClipboardCheck,
  FileText,
  Users,
  CheckCircle2,
  type LucideIcon,
} from 'lucide-react'

/**
 * Map of icon names to Lucide icon components
 */
const iconMap: Record<string, LucideIcon> = {
  Heart,
  Building2,
  Factory,
  Briefcase,
  GraduationCap,
  ShoppingBag,
  Stethoscope,
  Warehouse,
  ClipboardCheck,
  FileText,
  Users,
  CheckCircle2,
}

/**
 * Get an icon component by its string name
 *
 * @param iconName - The name of the icon (e.g., 'Heart', 'Building2')
 * @returns The Lucide icon component, or a default icon if not found
 */
export function getIconComponent(iconName: string): LucideIcon {
  const icon = iconMap[iconName]

  if (!icon) {
    console.warn(`Icon "${iconName}" not found in icon map. Using default Briefcase icon.`)
    return Briefcase
  }

  return icon
}

/**
 * Check if an icon exists in the map
 *
 * @param iconName - The name of the icon to check
 * @returns True if the icon exists, false otherwise
 */
export function hasIcon(iconName: string): boolean {
  return iconName in iconMap
}

/**
 * Get all available icon names
 *
 * @returns Array of all icon names in the map
 */
export function getAvailableIcons(): string[] {
  return Object.keys(iconMap)
}
