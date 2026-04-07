import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const dirs = [
  './public/assets',
  './src/assets'
];

const maxDimension = 1200;

async function processImages() {
  for (const inputDir of dirs) {
    if (!fs.existsSync(inputDir)) {
      console.log(`Skipping ${inputDir} (not found)`);
      continue;
    }

    const files = fs.readdirSync(inputDir).filter(f => /\.(jpe?g|png)$/i.test(f));
    console.log(`\n[${inputDir}] Found ${files.length} images to optimize...`);

    let totalOriginal = 0;
    let totalConverted = 0;

    for (const file of files) {
      const inputPath = path.join(inputDir, file);
      const newFileName = file.replace(/\.(jpe?g|png)$/i, '.webp');
      const outputPath = path.join(inputDir, newFileName);

      const originalSize = fs.statSync(inputPath).size;
      totalOriginal += originalSize;

      try {
        await sharp(inputPath)
          .resize({
            width: maxDimension,
            height: maxDimension,
            fit: 'inside',
            withoutEnlargement: true
          })
          .webp({ quality: 75 })
          .toFile(outputPath);

        const newSize = fs.statSync(outputPath).size;
        totalConverted += newSize;
        const savings = ((1 - newSize / originalSize) * 100).toFixed(1);

        // Delete original after successful conversion
        fs.unlinkSync(inputPath);
        console.log(`  ✓ ${file} -> ${newFileName}  (${(originalSize / 1024).toFixed(0)}KB -> ${(newSize / 1024).toFixed(0)}KB, -${savings}%)`);
      } catch (err) {
        console.error(`  ✗ Error processing ${file}:`, err.message);
      }
    }

    if (files.length > 0) {
      console.log(`\n  [${inputDir}] Summary:`);
      console.log(`    Original: ${(totalOriginal / 1024 / 1024).toFixed(2)} MB`);
      console.log(`    Converted: ${(totalConverted / 1024 / 1024).toFixed(2)} MB`);
      console.log(`    Saved: ${((totalOriginal - totalConverted) / 1024 / 1024).toFixed(2)} MB (${((1 - totalConverted / totalOriginal) * 100).toFixed(1)}%)`);
    }
  }
}

processImages();
