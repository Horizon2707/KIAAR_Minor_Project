const { load } = require("@pspdfkit/nodejs");
const fs = require("fs").promises; // Use fs.promises for async file operations
const path = require("path");

const alone = async () => {
  const inputPath = path.resolve(__dirname, "/output.xlsx"); // Absolute path to input Excel file
  const outputPath = path.resolve(__dirname, "/converted.pdf"); // Absolute path to output PDF file

  const docx = await fs.readFile(inputPath); // Read the Excel file asynchronously
  const instance = await load({ document: docx });
  const buffer = await instance.exportPDF();
  await fs.writeFile(outputPath, Buffer.from(buffer)); // Write the PDF buffer to a file
  await instance.close();
};

alone()
  .then(() => console.log("Conversion completed"))
  .catch((error) => console.error("Error:", error));
