import { View, Text } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

// todo:
// * refactor styles to be defined outside this file or just tailwind styles
// * use token colors instead of #hex or something else
// * refactor return to use the condition to render different styles and not have 2 returns
// * try giftedchat libary instead of custom

export default function MessageItem({ message, currentUser }) {
  if (currentUser?.userId == message?.userId) {
    // sender
    return (
      <View className="flex-row justify-end mb-3 mr-3">
        <View style={{ width: wp(80) }}>
          <View className="flex self-end p-3 rounded-2xl px-4 bg-white border border-neutral-200">
            <Text style={{ fontSize: hp(1.9) }}>{message?.text}</Text>
          </View>
        </View>
      </View>
    );
  } else {
    // reciever
    return (
      <View style={{ width: wp(80) }} className="ml-3 mb-3">
        <View className="flex self-start p-3 px-4 rounded-2xl bg-indigo-100 border border-indigo-200">
          <Text style={{ fontSize: hp(1.9) }}>{message?.text}</Text>
        </View>
      </View>
    );
  }
}
