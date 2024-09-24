import { VStack, Text, Pressable } from "@gluestack-ui/themed";

import { Ionicons } from "@expo/vector-icons";

type Props = {
  onPress(): Promise<void>;
};

export function AddPictureButton({ onPress }: Props) {
  return (
    <Pressable
      h={"$48"}
      borderWidth={"$1"}
      alignItems={"center"}
      borderStyle={"dashed"}
      borderColor={"$gray300"}
      justifyContent={"center"}
      onPress={onPress}
    >
      <Ionicons name="camera" size={24} color={"#7C7C8A"} />
      <Text color={"$gray300"}>Adicionar foto</Text>
    </Pressable>
  );
}
