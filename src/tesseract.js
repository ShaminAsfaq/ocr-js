const { createWorker } = require('tesseract.js');

const worker = createWorker({
//   logger: m => console.log(m), // Add logger here
});

export {
    worker as default
}


