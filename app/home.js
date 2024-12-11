import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const HomePage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Home Page!</Text>
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
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default HomePage;
