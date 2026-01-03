import React from "react";
import { View, Text, Image, Pressable, Linking, ScrollView } from "react-native";
import { theme } from "../../src/ui/theme";

const WHATSAPP_NUMBER = "5584992160269"; // seu número
const INSTAGRAM_URL = "https://www.instagram.com/gabrielfreire422/"; // coloque seu @ depois
const LINKEDIN_URL = "https://www.linkedin.com/in/gabriel-freire-89b057201/"; // opcional

function waUrl(msg: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

export default function Profile() {
  return (
    <ScrollView contentContainerStyle={{ padding: 16, gap: 14, backgroundColor: theme.colors.bg, flexGrow: 1 }}>
      <Text style={{ color: theme.colors.text, fontSize: 28, fontWeight: "900" }}>
        Perfil
      </Text>

      <View
        style={{
          backgroundColor: theme.colors.card,
          borderWidth: 1,
          borderColor: theme.colors.border,
          borderRadius: theme.radius.lg,
          padding: 16,
          gap: 12,
          alignItems: "center",
          ...theme.shadow.card,
        }}
      >
        <Image
          source={require("../../assets/images/sergio.jpg")}
          style={{
            width: 110,
            height: 110,
            borderRadius: 55,
            borderWidth: 2,
            borderColor: "rgba(110,231,255,0.5)",
          }}
        />

        <View style={{ alignItems: "center", gap: 4 }}>
          <Text style={{ color: theme.colors.text, fontSize: 20, fontWeight: "900" }}>
            Gabriel Freire Bacelar Huhn
          </Text>
          <Text style={{ color: theme.colors.muted, textAlign: "center", lineHeight: 20 }}>
            Tecnologia • Serviços • Imóveis • Consultoria
          </Text>
        </View>

        <View style={{ width: "100%", gap: 10, marginTop: 6 }}>
          <Pressable
            onPress={() => Linking.openURL(waUrl("Olá! Vim pelo seu app e quero falar com você."))}
            style={{
              backgroundColor: "rgba(110,231,255,0.18)",
              borderWidth: 1,
              borderColor: "rgba(110,231,255,0.45)",
              borderRadius: 14,
              paddingVertical: 12,
              alignItems: "center",
            }}
          >
            <Text style={{ color: theme.colors.accent, fontWeight: "900" }}>Falar no WhatsApp</Text>
          </Pressable>

          <Pressable
            onPress={() => Linking.openURL(INSTAGRAM_URL)}
            style={{
              backgroundColor: "rgba(255,255,255,0.06)",
              borderWidth: 1,
              borderColor: theme.colors.border,
              borderRadius: 14,
              paddingVertical: 12,
              alignItems: "center",
            }}
          >
            <Text style={{ color: theme.colors.text, fontWeight: "900" }}>Instagram</Text>
          </Pressable>

          <Pressable
            onPress={() => Linking.openURL(LINKEDIN_URL)}
            style={{
              backgroundColor: "rgba(255,255,255,0.06)",
              borderWidth: 1,
              borderColor: theme.colors.border,
              borderRadius: 14,
              paddingVertical: 12,
              alignItems: "center",
            }}
          >
            <Text style={{ color: theme.colors.text, fontWeight: "900" }}>LinkedIn</Text>
          </Pressable>
        </View>
      </View>

      <View
        style={{
          backgroundColor: theme.colors.card,
          borderWidth: 1,
          borderColor: theme.colors.border,
          borderRadius: theme.radius.lg,
          padding: 14,
          gap: 10,
          ...theme.shadow.card,
        }}
      >
        <Text style={{ color: theme.colors.text, fontSize: 16, fontWeight: "900" }}>
          Informações
        </Text>

        <Text style={{ color: theme.colors.muted, lineHeight: 20 }}>
          • Cidade: Natal/RN{"\n"}
          • Área: Tecnologia e Imóveis{"\n"}
          • Atendimento: WhatsApp{"\n"}
          • Serviços: sites, apps, automações e sistemas{"\n"}
        </Text>
      </View>
    </ScrollView>
  );
}
