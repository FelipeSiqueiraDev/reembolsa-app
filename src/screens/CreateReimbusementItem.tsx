import { useEffect, useState } from "react";
import { Alert } from "react-native";

import {
  KeyboardAvoidingView,
  ScrollView,
  VStack,
  Text,
} from "@gluestack-ui/themed";

import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

import * as yup from "yup";
import { api } from "@services/api";
import { Picker } from "@react-native-picker/picker";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";

import { temporaryUpload } from "@services/temporaryUpload";
import * as ImagePicker from "expo-image-picker";
import { useRoute } from "@react-navigation/native";

import { typesDTO } from "@dtos/typesDTOP";

import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { Header } from "@components/Header";
import { Picture } from "@components/Picture";
import { AddPictureButton } from "@components/AddPictureButton";

const ReimbusementItemSchema = yup.object({
  type: yup.string().required("Tipo é obrigatório"),
  date: yup.string().required("Data é obrigatório"),
  description: yup.string().required("Descrição é obrigatório"),
  value: yup.string().required("Valor é obrigatório"),
});

type ReimbusementItemProps = {
  type: string;
  date: string;
  description: string;
  value: string;
};

export function CreateReimbusementItem() {
  const route = useRoute();
  const { EntityId } = route.params as { EntityId: number };
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const [types, setTypes] = useState<typesDTO[]>([]);
  const [selectedType, setSelectedType] = useState<string>("");

  const [image, setImage] = useState<ImagePicker.ImagePickerAsset | null>(null);

  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<ReimbusementItemProps>({
    resolver: yupResolver(ReimbusementItemSchema),
  });

  async function getTypes() {
    try {
      const settings = {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
      };

      const {
        data: { Entities },
      } = await api("/Services/Default/ReembolsoItemTipo/List", settings);
      setTypes(Entities);
    } catch (err) {
      console.log("Erro ao buscar as empresas.");
    }
  }

  async function handleAddPicture() {
    const { assets, canceled } = await ImagePicker.launchCameraAsync({
      quality: 1,
    });

    if (canceled) {
      console.log("Picture selection Canceled");
      return;
    }

    setImage(assets[0]);
  }

  function handleRemoveImage() {
    setImage(null);
  }

  async function handleCreateItem(data: ReimbusementItemProps) {
    if (!image?.uri) {
      Alert.alert("Por favor adicione uma imagem!");
      return;
    }

    const selectedTypeData = types.find((type) => type.Id === data.type);

    if (!selectedTypeData) {
      Alert.alert("Tipo selecionado inválido!");
      return;
    }

    const formValue = parseFloat(data.value);
    const valorPolitica = selectedTypeData.ValorPolitica;

    if (formValue > valorPolitica) {
      Alert.alert(
        "AVISO!!",
        `O valor solicitado para reembolso excede o limite da política.\nReembolso acima do valor da política requer aprovação especial.\nDeseja mesmo continuar?`,
        [
          {
            text: "Não",
            onPress: () => {
              console.log("Ação cancelada");
              return;
            },
            style: "cancel",
          },
          {
            text: "Sim",
            onPress: async () => {
              // Continua a função normalmente após a confirmação
              try {
                const imageUploaded = await temporaryUpload(image.uri);

                function formatDateToISO(date: string): string {
                  const [day, month, year] = date.split("/");
                  return `${year}-${month}-${day}`;
                }

                const formattedDate = formatDateToISO(data.date);

                const settings = {
                  method: "post",
                  data: {
                    Entity: {
                      AnexoPath: JSON.stringify([{ Filename: imageUploaded }]),
                      Data: formattedDate,
                      Descricao: data.description,
                      Quantidade: 1,
                      ReembolsoId: EntityId,
                      ReembolsoItemTipoId: data.type,
                      ValorSolicitado: data.value,
                      ValorVigenciaAtual: 100,
                    },
                  },
                };

                await api("/Services/Default/ReembolsoItem/Create", settings);

                navigation.navigate("addReimbusementItem", {
                  EntityId: EntityId,
                });
              } catch (err) {
                //@ts-ignore
                console.log(err.response);
              }
            },
          },
        ]
      );
      return;
    }

    try {
      const imageUploaded = await temporaryUpload(image.uri);

      function formatDateToISO(date: string): string {
        const [day, month, year] = date.split("/");
        return `${year}-${month}-${day}`;
      }

      const formattedDate = formatDateToISO(data.date);

      const settings = {
        method: "post",
        data: {
          Entity: {
            AnexoPath: JSON.stringify([{ Filename: imageUploaded }]),
            Data: formattedDate,
            Descricao: data.description,
            Quantidade: 1,
            ReembolsoId: EntityId,
            ReembolsoItemTipoId: data.type,
            ValorSolicitado: data.value,
            ValorVigenciaAtual: 100,
          },
        },
      };

      await api("/Services/Default/ReembolsoItem/Create", settings);

      navigation.navigate("addReimbusementItem", { EntityId: EntityId });
    } catch (err) {
      //@ts-ignore
      console.log(err.response);
    }
  }

  function handleNavigation() {
    navigation.navigate("addReimbusementItem", { EntityId: EntityId });
  }

  useEffect(() => {
    getTypes();
  }, []);

  return (
    <KeyboardAvoidingView flex={1} px={"$12"} py={"$4"} bg={"$gray500"}>
      <ScrollView flex={1} showsVerticalScrollIndicator={false}>
        <Header title={"Criar despesa"} navigate={handleNavigation} />

        <VStack pb={"$4"} mt={"$6"}>
          <VStack>
            <Controller
              control={control}
              name={"type"}
              render={({ field: { onChange, value } }) => (
                <>
                  <Text ml={"$2"} mb={"$1"} color={"$gray200"}>
                    Tipo:
                  </Text>
                  <Picker
                    selectedValue={value}
                    onValueChange={(itemValue) => {
                      onChange(itemValue);
                      setSelectedType(itemValue);
                    }}
                    style={{
                      color: "white",
                      backgroundColor: "#121214",
                      marginBottom: 20,
                    }}
                  >
                    <Picker.Item label="Selecione o tipo da despesa" value="" />
                    {Array.isArray(types) && types.length > 0 ? (
                      types.map((type) => (
                        <Picker.Item
                          key={type.Id}
                          label={type.Nome}
                          value={type.Id}
                        />
                      ))
                    ) : (
                      <Picker.Item label="Nenhum tipo disponível" value="" />
                    )}
                  </Picker>
                  {errors.type && (
                    <Text color={"$red500"} ml={"$2"}>
                      {errors.type?.message}
                    </Text>
                  )}
                </>
              )}
            />

            <Controller
              control={control}
              name={"date"}
              render={({ field: { onChange, value } }) => (
                <>
                  <Text ml={"$2"} mb={"$1"} color={"$gray200"}>
                    Data:
                  </Text>
                  <Input
                    placeholder="DD/MM/AAAA"
                    keyboardType="default"
                    value={value}
                    editStyle={"date"}
                    onChangeText={onChange}
                    errorMessage={errors.date?.message}
                  />
                </>
              )}
            />

            <Controller
              control={control}
              name={"description"}
              render={({ field: { onChange, value } }) => (
                <>
                  <Text ml={"$2"} mb={"$1"} color={"$gray200"}>
                    Descrição:
                  </Text>
                  <Input
                    placeholder="Descrição"
                    keyboardType="default"
                    value={value}
                    onChangeText={onChange}
                    errorMessage={errors.description?.message}
                  />
                </>
              )}
            />

            <Controller
              control={control}
              name={"value"}
              render={({ field: { onChange, value } }) => (
                <>
                  <Text ml={"$2"} mb={"$1"} color={"$gray200"}>
                    Valor:
                  </Text>
                  <Input
                    placeholder="R$: 0,00"
                    keyboardType="numeric"
                    value={value}
                    onChangeText={onChange}
                    errorMessage={errors.value?.message}
                  />
                </>
              )}
            />

            {image ? (
              <Picture
                onPress={handleRemoveImage}
                source={{ uri: image.uri }}
              />
            ) : (
              <AddPictureButton onPress={handleAddPicture} />
            )}

            <Button
              title={"Enviar"}
              mt={"$6"}
              onPress={handleSubmit(handleCreateItem)}
            />
          </VStack>
        </VStack>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
