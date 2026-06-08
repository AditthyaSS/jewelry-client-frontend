const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let newContent = content
    .replace(/bg-onyx-light/g, 'bg-beige-light')
    .replace(/bg-onyx/g, 'bg-beige')
    .replace(/text-ivory/g, 'text-onyx')
    .replace(/border-ivory/g, 'border-onyx')
    .replace(/from-onyx/g, 'from-beige')
    .replace(/via-onyx/g, 'via-beige')
    .replace(/to-onyx/g, 'to-beige')
    // Handle dynamic template strings where onyx/ivory might be used
    .replace(/text-ivory\//g, 'text-onyx/')
    .replace(/border-ivory\//g, 'border-onyx/')
    .replace(/from-onyx\//g, 'from-beige/')
    .replace(/via-onyx\//g, 'via-beige/')
    .replace(/to-onyx\//g, 'to-beige/');
  
  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log('Updated', filePath);
  }
}

function walk(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (fullPath.endsWith('.tsx')) {
      replaceInFile(fullPath);
    }
  }
}

walk(path.join(__dirname, 'app'));
walk(path.join(__dirname, 'components'));
