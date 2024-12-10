const express = require("express");
const multer = require("multer");
const path = require("path");
const { extractText } = require("./ocr");

const app = express();
const PORT = 5000;

// Set up multer for file uploads
const upload = multer({ dest: "uploads/" });

// Endpoint for OCR text extraction
app.post("/extract-text", upload.single("image"), async (req, res) => {
  try {
    const imagePath = req.file.path; // Path to uploaded image
    const extractedText = await extractText(imagePath); // Call the OCR function

    res.json({ text: extractedText });
  } catch (error) {
    console.error("Error during OCR processing:", error);
    res.status(500).json({ error: "OCR processing failed" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
