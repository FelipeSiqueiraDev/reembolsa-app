import { useEffect, useState } from "react";
import { FlatList, ScrollView } from "react-native";
import { Text, View, VStack } from "@gluestack-ui/themed";
import { StatusFilter } from "@components/StatusFilter";
import { api } from "@services/api";
import { Header } from "@components/Header";
import { Filters } from "@components/Filters";
import { PlusButton } from "@components/PlusButton";
import { reimbusementDTO } from "@dtos/reimbusementDTO";
import { ReimbusementCard } from "@components/ReimbusementCard";

export function Home() {
  const [reimbusements, setReimbusements] = useState<reimbusementDTO[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<number | null>(null);

  async function getReimbusements() {
    try {
      const settings = {
        method: "post",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        data: {
          IncludeColumns: ["ReembolsoItemList"],
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
    const filterByType =
      !selectedFilter ||
      (selectedFilter === "Simples" && reimbusement.Tipo === 0) ||
      (selectedFilter === "Viagem" && reimbusement.Tipo === 1);

    const filterByStatus =
      selectedStatus === null ||
      (selectedStatus === 0 && reimbusement.Status === 0) ||
      (selectedStatus === 1 && reimbusement.Status === 1) ||
      (selectedStatus === 2 && reimbusement.Status === 2) ||
      (selectedStatus === 3 && reimbusement.Status === 3);

    return filterByType && filterByStatus;
  });

  return (
    <VStack flex={1} p={"$12"} bg={"$gray500"}>
      <Header title={"Bem-vindo(a)"} home={true} />

      <Filters
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
      />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{
          marginTop: 16,
          height: 64,
          paddingVertical: 4,
        }}
      >
        <StatusFilter
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
        />
      </ScrollView>

      <FlatList
        data={filteredReimbusements}
        keyExtractor={(item) => String(item.Id)}
        showsVerticalScrollIndicator={false}
        style={{
          marginTop: 16,
          marginBottom: 32,
          height: "70%",
        }}
        renderItem={({ item }: { item: reimbusementDTO }) => (
          <ReimbusementCard data={item} />
        )}
        ListEmptyComponent={() => (
          <View
            flex={1}
            alignItems={"center"}
            justifyContent={"center"}
            mt={"$12"}
          >
            <Text color={"$gray300"} fontSize={"$xl"} textAlign={"center"}>
              Nenhum reembolso encontrado.
            </Text>
          </View>
        )}
      />

      <PlusButton />
    </VStack>
  );
}
