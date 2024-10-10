import { Heading, HStack, Pressable, View, VStack } from "@gluestack-ui/themed";
import { reimbusementDTO } from "@dtos/reimbusementDTO";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "@gluestack-ui/themed";

import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

type ReimbusementCardProps = {
  data: reimbusementDTO;
};
export function ReimbusementCard({ data }: ReimbusementCardProps) {
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const reimbursementAmount = () => {
    if (data.ReembolsoItemList?.length === 0) return "0,00";
    return data.ReembolsoItemList?.reduce(
      (amount, item) => amount + item.ValorSolicitado,
      0
    )
      .toFixed(2)
      .replace(".", ",");
  };

  return (
    <Pressable
      w={"$full"}
      h={"$32"}
      bg={"$gray400"}
      px={"$4"}
      my={"$2"}
      rounded={"$lg"}
      onPress={() =>
        navigation.navigate("reimbusementDetails", { EntityId: data.Id })
      }
    >
      <View
        h={"$full"}
        w={"$2"}
        bg={data.Tipo === 0 ? "$red500" : "$cyan500"}
        position="absolute"
        top={0}
        left={0}
        mr={"$12"}
      />

      <View
        w={"$2"}
        h={"$2"}
        bg={
          data.Status === 0
            ? "$yellow500"
            : data.Status === 1
            ? "$blue500"
            : data.Status === 2
            ? "$green500"
            : data.Status === 3
            ? "$red500"
            : "$gray500"
        }
        rounded={"$full"}
        position={"absolute"}
        top={"$5"}
        right={"$5"}
      />

      <HStack alignItems={"center"} mt={"$1"}>
        <Ionicons
          name={data.Tipo === 0 ? "basket" : "airplane"}
          size={24}
          color={"#C4C4CC"}
        />
        <Heading color={"$gray200"} ml={"$2"} fontSize={"$md"}>
          {data.Tipo === 0 ? "Reembolso Simples" : "Reembolso de Viagem"}
        </Heading>
      </HStack>

      <HStack
        mt={"$8"}
        borderBottomWidth={"$1"}
        borderColor={"$gray300"}
        alignItems={"center"}
        w={"$72"}
        justifyContent={"space-between"}
      >
        <Text color={"$gray300"}>R$: {reimbursementAmount()}</Text>

        <HStack alignItems={"center"}>
          <Ionicons name={"link"} size={18} color={"#C4C4CC"} />
          <Text color={"$gray300"} ml={"$1"} fontWeight={"$black"}>
            {data.ReembolsoItemList?.length || 0}
          </Text>
        </HStack>
      </HStack>
      <Text fontSize={"$sm"} marginTop={"$2.5"}>
        Criado em {new Date(data.InsertDate).toLocaleDateString("pt-br")}
      </Text>
    </Pressable>
  );
}
