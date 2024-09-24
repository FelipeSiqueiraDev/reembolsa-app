import { KeyboardAvoidingView, ScrollView } from "@gluestack-ui/themed";

import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

import { Header } from "@components/Header";
import { Button } from "@components/Button";

export function AddReimbusementItem() {
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  return (
    <KeyboardAvoidingView flex={1} px={"$12"} py={"$4"} bg={"$gray500"}>
      <ScrollView flex={1} showsVerticalScrollIndicator={false}>
        <Header title={"Despesas"} />

        <Button
          title={"Adicionar nova despesa"}
          mt={"$2"}
          onPress={() => navigation.navigate("createReimbusementItem")}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
