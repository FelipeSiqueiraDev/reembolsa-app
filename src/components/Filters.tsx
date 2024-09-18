import { useState } from "react";
import { HStack } from "@gluestack-ui/themed";

import { FilterButton } from "./FilterButton";

type FilterItem = {
  id: number;
  name: string;
};

const filterList: FilterItem[] = [
  { id: 1, name: "Simples" },
  { id: 2, name: "Viagem" },
];

export function Filters() {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  // Função para aplicar o filtro
  const filteredList = selectedFilter
    ? filterList.filter((item) => item.name === selectedFilter)
    : filterList;

  return (
    <HStack
      h={"$12"}
      mt={"$4"}
      justifyContent={"space-around"}
      alignItems={"center"}
    >
      <FilterButton
        name="Simples"
        isActive={selectedFilter === "Simples"}
        onPress={() =>
          setSelectedFilter(selectedFilter === "Simples" ? null : "Simples")
        }
      />
      <FilterButton
        name="Viagem"
        isActive={selectedFilter === "Viagem"}
        onPress={() =>
          setSelectedFilter(selectedFilter === "Viagem" ? null : "Viagem")
        }
      />
    </HStack>
  );
}
