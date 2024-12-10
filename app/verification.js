import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TextRecognition from "react-native-text-recognition";
import { View, Text, Image, StyleSheet } from "react-native";

const ExtractDetailsFromImage = () => {
  const frontImage = useSelector((state) => state.cnic.frontImage); // Get the front image from Redux
  const cnic = useSelector((state) => state.user.cnic);
  const [extractedText, setExtractedText] = useState(""); // State to hold the extracted text

  const extractDetailsFromImage = async () => {
    if (!frontImage) {
      console.error("Image not available for text recognition");
      return;
    }

    try {
      const result = await TextRecognition.recognize(frontImage);
      if (result && result.text) {
        console.log("Extracted Text: ", result.text);
        setExtractedText(result.text);
      } else {
        console.log("No text found in the image");
      }
    } catch (error) {
      console.error("Text recognition failed:", error);
    }
  };

  useEffect(() => {
    if (frontImage) {
      extractDetailsFromImage(); // Extract details when the front image is available
    }
  }, [frontImage]); // Run the extraction when the front image changes

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Extracted CNIC Details</Text>

      {/* Display extracted text */}
      <Text style={styles.extractedText}>
        {extractedText || "No text extracted."}
      </Text>

      {/* Display the uploaded image */}
      <Image source={{ uri: frontImage }} style={styles.image} />
      <Text>{cnic}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  extractedText: {
    fontSize: 16,
    color: "black",
    marginBottom: 20,
    textAlign: "center",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    width: "100%",
    height: 200,
    overflow: "scroll",
  },
  image: {
    width: 300,
    height: 200,
    marginTop: 20,
  },
});

export default ExtractDetailsFromImage;
