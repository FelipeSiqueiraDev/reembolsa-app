import { useEffect } from "react";
import { StatusBar } from "react-native";

import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "./config/gluestack-ui.config";

import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import Toast from "react-native-toast-message";

import * as Updates from "expo-updates";

import { AuthContextProvider } from "@contexts/AuthContext";

import { Routes } from "@routes/index";

import { Loading } from "@components/Loading";

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  async function onFetchUpdateAsync() {
    try {
      const update = await Updates.checkForUpdateAsync();

      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (!__DEV__) {
      onFetchUpdateAsync();
    }
  }, []);

  return (
    <GluestackUIProvider config={config}>
      <StatusBar
        translucent
        barStyle="light-content"
        backgroundColor={"transparent"}
      />

      <AuthContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
        <Toast />
      </AuthContextProvider>
    </GluestackUIProvider>
  );
}
