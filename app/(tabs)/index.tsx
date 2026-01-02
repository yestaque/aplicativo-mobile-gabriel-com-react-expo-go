import React from "react";
import { ScrollView, View, Text, Pressable } from "react-native";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Clock from "../../src/widgets/Clock";
import Calculator from "../../src/widgets/Calculator";
import YearCalendar from "../../src/widgets/YearCalendar";
import { theme } from "../src/ui/theme";

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View
      style={{
        backgroundColor: theme.colors.card,
        borderRadius: theme.radius.lg,
        borderWidth: 1,
        borderColor: theme.colors.border,
        padding: 14,
        ...theme.shadow.card,
      }}
    >
      <Text style={{ color: theme.colors.text, fontSize: 18, fontWeight: "700", marginBottom: 10 }}>
        {title}
      </Text>
      {children}
    </View>
  );
}

export default function HomeTab() {
  async function logout() {
    await AsyncStorage.removeItem("token");
    router.replace("../login");
  }

  return (
    <ScrollView
      contentContainerStyle={{
        padding: 16,
        gap: 14,
        backgroundColor: theme.colors.bg,
        flexGrow: 1,
      }}
    >
      <Text style={{ color: theme.colors.text, fontSize: 28, fontWeight: "800" }}>
        Painel
      </Text>
      <Text style={{ color: theme.colors.muted, marginTop: -8 }}>
        Relógio • Calculadora • Calendário
      </Text>

      <Card title="Horário atual">
        <Clock />
      </Card>

      <Card title="Calculadora">
        <Calculator />
      </Card>

      <Card title="Calendário">
        <YearCalendar />
      </Card>

      <Pressable
        onPress={logout}
        style={{
          marginTop: 6,
          backgroundColor: theme.colors.danger,
          borderRadius: 14,
          paddingVertical: 14,
          alignItems: "center",
          ...theme.shadow.card,
        }}
      >
        <Text style={{ color: "#0B1220", fontSize: 16, fontWeight: "800" }}>Sair</Text>
      </Pressable>
    </ScrollView>
  );
}
