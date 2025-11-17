#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const baseDir = '/Users/andersongomes/anderson-cleaning';
const results = {
  missingFiles: [],
  unusedFiles: [],
  unusedExports: [],
  unusedImports: [],
  deadRoutes: [],
  orphanedComponents: []
};

// Get all TS/TSX files
function getAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      if (!file.includes('node_modules') && !file.startsWith('.')) {
        getAllFiles(filePath, fileList);
      }
    } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

// Extract imports from a file
function extractImports(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const imports = [];

  // Match various import patterns
  const importRegex = /import\s+(?:{[^}]+}|[\w\s,]+)\s+from\s+['"]([^'"]+)['"]/g;
  let match;

  while ((match = importRegex.exec(content)) !== null) {
    imports.push(match[1]);
  }

  return imports;
}

// Check if import is used
function isImportUsed(codebase, importPath) {
  try {
    const result = execSync(
      `grep -r "from '${importPath}'" "${baseDir}" --include="*.tsx" --include="*.ts" --exclude-dir=node_modules 2>/dev/null | wc -l`,
      { encoding: 'utf-8' }
    );
    return parseInt(result.trim()) > 0;
  } catch (e) {
    return false;
  }
}

// Check if file is imported anywhere
function isFileImported(filePath) {
  const relativePath = filePath.replace(baseDir + '/', '');
  const importPaths = [
    '@/' + relativePath.replace(/\.(tsx?|jsx?)$/, ''),
    './' + relativePath.replace(/\.(tsx?|jsx?)$/, ''),
    '../' + relativePath.replace(/\.(tsx?|jsx?)$/, '')
  ];

  for (const importPath of importPaths) {
    try {
      const result = execSync(
        `grep -r "from.*${importPath.split('/').pop()}" "${baseDir}" --include="*.tsx" --include="*.ts" --exclude-dir=node_modules 2>/dev/null | wc -l`,
        { encoding: 'utf-8' }
      );
      if (parseInt(result.trim()) > 1) { // More than just self-reference
        return true;
      }
    } catch (e) {
      continue;
    }
  }

  return false;
}

console.log('Starting dead code analysis...\n');

// Get all files
const appFiles = getAllFiles(path.join(baseDir, 'app'));
const componentFiles = getAllFiles(path.join(baseDir, 'components'));
const libFiles = getAllFiles(path.join(baseDir, 'lib'));
const allFiles = [...appFiles, ...componentFiles, ...libFiles];

console.log(`Found ${allFiles.length} files to analyze\n`);

// Check for missing imports
console.log('Checking for missing imports...');
const layoutContent = fs.readFileSync(path.join(baseDir, 'app/layout.tsx'), 'utf-8');
const missingImports = [
  'Header',
  'Footer',
  'ConsentInit',
  'CookieBanner',
  'WebVitalsReporter',
  'SkipLink',
  'AccessibilityProvider'
];

missingImports.forEach(component => {
  const componentPath = path.join(baseDir, 'components', `${component}.tsx`);
  if (!fs.existsSync(componentPath)) {
    results.missingFiles.push(`components/${component}.tsx - Referenced in app/layout.tsx but file doesn't exist`);
  }
});

// Check for orphaned components
console.log('Checking for orphaned components...');
componentFiles.forEach(file => {
  const filename = path.basename(file, path.extname(file));

  // Skip test pages and templates
  if (filename === 'ComponentTemplate' || file.includes('/_templates/')) {
    return;
  }

  // Check if file is imported
  if (!isFileImported(file)) {
    const relativePath = file.replace(baseDir + '/', '');
    results.orphanedComponents.push(relativePath);
  }
});

// Output results
console.log('\n=== ANALYSIS COMPLETE ===\n');
console.log(JSON.stringify(results, null, 2));

// Write results to file
fs.writeFileSync(
  path.join(baseDir, 'dead-code-report.json'),
  JSON.stringify(results, null, 2)
);

console.log('\nReport saved to dead-code-report.json');
