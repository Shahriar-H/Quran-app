import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default function SubHeader() {
  return (
    <View className="flex-row items-center justify-between px-6 py-6 pt-12 bg-white">
      {/* Menu Icon */}
      <TouchableOpacity>
        <FontAwesome name="chevron-left" size={20} color="#2C7A7B" />
      </TouchableOpacity>

      {/* Title */}
      <Text className="text-xl font-bold text-teal-700">AL-QURAN</Text>

      {/* Search Icon */}
      <TouchableOpacity>
        <FontAwesome name="search" size={20} color="#2C7A7B" />
      </TouchableOpacity>
    </View>
  );
}
