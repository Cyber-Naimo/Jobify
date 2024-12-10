import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  Button,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { setFrontImage, setBackImage } from "../../src/store/cnicSlice";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
const { width } = Dimensions.get("window");

const CnicUploadScreen = () => {
  const { t } = useTranslation();

  const router = useRouter();
  const dispatch = useDispatch();
  const frontImage = useSelector((state) => state.cnic.frontImage);
  const backImage = useSelector((state) => state.cnic.backImage);

  // Save the image locally
  const saveImageLocally = async (imageUri, type) => {
    try {
      const fileName = imageUri.split("/").pop();
      const localUri = `${FileSystem.documentDirectory}${fileName}`;
      await FileSystem.moveAsync({
        from: imageUri,
        to: localUri,
      });

      // Dispatch to Redux store
      if (type === "front") {
        dispatch(setFrontImage(localUri));
      } else {
        dispatch(setBackImage(localUri));
      }

      Alert.alert("Success", "Image saved successfully!");
    } catch (error) {
      console.error("File save error:", error);
      Alert.alert("Error", "Failed to save the image.");
    }
  };

  // Handle image selection (either from camera or gallery)
  const handleImagePick = async (type, isCamera = false) => {
    try {
      let result;

      if (isCamera) {
        result = await ImagePicker.launchCameraAsync({
          allowsEditing: true,
          quality: 1,
        });
      } else {
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          quality: 1,
        });
      }

      if (!result.canceled) {
        const uri = result.assets[0].uri;
        await saveImageLocally(uri, type);
      }
    } catch (error) {
      console.error("ImagePicker Error:", error);
      Alert.alert("Error", "Failed to pick the image.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{t("uploadCnicTitle")}</Text>

      {/* Front CNIC */}
      <View style={styles.uploadContainer}>
        <View style={styles.labelContainer}>
          <Text style={styles.heading}>{t("frontCnicLabel")}</Text>
          <Text style={styles.headingUrdu}>{t("frontCnicLabelUrdu")}</Text>
        </View>
        <TouchableOpacity
          style={styles.imageContainer}
          onPress={() => handleImagePick("front")}
        >
          {frontImage ? (
            <Image source={{ uri: frontImage }} style={styles.image} />
          ) : (
            <Text style={styles.icon}>📷 {t("tapToUpload")} </Text>
          )}
        </TouchableOpacity>
        <Button
          title={t("takePhoto")}
          onPress={() => handleImagePick("front", true)} // true to use camera
        />
      </View>

      {/* Back CNIC */}
      <View style={styles.uploadContainer}>
        <View style={styles.labelContainer}>
          <Text style={styles.heading}>{t("backCnicLabel")}</Text>
          <Text style={styles.headingUrdu}>{t("backCnicLabelUrdu")}</Text>
        </View>
        <TouchableOpacity
          style={styles.imageContainer}
          onPress={() => handleImagePick("back")}
        >
          {backImage ? (
            <Image source={{ uri: backImage }} style={styles.image} />
          ) : (
            <Text style={styles.icon}>📷 {t("tapToUpload")}</Text>
          )}
        </TouchableOpacity>

        <Button
          title={t("takePhoto")}
          onPress={() => handleImagePick("back", true)} // true to use camera
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            router.push("/upload/profile");
          }}
        >
          <Text style={styles.buttonText}>{t("nextButton")}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#007BFF",
    marginTop: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4CAF50",
    textAlign: "center",
    marginBottom: 20,
  },
  uploadContainer: {
    marginBottom: 30,
  },
  labelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  headingUrdu: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    textAlign: "right",
  },
  imageContainer: {
    width: width * 0.9,
    height: 200,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#e1e1e1",
    marginBottom: 10,
  },
  icon: {
    fontSize: 50,
    color: "#888",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
});

export default CnicUploadScreen;