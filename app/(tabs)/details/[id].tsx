import React, { useMemo } from "react";
import { ScrollView, View, Text, Pressable, Alert, Linking } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { theme } from "../../../src/ui/theme";


const WHATSAPP_NUMBER = "5584992160269";

type ItemType = "servico" | "imovel";
type Item = {
  id: string;
  type: ItemType;
  title: string;
  subtitle: string;
  priceFrom?: string;
  tag?: string;
};

const DATA: Item[] = [
  { id: "s1", type: "servico", title: "Sites e Landing Pages", subtitle: "Página moderna, WhatsApp, formulário e domínio", priceFrom: "a partir de R$ 500", tag: "Popular" },
  { id: "s2", type: "servico", title: "App Mobile (Android + iOS)", subtitle: "Login, catálogo, push, integrações", priceFrom: "a partir de R$ 1.000", tag: "Premium" },
  { id: "s3", type: "servico", title: "Automação WhatsApp", subtitle: "Atendimento, funil e respostas rápidas", priceFrom: "a partir de R$ 800", tag: "Conversão" },
  { id: "i1", type: "imovel", title: "Casas em Extremoz", subtitle: "2–3 quartos • Próximo a comércios", priceFrom: "a partir de R$ 190.000", tag: "Destaque" },
  { id: "i2", type: "imovel", title: "Terra Bela", subtitle: "Casa individual • Opções financiáveis", priceFrom: "a partir de R$ 220.000", tag: "Novo" },
  { id: "i3", type: "imovel", title: "Condomínio 7 casas", subtitle: "Rua Santos Dumont • Projeto em andamento", priceFrom: "consulte valores", tag: "Oportunidade" },
];

function buildWhatsAppUrl(message: string) {
  const text = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

async function openWhatsApp(message: string) {
  const url = buildWhatsAppUrl(message);
  const can = await Linking.canOpenURL(url);
  if (!can) return Alert.alert("WhatsApp", "Não consegui abrir o WhatsApp neste dispositivo.");
  await Linking.openURL(url);
}

export default function DetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const item = useMemo(() => DATA.find((x) => x.id === id), [id]);

  if (!item) {
    return (
      <View style={{ flex: 1, backgroundColor: theme.colors.bg, padding: 16, justifyContent: "center", gap: 12 }}>
        <Text style={{ color: theme.colors.text, fontSize: 20, fontWeight: "900" }}>
          Item não encontrado
        </Text>
        <Pressable
          onPress={() => router.back()}
          style={{ borderWidth: 1, borderColor: theme.colors.border, borderRadius: 14, padding: 12, alignItems: "center" }}
        >
          <Text style={{ color: theme.colors.text, fontWeight: "900" }}>Voltar</Text>
        </Pressable>
      </View>
    );
  }

  const kind = item.type === "servico" ? "Serviço" : "Imóvel";

  return (
    <ScrollView contentContainerStyle={{ padding: 16, gap: 14, backgroundColor: theme.colors.bg, flexGrow: 1 }}>
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
        <Text style={{ color: theme.colors.muted, fontWeight: "800" }}>{kind}</Text>
        <Text style={{ color: theme.colors.text, fontSize: 24, fontWeight: "900" }}>{item.title}</Text>
        <Text style={{ color: theme.colors.muted, lineHeight: 20 }}>{item.subtitle}</Text>
        {item.priceFrom ? <Text style={{ color: theme.colors.text, fontWeight: "900" }}>{item.priceFrom}</Text> : null}
        {item.tag ? (
          <View style={{ alignSelf: "flex-start", paddingVertical: 6, paddingHorizontal: 10, borderRadius: 999, backgroundColor: "rgba(167,139,250,0.14)", borderWidth: 1, borderColor: "rgba(167,139,250,0.35)" }}>
            <Text style={{ color: theme.colors.accent2, fontWeight: "900" }}>{item.tag}</Text>
          </View>
        ) : null}
      </View>

      <View style={{ flexDirection: "row", gap: 10 }}>
        <Pressable
          onPress={() => router.back()}
          style={{ flex: 1, backgroundColor: "rgba(255,255,255,0.06)", borderWidth: 1, borderColor: theme.colors.border, borderRadius: 14, paddingVertical: 12, alignItems: "center" }}
        >
          <Text style={{ color: theme.colors.text, fontWeight: "900" }}>Voltar</Text>
        </Pressable>

        <Pressable
          onPress={() =>
            openWhatsApp(
              `Olá! Tenho interesse em ${kind.toLowerCase()}: "${item.title}". Pode me passar detalhes e valores/condições?`
            )
          }
          style={{ flex: 1, backgroundColor: "rgba(110,231,255,0.18)", borderWidth: 1, borderColor: "rgba(110,231,255,0.45)", borderRadius: 14, paddingVertical: 12, alignItems: "center" }}
        >
          <Text style={{ color: theme.colors.accent, fontWeight: "900" }}>Pedir no WhatsApp</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
