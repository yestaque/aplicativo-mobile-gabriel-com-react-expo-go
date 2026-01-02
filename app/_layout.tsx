import React, { useEffect } from "react";
import { Tabs } from "expo-router";
import { Pressable, View, Text, Platform } from "react-native";
import { Home, Search, MessageCircle } from "lucide-react-native";
import * as Haptics from "expo-haptics";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";

import { theme } from "../src/ui/theme";

function IconBounce({
  children,
  focused,
}: {
  children: React.ReactNode;
  focused: boolean;
}) {
  const s = useSharedValue(1);

  useEffect(() => {
    s.value = withSpring(focused ? 1.12 : 1, { damping: 10 });
  }, [focused, s]);

  const st = useAnimatedStyle(() => ({
    transform: [{ scale: s.value }],
  }));

  return <Animated.View style={st}>{children}</Animated.View>;
}

function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  return (
    <View
      style={{
        backgroundColor: theme.colors.card,
        borderTopWidth: 1,
        borderTopColor: theme.colors.border,
        height: 78,
        paddingBottom: 10,
        paddingTop: 8,
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "space-around",
      }}
    >
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const options = descriptors[route.key].options;

        const label =
          options.tabBarLabel !== undefined
            ? String(options.tabBarLabel)
            : options.title !== undefined
            ? options.title
            : route.name;

        const onPress = () => {
          Haptics.impactAsync(
            route.name === "modal"
              ? Haptics.ImpactFeedbackStyle.Medium
              : Haptics.ImpactFeedbackStyle.Light
          );

          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name as never);
          }
        };

        // ÍCONES por rota
        const renderIcon = () => {
          const color = isFocused ? theme.colors.accent : theme.colors.muted;

          if (route.name === "index") {
            return <Home size={24} color={color} strokeWidth={2.4} />;
          }
          if (route.name === "explore") {
            return <Search size={24} color={color} strokeWidth={2.4} />;
          }
          // modal (Contato)
          return <MessageCircle size={28} color={"#0B1220"} strokeWidth={2.6} />;
        };

        // BOTÃO CENTRAL (Contato)
        if (route.name === "modal") {
          return (
            <View key={route.key} style={{ width: 90, alignItems: "center" }}>
              <Pressable
                onPress={onPress}
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 32,
                  backgroundColor: theme.colors.accent,
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 14, // “flutua” acima da barra
                  borderWidth: 1,
                  borderColor: "rgba(255,255,255,0.12)",
                  shadowColor: "#000",
                  shadowOpacity: 0.35,
                  shadowRadius: 12,
                  shadowOffset: { width: 0, height: 8 },
                  elevation: 8,
                }}
              >
                <IconBounce focused={true}>{renderIcon()}</IconBounce>
              </Pressable>

              <Text
                style={{
                  color: isFocused ? theme.colors.accent : theme.colors.muted,
                  fontWeight: "900",
                  fontSize: 12,
                  marginTop: -8,
                }}
              >
                Contato
              </Text>
            </View>
          );
        }

        // Botões normais
        return (
          <Pressable
            key={route.key}
            onPress={onPress}
            style={{ width: 90, alignItems: "center", justifyContent: "center", gap: 6 }}
          >
            <IconBounce focused={isFocused}>{renderIcon()}</IconBounce>
            <Text
              style={{
                color: isFocused ? theme.colors.accent : theme.colors.muted,
                fontWeight: "900",
                fontSize: 12,
              }}
            >
              {label === "index" ? "Início" : label === "explore" ? "Explore" : label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      // Esconde a tabbar padrão e usa a nossa
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: true,
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Início" }} />
      <Tabs.Screen name="explore" options={{ title: "Explore" }} />
      <Tabs.Screen name="modal" options={{ title: "Contato" }} />
    </Tabs>
  );
}
