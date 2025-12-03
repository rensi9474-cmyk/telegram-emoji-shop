// convert-tgs.js
// Script untuk batch convert semua file .tgs ke .json

const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const inputDir = path.join(__dirname, 'public/emoji');   // folder tempat file .tgs
const outputDir = path.join(__dirname, 'public/emoji');  // hasil .json disimpan di folder sama

fs.readdirSync(inputDir).forEach(file => {
  if (file.endsWith('.tgs')) {
    const filePath = path.join(inputDir, file);
    const outputFile = path.join(outputDir, file.replace('.tgs', '.json'));

    const compressed = fs.readFileSync(filePath);
    const decompressed = zlib.gunzipSync(compressed);

    fs.writeFileSync(outputFile, decompressed);
    console.log(`✅ Converted: ${file} → ${path.basename(outputFile)}`);
  }
});
