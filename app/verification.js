import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { useSelector } from "react-redux";
import axios from "axios";

const VerificationPage = () => {
  const frontImage = useSelector((state) => state.cnic.frontImage); // Get the front image from Redux
  const cnicDetails = useSelector((state) => state.user.cnic); // Get CNIC details from Redux

  const handleCNICVerification = async () => {
    if (!frontImage) {
      Alert.alert("Error", "Please upload the CNIC front image.");
      return;
    }

    // Prepare FormData to send the image to the Python server
    const formData = new FormData();
    formData.append("image", {
      uri: frontImage,
      name: "cnic_front.jpg",
      type: "image/jpeg", // Adjust type based on your image format
    });

    try {
      // Send the image to the Python server for text extraction
      const response = await axios.post(
        "http://localhost:5000/extract-text", // Replace with your Python server endpoint
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Extracted text from the server response
      const extractedText = response.data.text;

      console.log("Extracted Text:", extractedText);

      // Compare the extracted text with the CNIC details from Redux
      if (extractedText.includes(cnicDetails)) {
        Alert.alert("Verification Successful", "CNIC details match.");
      } else {
        Alert.alert("Verification Failed", "CNIC details do not match.");
      }
    } catch (error) {
      console.error("Verification Error:", error.message);
      Alert.alert("Error", "Failed to verify CNIC. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify Your CNIC</Text>
      {frontImage ? (
        <Image source={{ uri: frontImage }} style={styles.image} />
      ) : (
        <Text style={styles.error}>No image selected.</Text>
      )}

      <TouchableOpacity style={styles.button} onPress={handleCNICVerification}>
        <Text style={styles.buttonText}>Verify CNIC</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  error: {
    color: "red",
    marginBottom: 20,
  },
});

export default VerificationPage;
