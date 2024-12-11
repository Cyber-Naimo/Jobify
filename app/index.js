import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { colors } from "../constants/Colors";

const SplashScreen = () => {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("./phone/PhoneNumberScreen");
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/splash.jpg")}
        style={styles.image}
      />
      <Text style={styles.welcomeText}>Welcome to Job App</Text>
      <TouchableOpacity
        style={styles.getStartedButton}
        onPress={handleGetStarted}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 30,
  },
  welcomeText: {
    fontSize: 24,
    color: colors.primary,
    fontWeight: "bold",
    marginBottom: 20,
  },
  getStartedButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 5,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
});

export default SplashScreen;
