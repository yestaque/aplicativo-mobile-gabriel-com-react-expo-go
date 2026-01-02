import React, { useState } from "react";
import { View, Text, TextInput, Pressable, Alert } from "react-native";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  async function handleLogin() {
    const raw = await AsyncStorage.getItem("user");
    if (!raw) return Alert.alert("Erro", "Cadastre um usuário primeiro.");

    const user = JSON.parse(raw);
    if (user.email === email.trim().toLowerCase() && user.pass === pass) {
      await AsyncStorage.setItem("token", "ok");
      router.replace("/(tabs)");
    } else {
      Alert.alert("Erro", "Email ou senha incorretos.");
    }
  }

  return (
    <View style={{ flex: 1, padding: 16, gap: 10 }}>
      <Text>Email</Text>
      <TextInput value={email} onChangeText={setEmail} autoCapitalize="none"
        style={{ borderWidth: 1, borderRadius: 10, padding: 12 }} />

      <Text>Senha</Text>
      <TextInput value={pass} onChangeText={setPass} secureTextEntry
        style={{ borderWidth: 1, borderRadius: 10, padding: 12 }} />

      <Pressable onPress={handleLogin}
        style={{ borderWidth: 1, borderRadius: 10, padding: 12, alignItems: "center" }}>
        <Text>Entrar</Text>
      </Pressable>

      <Pressable onPress={() => router.push("/register")}
        style={{ padding: 12, alignItems: "center" }}>
        <Text>Criar conta</Text>
      </Pressable>
    </View>
  );
}
