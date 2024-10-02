import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { Text, View, VStack } from "@gluestack-ui/themed";

import { api } from "@services/api";

import { Header } from "@components/Header";
import { Filters } from "@components/Filters";
import { PlusButton } from "@components/PlusButton";
import { reimbusementDTO } from "@dtos/reimbusementDTO";
import { ReimbusementCard } from "@components/ReimbusementCard";

export function Home() {
  const [reimbusements, setReimbusements] = useState<reimbusementDTO[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  async function getReimbusements() {
    try {
      const settings = {
        method: "post",
        headers: {
          "Content-Type": "application/json; chatset=utf-8",
        },
      };

      const {
        data: { Entities },
      } = await api("/Services/Default/Reembolso/List", settings);

      setReimbusements(Entities);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getReimbusements();
  }, []);

  const filteredReimbusements = reimbusements.filter((reimbusement) => {
    if (!selectedFilter) return true;
    if (selectedFilter === "Simples" && reimbusement.Tipo === 0) return true;
    if (selectedFilter === "Viagem" && reimbusement.Tipo === 1) return true;
    return false;
  });

  return (
    <VStack flex={1} p={"$12"} bg={"$gray500"}>
      <Header title={"Bem-vindo(a)"} home={true} />

      <Filters
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
      />

      <FlatList
        data={filteredReimbusements}
        keyExtractor={(item) => String(item.Id)}
        showsHorizontalScrollIndicator={false}
        style={{ marginTop: 32, marginBottom: 32 }}
        renderItem={({ item }: { item: reimbusementDTO }) => (
          <ReimbusementCard data={item} />
        )}
        ListEmptyComponent={() => (
          <View
            flex={1}
            alignItems={"center"}
            justifyContent={"center"}
            ml={"$12"}
          >
            <Text color={"$gray300"}>Nenhum reembolso encontrado.</Text>
          </View>
        )}
      />

      <PlusButton />
    </VStack>
  );
}
