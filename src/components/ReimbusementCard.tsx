import { Heading, HStack, Pressable, View, VStack } from "@gluestack-ui/themed";

import { reimbusementDTO } from "@dtos/reimbusementDTO";

import { Ionicons } from "@expo/vector-icons";
import { Text } from "@gluestack-ui/themed";

type ReimbusementCardProps = {
  data: reimbusementDTO;
};

export function ReimbusementCard({ data }: ReimbusementCardProps) {
  const reimbursementAmount = () => {
    if (data.ReembolsoItemList.length === 0) return "0,00";
    return data.ReembolsoItemList.reduce(
      (amount, item) => amount + item.ValorSolicitado,
      0
    )
      .toFixed(2)
      .replace(".", ",");
  };

  return (
    <Pressable w={"$full"} h={"$32"} bg={"$gray400"} px={"$4"} rounded={"$lg"}>
      <View
        h={"$full"}
        w={"$2"}
        bg={"$red500"}
        position="absolute"
        top={0}
        left={0}
        mr={"$12"}
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
            {data.ReembolsoItemList.length}
          </Text>
        </HStack>
        
      </HStack>
    </Pressable>
  );
}
