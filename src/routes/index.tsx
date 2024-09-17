import { SafeAreaView } from "react-native";
import { View } from "@gluestack-ui/themed";

import { NavigationContainer } from "@react-navigation/native";

import { useAuth } from "@hooks/useAuth";

import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";

export function Routes() {
  const { logged } = useAuth();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        {logged ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </SafeAreaView>
  );
}
