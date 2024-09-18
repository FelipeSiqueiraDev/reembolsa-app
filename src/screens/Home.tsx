import { VStack } from "@gluestack-ui/themed";

import { Filters } from "@components/Filters";
import { Header } from "@components/Header";
import { PlusButton } from "@components/PlusButton";

export function Home() {
  return (
    <VStack flex={1} p={"$12"} bg={"$gray500"}>
      <Header title={"Bem-vindo(a)"} home={true} />

      <Filters />

      {/* COLOCAR A FLATLIST COM OS REEMBOLSOS AQUI!!!!!! 
       <FlatList/> */}

      <PlusButton />
    </VStack>
  );
}
