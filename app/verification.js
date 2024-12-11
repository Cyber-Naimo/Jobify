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
import { useRouter } from "expo-router";
import axios from "axios";

const VerificationPage = () => {
  const frontImage = useSelector((state) => state.cnic.frontImage);
  const backImage = useSelector((state) => state.cnic.backImage);
  const cnicDetails = useSelector((state) => state.user.cnic);
  const router = useRouter();

  const handleCNICVerification = async () => {
    if (!backImage) {
      Alert.alert("Error", "Please upload the CNIC Back image.");
      return;
    }

    try {
      // Prepare FormData to send the image to the OCR server
      const formData = new FormData();
      formData.append("image", {
        uri: backImage, // Use the selected image URI
        name: "cnic_back.jpg", // Ensure correct name
        type: "image/jpeg", // Ensure correct type
      });

      // Send the image to the OCR server
      const response = await axios.post(
        "https://api.api-ninjas.com/v1/imagetotext", // OCR API endpoint
        formData,
        {
          headers: {
            "X-Api-Key": "k2UT2akAUcGEm/Hv9QAwxQ==WlIWF9QqzyOMHJzR", // API Key
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const extractedCNIC = response.data
        .filter((item) => item.text.includes(cnicDetails))
        .map((item) => item.text)
        .join("");

      if (extractedCNIC === cnicDetails) {
        Alert.alert("Verification Successful", "CNIC details match.");
        router.push("./home");
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
