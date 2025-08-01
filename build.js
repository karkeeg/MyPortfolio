const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Copy index.html from root to public directory
const rootIndexPath = path.join(__dirname, 'index.html');
const publicIndexPath = path.join(__dirname, 'public', 'index.html');

try {
  // Read the index.html from root
  const indexContent = fs.readFileSync(rootIndexPath, 'utf8');
  
  // Write it to public directory
  fs.writeFileSync(publicIndexPath, indexContent);
  
  console.log('✅ Successfully copied index.html from root to public directory');
  
  // Run the original build command
  console.log('🚀 Starting React build...');
  execSync('react-scripts build', { stdio: 'inherit' });
  
  console.log('✅ Build completed successfully!');
  
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
} 