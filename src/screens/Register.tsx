import React, { useState } from "react";
import { View, Text, TextInput, Pressable, Alert } from "react-native";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  async function handleRegister() {
    if (!name.trim() || !email.trim() || !pass.trim()) {
      return Alert.alert("Atenção", "Preencha tudo.");
    }
    await AsyncStorage.setItem(
      "user",
      JSON.stringify({ name: name.trim(), email: email.trim().toLowerCase(), pass })
    );
    Alert.alert("Ok", "Cadastrado! Faça login.");
    router.replace("/login");
  }

  return (
    <View style={{ flex: 1, padding: 16, gap: 10 }}>
      <Text>Nome</Text>
      <TextInput value={name} onChangeText={setName}
        style={{ borderWidth: 1, borderRadius: 10, padding: 12 }} />

      <Text>Email</Text>
      <TextInput value={email} onChangeText={setEmail} autoCapitalize="none"
        style={{ borderWidth: 1, borderRadius: 10, padding: 12 }} />

      <Text>Senha</Text>
      <TextInput value={pass} onChangeText={setPass} secureTextEntry
        style={{ borderWidth: 1, borderRadius: 10, padding: 12 }} />

      <Pressable onPress={handleRegister}
        style={{ borderWidth: 1, borderRadius: 10, padding: 12, alignItems: "center" }}>
        <Text>Cadastrar</Text>
      </Pressable>
    </View>
  );
}
