import React from "react";
import { View, Text, Pressable } from "react-native";

type Props = {
  onLogout: () => void;
};

export default function Home({ onLogout }: Props) {
  return (
    <View style={{ flex: 1, padding: 16, gap: 12 }}>
      <Text>Home</Text>

      <Pressable
        onPress={onLogout}
        style={{ borderWidth: 1, borderRadius: 10, padding: 12, alignItems: "center" }}
      >
        <Text>Sair</Text>
      </Pressable>
    </View>
  );
}
