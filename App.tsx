import { StatusBar } from "react-native";

import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "./config/gluestack-ui.config";

import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import Toast from "react-native-toast-message";

import { AuthContextProvider } from "@contexts/AuthContext";

import { Routes } from "@routes/index";

import { Loading } from "@components/Loading";

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

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
