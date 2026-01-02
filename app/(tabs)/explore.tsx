import React, { useEffect, useMemo, useState } from "react";
import { ScrollView, View, Text, TextInput, Pressable, Alert, Linking } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { theme } from "../src/ui/theme";

const WHATSAPP_NUMBER = "5584992160269";
const FAV_KEY = "favorites_v1";

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

function Chip({ active, label, onPress }: { active: boolean; label: string; onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderRadius: 999,
        borderWidth: 1,
        borderColor: active ? "rgba(110,231,255,0.55)" : theme.colors.border,
        backgroundColor: active ? "rgba(110,231,255,0.12)" : "rgba(255,255,255,0.03)",
      }}
    >
      <Text style={{ color: active ? theme.colors.accent : theme.colors.text, fontWeight: "900" }}>{label}</Text>
    </Pressable>
  );
}

function Card({
  item,
  isFav,
  onToggleFav,
  onDetails,
  onQuote,
}: {
  item: Item;
  isFav: boolean;
  onToggleFav: () => void;
  onDetails: () => void;
  onQuote: () => void;
}) {
  return (
    <View
      style={{
        backgroundColor: theme.colors.card,
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderRadius: theme.radius.lg,
        padding: 14,
        gap: 8,
        ...theme.shadow.card,
      }}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 10 }}>
        <Text style={{ color: theme.colors.text, fontSize: 18, fontWeight: "900", flex: 1 }}>
          {item.title}
        </Text>

        <Pressable
          onPress={onToggleFav}
          style={{
            paddingHorizontal: 10,
            paddingVertical: 6,
            borderRadius: 999,
            borderWidth: 1,
            borderColor: isFav ? "rgba(255, 107, 107, 0.55)" : theme.colors.border,
            backgroundColor: isFav ? "rgba(255, 107, 107, 0.12)" : "rgba(255,255,255,0.04)",
          }}
        >
          <Text style={{ color: isFav ? theme.colors.danger : theme.colors.muted, fontWeight: "900" }}>
            {isFav ? "♥" : "♡"}
          </Text>
        </Pressable>
      </View>

      {item.tag ? (
        <View style={{ alignSelf: "flex-start", paddingVertical: 6, paddingHorizontal: 10, borderRadius: 999, backgroundColor: "rgba(167,139,250,0.14)", borderWidth: 1, borderColor: "rgba(167,139,250,0.35)" }}>
          <Text style={{ color: theme.colors.accent2, fontWeight: "900", fontSize: 12 }}>{item.tag}</Text>
        </View>
      ) : null}

      <Text style={{ color: theme.colors.muted }}>{item.subtitle}</Text>

      {item.priceFrom ? <Text style={{ color: theme.colors.text, fontWeight: "900" }}>{item.priceFrom}</Text> : null}

      <View style={{ flexDirection: "row", gap: 10, marginTop: 6 }}>
        <Pressable
          onPress={onDetails}
          style={{
            flex: 1,
            backgroundColor: "rgba(255,255,255,0.06)",
            borderWidth: 1,
            borderColor: theme.colors.border,
            borderRadius: 14,
            paddingVertical: 12,
            alignItems: "center",
          }}
        >
          <Text style={{ color: theme.colors.text, fontWeight: "900" }}>Ver detalhes</Text>
        </Pressable>

        <Pressable
          onPress={onQuote}
          style={{
            flex: 1,
            backgroundColor: "rgba(110,231,255,0.18)",
            borderWidth: 1,
            borderColor: "rgba(110,231,255,0.45)",
            borderRadius: 14,
            paddingVertical: 12,
            alignItems: "center",
          }}
        >
          <Text style={{ color: theme.colors.accent, fontWeight: "900" }}>Pedir orçamento</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default function ExploreTab() {
  const [mode, setMode] = useState<"todos" | ItemType>("todos");
  const [q, setQ] = useState("");
  const [favorites, setFavorites] = useState<Record<string, true>>({});

  // carregar favoritos
  useEffect(() => {
    (async () => {
      const raw = await AsyncStorage.getItem(FAV_KEY);
      if (raw) setFavorites(JSON.parse(raw));
    })();
  }, []);

  async function toggleFav(id: string) {
    setFavorites((prev) => {
      const next = { ...prev };
      if (next[id]) delete next[id];
      else next[id] = true;
      AsyncStorage.setItem(FAV_KEY, JSON.stringify(next));
      return next;
    });
  }

  const list = useMemo(() => {
    const query = q.trim().toLowerCase();

    return DATA.filter((it) => {
      const typeOk = mode === "todos" ? true : it.type === mode;
      const textOk =
        !query ||
        it.title.toLowerCase().includes(query) ||
        it.subtitle.toLowerCase().includes(query) ||
        (it.tag || "").toLowerCase().includes(query);

      return typeOk && textOk;
    }).sort((a, b) => {
      // favoritos primeiro
      const af = favorites[a.id] ? 1 : 0;
      const bf = favorites[b.id] ? 1 : 0;
      return bf - af;
    });
  }, [mode, q, favorites]);

  return (
    <ScrollView
      contentContainerStyle={{
        padding: 16,
        gap: 14,
        backgroundColor: theme.colors.bg,
        flexGrow: 1,
      }}
    >
      <Text style={{ color: theme.colors.text, fontSize: 28, fontWeight: "900" }}>Explore</Text>
      <Text style={{ color: theme.colors.muted, marginTop: -8 }}>
        Serviços de tecnologia e casas disponíveis
      </Text>

      <View
        style={{
          backgroundColor: "rgba(255,255,255,0.03)",
          borderWidth: 1,
          borderColor: theme.colors.border,
          borderRadius: theme.radius.lg,
          padding: 12,
          gap: 10,
        }}
      >
        <TextInput
          value={q}
          onChangeText={setQ}
          placeholder="Buscar: app, site, Extremoz, 3 quartos..."
          placeholderTextColor="rgba(234,240,255,0.35)"
          style={{
            color: theme.colors.text,
            borderWidth: 1,
            borderColor: theme.colors.border,
            borderRadius: 14,
            paddingVertical: 12,
            paddingHorizontal: 14,
          }}
        />

        <View style={{ flexDirection: "row", gap: 10, flexWrap: "wrap" }}>
          <Chip active={mode === "todos"} label="Todos" onPress={() => setMode("todos")} />
          <Chip active={mode === "servico"} label="Serviços" onPress={() => setMode("servico")} />
          <Chip active={mode === "imovel"} label="Imóveis" onPress={() => setMode("imovel")} />
        </View>
      </View>

      <Text style={{ color: theme.colors.muted }}>
        Resultados:{" "}
        <Text style={{ color: theme.colors.text, fontWeight: "900" }}>{list.length}</Text>
      </Text>

      <View style={{ gap: 12 }}>
        {list.map((item) => (
          <Card
            key={item.id}
            item={item}
            isFav={!!favorites[item.id]}
            onToggleFav={() => toggleFav(item.id)}
            onDetails={() => router.push(`/(tabs)/details/${item.id}`)}
            onQuote={() =>
              openWhatsApp(
                `Olá! Quero orçamento sobre: "${item.title}". ${item.type === "imovel" ? "Pode enviar fotos/valores e condições?" : "Me diga opções, prazo e como funciona."}`
              )
            }
          />
        ))}
      </View>
    </ScrollView>
  );
}
