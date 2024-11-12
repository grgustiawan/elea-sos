const { PDFDocument } = require('pdf-lib');
const fs = require('fs').promises;
const path = require('path');
const app = require('../app');

rootdir = app.locals.appRoot;
const mergePDF = async(leave, attachment, outputPath) => {
  if(!leave || !attachment || !outputPath){
    console.log("Invalid parameter input")
    return;
  }
  
  const pdfPaths = [leave, attachment]
  const mergedPdf = await PDFDocument.create();

  for (const pdfPath of pdfPaths) {
    const pdfBytes = await fs.readFile(pdfPath);
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const copiedPages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
    copiedPages.forEach((page) => mergedPdf.addPage(page));
  }

  const mergedPdfBytes = await mergedPdf.save();
  await fs.writeFile(outputPath, mergedPdfBytes);
  console.log(`File merged to ${outputPath}`)
}

export default {mergePDF}