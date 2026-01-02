import React, { useEffect, useMemo, useState } from "react";
import { View, Text, Pressable } from "react-native";
import { theme } from "../ui/theme";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export default function Clock() {
  const [now, setNow] = useState(new Date());
  const [showSeconds, setShowSeconds] = useState(true);

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const timeStr = useMemo(() => {
    const h = pad(now.getHours());
    const m = pad(now.getMinutes());
    const s = pad(now.getSeconds());
    return showSeconds ? `${h}:${m}:${s}` : `${h}:${m}`;
  }, [now, showSeconds]);

  const dateStr = useMemo(() => now.toLocaleDateString(), [now]);

  return (
    <View style={{ gap: 10 }}>
      <View style={{ flexDirection: "row", alignItems: "baseline", justifyContent: "space-between" }}>
        <Text style={{ color: theme.colors.text, fontSize: 34, fontWeight: "900" }}>{timeStr}</Text>
        <Text style={{ color: theme.colors.muted, fontWeight: "700" }}>{dateStr}</Text>
      </View>

      <Pressable
        onPress={() => setShowSeconds((v) => !v)}
        style={{
          alignSelf: "flex-start",
          backgroundColor: "rgba(110,231,255,0.12)",
          borderWidth: 1,
          borderColor: "rgba(110,231,255,0.35)",
          paddingVertical: 10,
          paddingHorizontal: 14,
          borderRadius: 14,
        }}
      >
        <Text style={{ color: theme.colors.accent, fontWeight: "800" }}>
          {showSeconds ? "Ocultar segundos" : "Mostrar segundos"}
        </Text>
      </Pressable>
    </View>
  );
}
