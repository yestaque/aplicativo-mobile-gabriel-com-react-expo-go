import { Link } from "expo-router";
import React from "react";
import { StyleSheet, View, Pressable, Text, Alert, Linking } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

const WHATSAPP_NUMBER = "5584992160269";

function buildWhatsAppUrl(message: string) {
  const text = encodeURIComponent(message);
  // wa.me funciona bem em Android/iOS
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

async function openWhatsApp(message: string) {
  const url = buildWhatsAppUrl(message);

  const can = await Linking.canOpenURL(url);
  if (!can) {
    Alert.alert("WhatsApp", "Não consegui abrir o WhatsApp neste dispositivo.");
    return;
  }
  await Linking.openURL(url);
}

function ActionCard({
  title,
  desc,
  badge,
  onDetails,
  onQuote,
}: {
  title: string;
  desc: string;
  badge: string;
  onDetails: () => void;
  onQuote: () => void;
}) {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{badge}</Text>
        </View>
        <ThemedText type="subtitle" style={styles.cardTitle}>
          {title}
        </ThemedText>
      </View>

      <ThemedText style={styles.cardDesc}>{desc}</ThemedText>

      <View style={styles.cardActions}>
        <Pressable style={styles.btnSoft} onPress={onDetails}>
          <Text style={styles.btnSoftText}>Ver detalhes</Text>
        </Pressable>

        <Pressable style={styles.btnPrimary} onPress={onQuote}>
          <Text style={styles.btnPrimaryText}>Pedir orçamento</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default function ModalScreen() {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.hero}>
        <ThemedText type="title" style={styles.title}>
          Central de Atendimento
        </ThemedText>

        <ThemedText style={styles.subtitle}>
          Serviços de tecnologia e imóveis. Clique e já fale no WhatsApp com mensagem pronta.
        </ThemedText>

        <View style={styles.quickRow}>
          <Pressable
            style={styles.quickBtn}
            onPress={() =>
              openWhatsApp(
                "Olá! Quero falar com um consultor. Pode me ajudar com um orçamento?"
              )
            }
          >
            <Text style={styles.quickBtnText}>WhatsApp</Text>
          </Pressable>

          <Pressable
            style={styles.quickBtnAlt}
            onPress={() =>
              openWhatsApp(
                "Olá! Quero agendar uma visita / atendimento. Quais horários disponíveis?"
              )
            }
          >
            <Text style={styles.quickBtnAltText}>Agendar</Text>
          </Pressable>
        </View>

        <View style={styles.smallInfo}>
          <Text style={styles.smallInfoText}>Atendimento via WhatsApp: +55 84 99216-0269</Text>
        </View>
      </View>

      <View style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Ações rápidas
        </ThemedText>

        <ActionCard
          badge="TECH"
          title="Serviços de Tecnologia"
          desc="Sites, apps, automações e sistemas."
          onDetails={() =>
            openWhatsApp(
              "Olá! Quero ver detalhes dos serviços de tecnologia (site/app/sistema). Pode me enviar opções?"
            )
          }
          onQuote={() =>
            openWhatsApp(
              "Olá! Quero um orçamento de tecnologia. Me diga: 1) tipo (site/app/sistema), 2) prazo, 3) objetivo."
            )
          }
        />

        <ActionCard
          badge="CASAS"
          title="Imóveis e Casas"
          desc="Casas disponíveis, fotos, valores e simulação."
          onDetails={() =>
            openWhatsApp(
              "Olá! Quero ver detalhes dos imóveis (fotos, localização e valores). Pode me enviar as opções?"
            )
          }
          onQuote={() =>
            openWhatsApp(
              "Olá! Quero um orçamento/consulta de imóveis. Me diga as opções em Extremoz/Terra Bela e condições."
            )
          }
        />
      </View>

      <View style={styles.footer}>
        <Link href="/" dismissTo style={styles.link}>
          <Text style={styles.linkText}>Voltar</Text>
        </Link>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 18, gap: 14 },

  hero: {
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    gap: 10,
  },
  title: { fontSize: 26, fontWeight: "800" },
  subtitle: { opacity: 0.8, lineHeight: 20 },

  quickRow: { flexDirection: "row", gap: 10, marginTop: 6 },
  quickBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(110,231,255,0.45)",
    backgroundColor: "rgba(110,231,255,0.14)",
    alignItems: "center",
  },
  quickBtnText: { fontWeight: "800", color: "#6EE7FF" },

  quickBtnAlt: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(167,139,250,0.45)",
    backgroundColor: "rgba(167,139,250,0.14)",
    alignItems: "center",
  },
  quickBtnAltText: { fontWeight: "800", color: "#A78BFA" },

  smallInfo: { marginTop: 4 },
  smallInfoText: { opacity: 0.65 },

  section: { gap: 12, flex: 1 },
  sectionTitle: { fontSize: 16, fontWeight: "800", opacity: 0.9 },

  card: {
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    gap: 10,
  },
  cardHeader: { flexDirection: "row", alignItems: "center", gap: 10 },

  badge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.16)",
    backgroundColor: "rgba(255,255,255,0.06)",
  },
  badgeText: { fontSize: 12, fontWeight: "900", color: "rgba(255,255,255,0.85)" },

  cardTitle: { fontSize: 18, fontWeight: "900" },
  cardDesc: { opacity: 0.8, lineHeight: 20 },

  cardActions: { flexDirection: "row", gap: 10, marginTop: 4 },

  btnSoft: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.14)",
    backgroundColor: "rgba(255,255,255,0.06)",
    alignItems: "center",
  },
  btnSoftText: { fontWeight: "800", color: "rgba(255,255,255,0.9)" },

  btnPrimary: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(110,231,255,0.45)",
    backgroundColor: "rgba(110,231,255,0.16)",
    alignItems: "center",
  },
  btnPrimaryText: { fontWeight: "900", color: "#6EE7FF" },

  footer: { paddingTop: 6, alignItems: "center" },
  link: { paddingVertical: 12, paddingHorizontal: 18 },
  linkText: { fontWeight: "900", opacity: 0.85 },
});
