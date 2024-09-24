import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { Text, VStack } from "@gluestack-ui/themed";

import { api } from "@services/api";

import { Header } from "@components/Header";
import { Filters } from "@components/Filters";
import { PlusButton } from "@components/PlusButton";
import { reimbusementDTO } from "@dtos/reimbusementDTO";
import { ReimbusementCard } from "@components/ReimbusementCard";

export function Home() {
  const [reimbusements, setReimbusements] = useState<reimbusementDTO[]>([]);

  async function getReimbusements() {
    try {
      const settings = {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          IncludeColumns: ["ReembolsoItemList"],
        },
      };

      const {
        data: { Entities },
      } = await api("/Services/Default/Reembolso/List", settings);

      setReimbusements(Entities);
    } catch (err) {
      console.log("Erro ao buscar as empresas.");
    }
  }

  useEffect(() => {
    getReimbusements();
  }, []);

  return (
    <VStack flex={1} p={"$12"} bg={"$gray500"}>
      <Header title={"Bem-vindo(a)"} home={true} />

      <Filters />

      <FlatList
        data={reimbusements}
        keyExtractor={(item) => String(item.Id)}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginTop: 16, marginBottom: 32 }}
        renderItem={({ item }: { item: reimbusementDTO }) => (
          <ReimbusementCard data={item} />
        )}
        ListEmptyComponent={() => (
          <Text color={"$gray300"}>Nenhuma empresa encontrada.</Text>
        )}
      />

      <PlusButton />
    </VStack>
  );
}
