import React, { useMemo, useState } from "react";
import { View, Text, Pressable } from "react-native";
import { theme } from "../../src/ui/theme";

type Key =
  | "7" | "8" | "9" | "/"
  | "4" | "5" | "6" | "*"
  | "1" | "2" | "3" | "-"
  | "0" | "." | "+" | "(" | ")"
  | "C" | "DEL" | "=";

const rows: Key[][] = [
  ["C", "DEL", "(", ")"],
  ["7", "8", "9", "/"],
  ["4", "5", "6", "*"],
  ["1", "2", "3", "-"],
  ["0", ".", "+", "="],
];

function safeEval(exp: string): string {
  if (!/^[0-9+\-*/.() ]+$/.test(exp)) return "Erro";
  if (!exp.trim()) return "";
  try {
    // eslint-disable-next-line no-new-func
    const value = Function(`"use strict"; return (${exp})`)();
    if (typeof value !== "number" || !Number.isFinite(value)) return "Erro";
    return String(value);
  } catch {
    return "Erro";
  }
}

function isOperator(k: Key) {
  return k === "/" || k === "*" || k === "-" || k === "+" || k === "=";
}

export default function Calculator() {
  const [exp, setExp] = useState("");
  const [result, setResult] = useState("");

  const preview = useMemo(() => safeEval(exp), [exp]);

  function tap(k: Key) {
    if (k === "C") {
      setExp("");
      setResult("");
      return;
    }
    if (k === "DEL") {
      setExp((p) => p.slice(0, -1));
      return;
    }
    if (k === "=") {
      const r = safeEval(exp);
      setResult(r || "");
      if (r && r !== "Erro") setExp(r);
      return;
    }
    setExp((p) => p + k);
  }

  return (
    <View style={{ gap: 12 }}>
      <View
        style={{
          backgroundColor: "rgba(255,255,255,0.03)",
          borderWidth: 1,
          borderColor: theme.colors.border,
          borderRadius: theme.radius.md,
          padding: 14,
          gap: 6,
        }}
      >
        <Text style={{ color: theme.colors.muted, fontWeight: "700" }}>Expressão</Text>
        <Text style={{ color: theme.colors.text, fontSize: 20, fontWeight: "800" }}>
          {exp || "0"}
        </Text>

        <Text style={{ color: theme.colors.muted, marginTop: 6 }}>
          Prévia: <Text style={{ color: theme.colors.text, fontWeight: "800" }}>{preview || (exp ? "..." : "")}</Text>
        </Text>

        <Text style={{ color: theme.colors.muted }}>
          Resultado: <Text style={{ color: theme.colors.accent2, fontWeight: "900" }}>{result}</Text>
        </Text>
      </View>

      {rows.map((row, i) => (
        <View key={i} style={{ flexDirection: "row", gap: 10 }}>
          {row.map((k) => {
            const op = isOperator(k);
            const danger = k === "C" || k === "DEL";
            const bg = danger
              ? "rgba(255,107,107,0.12)"
              : op
              ? "rgba(167,139,250,0.14)"
              : "rgba(255,255,255,0.06)";

            const border = danger
              ? "rgba(255,107,107,0.35)"
              : op
              ? "rgba(167,139,250,0.35)"
              : theme.colors.border;

            const color = danger
              ? theme.colors.danger
              : op
              ? theme.colors.accent2
              : theme.colors.text;

            return (
              <Pressable
                key={k}
                onPress={() => tap(k)}
                style={{
                  flex: 1,
                  backgroundColor: bg,
                  borderWidth: 1,
                  borderColor: border,
                  borderRadius: 16,
                  paddingVertical: 14,
                  alignItems: "center",
                }}
              >
                <Text style={{ color, fontSize: 18, fontWeight: "900" }}>{k}</Text>
              </Pressable>
            );
          })}
        </View>
      ))}
    </View>
  );
}
