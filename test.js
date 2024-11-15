const fs = require("fs");
const path = require("path");

const inputDir = path.join(
  __dirname,
  "C:UsersRAHULDesktopEcommerceBackendBackendmodels"
);
const outputFilePath = path.join(__dirname, "merged.txt");

// Function to read and merge file contents
async function mergeFiles() {
  try {
    // Get all files from the input directory
    const files = fs.readdirSync(inputDir);
    let mergedContent = "";

    // Read each file and append its content
    for (const file of files) {
      const filePath = path.join(inputDir, file);

      // Check if it's a file (and not a directory)
      if (fs.statSync(filePath).isFile()) {
        console.log(`Reading file: ${file}`);
        const content = fs.readFileSync(filePath, "utf-8");
        mergedContent += `\n=== Content of ${file} ===\n`;
        mergedContent += content + "\n";
      }
    }

    // Write merged content to the output file
    fs.writeFileSync(outputFilePath, mergedContent, "utf-8");
    console.log(`Merged content written to ${outputFilePath}`);
  } catch (error) {
    console.error("Error while merging files:", error);
  }
}

// Execute the function
mergeFiles();
