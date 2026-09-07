const fs = require('fs');

const pngPath = 'D:\\Computer science\\Kavach\\kavach\\public\\images\\balidan.png';
const svgPath = 'D:\\Computer science\\Kavach\\kavach\\public\\images\\balidan.svg';

const imageBuf = fs.readFileSync(pngPath);
const base64Data = imageBuf.toString('base64');
const dataUri = `data:image/png;base64,${base64Data}`;

// Wrap the png inside an svg. We will use a generic viewBox, but the image tag will preserve aspect ratio if we use 100%.
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 1000 1000">
  <image href="${dataUri}" width="1000" height="1000" preserveAspectRatio="xMidYMid meet" />
</svg>`;

fs.writeFileSync(svgPath, svgContent);
console.log('Conversion complete. SVG created at: ' + svgPath);
