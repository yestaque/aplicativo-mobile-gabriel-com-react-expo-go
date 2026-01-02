import React, { useMemo, useState } from "react";
import { View, Text, Pressable } from "react-native";
import { Calendar } from "react-native-calendars";
import { theme } from "../../src/ui/theme";

function toISO(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export default function YearCalendar() {
  const today = useMemo(() => new Date(), []);
  const [selected, setSelected] = useState<string>(toISO(today));

  const markedDates = useMemo(
    () => ({
      [selected]: { selected: true, selectedColor: theme.colors.accent2 },
    }),
    [selected]
  );

  return (
    <View style={{ gap: 10 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <Text style={{ color: theme.colors.muted }}>
          Selecionado: <Text style={{ color: theme.colors.text, fontWeight: "900" }}>{selected}</Text>
        </Text>

        <Pressable
          onPress={() => setSelected(toISO(new Date()))}
          style={{
            backgroundColor: "rgba(110,231,255,0.12)",
            borderWidth: 1,
            borderColor: "rgba(110,231,255,0.35)",
            paddingVertical: 8,
            paddingHorizontal: 12,
            borderRadius: 14,
          }}
        >
          <Text style={{ color: theme.colors.accent, fontWeight: "900" }}>Hoje</Text>
        </Pressable>
      </View>

      <View
        style={{
          overflow: "hidden",
          borderRadius: 16,
          borderWidth: 1,
          borderColor: theme.colors.border,
          backgroundColor: "rgba(255,255,255,0.02)",
        }}
      >
        <Calendar
          current={selected}
          onDayPress={(day) => setSelected(day.dateString)}
          markedDates={markedDates}
          enableSwipeMonths
          theme={{
            backgroundColor: "transparent",
            calendarBackground: "transparent",
            dayTextColor: theme.colors.text,
            monthTextColor: theme.colors.text,
            textDisabledColor: "rgba(234,240,255,0.35)",
            arrowColor: theme.colors.accent,
            todayTextColor: theme.colors.accent,
          }}
        />
      </View>
    </View>
  );
}
