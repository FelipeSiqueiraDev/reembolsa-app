import { HStack, Button, Text } from "@gluestack-ui/themed";

type StatusFilterProps = {
  selectedStatus: number | null; // Alterado para number
  setSelectedStatus: (status: number | null) => void;
};

const statusList = [
  { label: "Todos", value: null }, // Sem filtro
  { label: "Andamento", value: 0 }, // Status 0
  { label: "Aguardando aprovação", value: 1 }, // Status 1
  { label: "Aprovado", value: 2 }, // Status 2
  { label: "Reprovado", value: 3 }, // Status 3
];

export function StatusFilter({
  selectedStatus,
  setSelectedStatus,
}: StatusFilterProps) {
  return (
    <HStack gap={"$2"} justifyContent={"flex-start"}>
      {statusList.map((status) => (
        <Button
          key={status.value ?? "todos"} // Usa "todos" como chave única para o filtro "Todos"
          onPress={() => setSelectedStatus(status.value)}
          bg={selectedStatus === status.value ? "$green500" : "$gray300"}
        >
          <Text
            color={selectedStatus === status.value ? "$white" : "$green300"}
          >
            {status.label}
          </Text>
        </Button>
      ))}
    </HStack>
  );
}
