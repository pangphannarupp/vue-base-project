import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcDir = path.join(__dirname, 'src');
const testsDir = path.join(__dirname, 'tests');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

function processFiles() {
  if (!fs.existsSync(testsDir)) {
    fs.mkdirSync(testsDir);
  }

  walkDir(srcDir, (filePath) => {
    if (filePath.includes('__tests__') && filePath.endsWith('.ts')) {
      // E.g. src/components/__tests__/WeatherCard.spec.ts
      const relativeToSrc = path.relative(srcDir, filePath); 
      // E.g. components/__tests__/WeatherCard.spec.ts
      const parts = relativeToSrc.split(path.sep);
      const testIndex = parts.indexOf('__tests__');
      
      // Remove __tests__ from the path
      parts.splice(testIndex, 1);
      const newRelativePath = parts.join(path.sep); // e.g. components/WeatherCard.spec.ts
      const newFilePath = path.join(testsDir, newRelativePath);
      
      // Create directories
      fs.mkdirSync(path.dirname(newFilePath), { recursive: true });
      
      let content = fs.readFileSync(filePath, 'utf-8');
      
      // Rewrite imports. We only care about relative imports like '.' or '..'
      // Original file path: filePath
      // New file path: newFilePath
      content = content.replace(/(from\s+['"])([^'"]+)(['"])/g, (match, p1, p2, p3) => {
        if (p2.startsWith('.')) {
          const absoluteImportTarget = path.resolve(path.dirname(filePath), p2);
          let newRelativeImport = path.relative(path.dirname(newFilePath), absoluteImportTarget);
          if (!newRelativeImport.startsWith('.')) {
            newRelativeImport = './' + newRelativeImport;
          }
          return p1 + newRelativeImport + p3;
        }
        return match;
      });
      
      fs.writeFileSync(newFilePath, content);
      fs.unlinkSync(filePath);
      
      // try remove __tests__ dir if empty
      try {
        fs.rmdirSync(path.dirname(filePath));
      } catch (e) {}
    }
  });
}

processFiles();
