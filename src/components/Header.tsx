import { useEffect, useState } from "react";
import { VStack, Heading, Text, HStack } from "@gluestack-ui/themed";

import { getUserCredentials } from "@storage/user/getUser.credentials";

import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

import { useAuth } from "@hooks/useAuth";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  title: string;
  home?: boolean;
};

export function Header({ title, home = false }: Props) {
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const { logout } = useAuth();
  const [user, setUser] = useState<string>();

  async function getUserInfo() {
    const user = await getUserCredentials();
    setUser(user.username.charAt(0).toUpperCase() + user.username.slice(1));
  }

  useEffect(() => {
    getUserInfo();
  });

  return (
    <HStack
      marginTop={"$4"}
      height={"$20"}
      paddingBottom={"$4"}
      alignItems={"center"}
      borderBottomWidth={"$1"}
      borderBottomColor={"$gray200"}
      justifyContent={"space-between"}
    >
      {!home && (
        <Ionicons
          name={"return-up-back"}
          size={32}
          mr={"$12"}
          color={"white"}
          onPress={() => navigation.goBack()}
        />
      )}

      <VStack>
        <Heading fontFamily={"$heading"} color={"$white"}>
          {title}
        </Heading>
        {home && <Text color={"$green300"}>{user}</Text>}
      </VStack>

      {home && (
        <Ionicons
          name={"exit-outline"}
          size={32}
          color={"white"}
          onPress={logout}
        />
      )}
    </HStack>
  );
}
