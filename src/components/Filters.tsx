import { HStack } from "@gluestack-ui/themed";
import { FilterButton } from "./FilterButton";

type FilterItem = {
  id: number;
  name: string;
};

type FiltersProps = {
  selectedFilter: string | null;
  setSelectedFilter: (filter: string | null) => void;
};

export function Filters({ selectedFilter, setSelectedFilter }: FiltersProps) {
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
