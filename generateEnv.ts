import * as fs from 'fs';
import * as path from 'path';

// Get the root directory (where the script is located)
const rootDir = __dirname;

// Define source and destination paths
const sourcePath = path.join(rootDir, '.env.template');
const destinationPath = path.join(rootDir, '.env.local');

try {
  // Copy the file (will overwrite if exists)
  fs.copyFileSync(sourcePath, destinationPath);
  
  // Log success message
  console.log('✅ .env.local has been created from .env.template');
} catch (error) {
  console.error('❌ Error copying .env.template to .env.local:', error);
  process.exit(1);
}