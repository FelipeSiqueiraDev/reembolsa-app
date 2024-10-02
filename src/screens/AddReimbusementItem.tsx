import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { KeyboardAvoidingView, ScrollView, View } from "@gluestack-ui/themed";

import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { useRoute } from "@react-navigation/native";

import { Header } from "@components/Header";
import { Button } from "@components/Button";
import { api } from "@services/api";
import { ReembusementItem } from "@dtos/reimbusementDTO";
import { Text } from "@gluestack-ui/themed";
import { ReimbusementItemCard } from "@components/ReimbusementItemCard";

export function AddReimbusementItem() {
  const route = useRoute();
  const { EntityId } = route.params as { EntityId: number };

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const [reimbusementItems, setReimbusementItems] = useState<
    ReembusementItem[]
  >([]);

  async function loadReimbusementItems() {
    try {
      const settings = {
        method: "post",
        headers: {
          "Content-Type": "application/json; chatset=utf-8",
        },
        EqualityFilter: { ReembolsoId: EntityId },
      };

      const {
        data: { Entities },
      } = await api("/Services/Default/ReembolsoItem/List", settings);
      console.log(Entities);
      setReimbusementItems(Entities);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    loadReimbusementItems();
  }, []);

  return (
    <KeyboardAvoidingView flex={1} px={"$12"} py={"$4"} bg={"$gray500"}>
      <ScrollView flex={1} showsVerticalScrollIndicator={false}>
        <Header title={"Despesas"} />

        <Button
          title={"Adicionar nova despesa"}
          mt={"$2"}
          onPress={() =>
            navigation.navigate("createReimbusementItem", {
              EntityId: EntityId,
            })
          }
        />

        <FlatList
          data={reimbusementItems}
          keyExtractor={(item) => String(item.Id)}
          showsHorizontalScrollIndicator={false}
          style={{ marginTop: 32, marginBottom: 32 }}
          renderItem={({ item }: { item: ReembusementItem }) => (
            <ReimbusementItemCard data={item} />
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
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
