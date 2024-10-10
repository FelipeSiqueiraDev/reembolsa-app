import { Heading, HStack, Pressable, Text, VStack } from "@gluestack-ui/themed";
import { Image, Alert } from "react-native";
import { ReembusementItem } from "@dtos/reimbusementDTO";
import { api, baseURL } from "@services/api";
import { Ionicons } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

type ReimbusementCardProps = {
  data: ReembusementItem;
  onDelete: () => void;
};

export function ReimbusementItemCard({
  data,
  onDelete,
}: ReimbusementCardProps) {
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  let anexoPath: { Filename: string; OriginalName: string }[] = [];

  try {
    //@ts-ignore
    anexoPath = JSON.parse(data.AnexoPath);
  } catch (error) {
    console.error("Erro ao analisar AnexoPath:", error);
  }

  function showAlert(itemId: number) {
    Alert.alert(
      "Confirmar Exclusão",
      "Deseja mesmo excluir o item?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Excluir",
          onPress: () => deleteItem(itemId),
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  }

  async function deleteItem(itemId: number) {
    try {
      const settings = {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          EntityId: itemId,
        },
      };

      await api("/Services/Default/ReembolsoItem/Delete", settings);
      onDelete();
    } catch (err) {
      //@ts-ignore
      console.log(err.response);
    }
  }

  return (
    <Pressable
      w={"$full"}
      h={"$72"}
      bg={"$gray400"}
      my={"$2"}
      rounded={"$lg"}
      onPress={() => console.log(data)}
    >
      {anexoPath.length > 0 && (
        <Image
          source={{
            uri: `${baseURL}/upload/${anexoPath[0].Filename}`,
          }}
          style={{
            width: "100%",
            height: "50%",
            borderRadius: 8,
          }}
          resizeMode="cover"
        />
      )}
      <VStack px={"$4"} mt={"$4"}>
        <Heading color={"$gray200"}>
          Reembolso {data.ReembolsoItemTipoLabel}
        </Heading>

        <HStack>
          <Ionicons name={"cash-outline"} size={24} color={"#7C7C8A"} />
          <Text color={"$gray300"} ml={"$2"} fontSize={"$lg"}>
            R$ {data.ValorSolicitado.toFixed(2)}
          </Text>
        </HStack>

        <HStack>
          <Ionicons name={"calendar-outline"} size={24} color={"#7C7C8A"} />
          <Text color={"$gray300"} ml={"$2"} fontSize={"$lg"}>
            {new Date(data.Data).toLocaleDateString("pt-br")}
          </Text>
        </HStack>
      </VStack>

      <Pressable
        w={"$full"}
        h={"$8"}
        bg={"$red500"}
        rounded={"$lg"}
        alignItems={"center"}
        justifyContent={"center"}
        position={"absolute"}
        bottom={0}
        onPress={() => showAlert(data.Id)} // Atualizado para chamar showAlert
      >
        <Text color={"white"}>EXCLUIR ITEM</Text>
      </Pressable>
    </Pressable>
  );
}
