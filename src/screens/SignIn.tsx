import { useState } from "react";

import { Button } from "@components/Button";
import { Input } from "@components/Input";
import {
  Center,
  Heading,
  HStack,
  KeyboardAvoidingView,
  ScrollView,
} from "@gluestack-ui/themed";

import { UserDTO } from "@dtos/userDTO";
import { useAuth } from "@hooks/useAuth";

import Toast from "react-native-toast-message";

import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const signInSchema = yup.object({
  username: yup.string().required("Informe seu usuário!"),
  password: yup.string().required("Informe sua senha!"),
});

export function SignIn() {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserDTO>({
    resolver: yupResolver(signInSchema),
  });

  async function handleSignIn({ username, password }: UserDTO) {
    setLoading(true);
    try {
      await login({ username, password });
    } catch (err: any) {
      console.log(err);

      Toast.show({
        type: "error",
        text1: "Erro ao fazer login",
        text2: err.message.data.Error.Details,
      });

      throw err;
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView flex={1} bg={"$gray500"} px={"$10"} pb={"$16"}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <Center my={"$24"} gap={"$2"} flex={1}>
          <Heading color={"$gray100"} fontFamily={"$heading"} mb={"$4"}>
            Acesse sua conta!
          </Heading>

          <Controller
            control={control}
            name={"username"}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder={"Usuário"}
                keyboardType={"default"}
                autoCapitalize={"none"}
                returnKeyType={"go"}
                value={value}
                blurOnSubmit={false}
                onChangeText={onChange}
              />
            )}
          />

          <Controller
            control={control}
            name={"password"}
            render={({ field: { onChange, value } }) => (
              <Input
                value={value}
                returnKeyType="send"
                placeholder={"Senha"}
                editStyle={"password"}
                autoCapitalize={"none"}
                onChangeText={onChange}
                keyboardType={"default"}
                onSubmitEditing={handleSubmit(handleSignIn)}
              />
            )}
          />

          <Button
            title={"Acessar"}
            isLoading={loading}
            onPress={handleSubmit(handleSignIn)}
          />
        </Center>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
