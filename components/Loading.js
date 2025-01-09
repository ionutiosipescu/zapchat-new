import { View, Text } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";

// todo:
// * refactor styles to be defined outside this file
// * require at the top not in source

export default function Loading({ size }) {
  return (
    <View style={{ height: size, aspectRatio: 1 }}>
      <LottieView
        style={{ flex: 1 }}
        source={require("../assets/images/loading.json")}
        autoPlay
        loop
      />
    </View>
  );
}
