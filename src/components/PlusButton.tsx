import { Pressable } from "@gluestack-ui/themed";

import { Ionicons } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

export function PlusButton() {
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  return (
    <Pressable
      onPress={() => navigation.navigate("createReimbusement")}
      width={"$14"}
      height={"$14"}
      bg={"$green500"}
      right={"$5"}
      bottom={"$5"}
      position={"absolute"}
      rounded={"$full"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Ionicons name={"add-outline"} size={32} color={"white"} />
    </Pressable>
  );
}
