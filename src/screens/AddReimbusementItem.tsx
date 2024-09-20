import { KeyboardAvoidingView, ScrollView } from "@gluestack-ui/themed";

import { Header } from "@components/Header";

export function AddReimbusementItem() {
  return (
    <KeyboardAvoidingView flex={1} px={"$12"} py={"$4"} bg={"$gray500"}>
      <ScrollView flex={1} showsVerticalScrollIndicator={false}>
        <Header title={"Despesas"} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
