import { Heading, HStack, Pressable, View, VStack } from "@gluestack-ui/themed";

import { ReembusementItem } from "@dtos/reimbusementDTO";

type ReimbusementCardProps = {
  data: ReembusementItem;
};

export function ReimbusementItemCard({ data }: ReimbusementCardProps) {
  return (
    <Pressable
      w={"$full"}
      h={"$32"}
      bg={"$gray400"}
      px={"$4"}
      my={"$2"}
      rounded={"$lg"}
      onPress={() => console.log("CLICK NO PRODUTO")}
    >
      <Heading>{data.Id}</Heading>
    </Pressable>
  );
}
