import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { Provider } from "react-redux"; // Import the Provider
import store from "../src/store/store"; // Import the Redux store
import "../src/localization/i18n";

const Layout = () => {
  return (
    <Provider store={store}>
      {/* Wrap the app with Provider */}
      <StatusBar barStyle="dark-content" />
      <Stack />
    </Provider>
  );
};

export default Layout;
