import { useEffect, useState } from "react";
import {
  Text,
  HStack,
  VStack,
  ScrollView,
  KeyboardAvoidingView,
  Pressable,
} from "@gluestack-ui/themed";

import { Ionicons } from "@expo/vector-icons";

import * as yup from "yup";
import { Picker } from "@react-native-picker/picker";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { useRoute } from "@react-navigation/native";

import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

import { Input } from "@components/Input";
import { Header } from "@components/Header";
import { Button } from "@components/Button";
import { FilterButton } from "@components/FilterButton";

import { api } from "@services/api";

import { departamentDTO } from "@dtos/departamentDTO";
import { companiesDTO } from "@dtos/companiesDTO";
import { Alert } from "react-native";

const ReimbusementSchema = yup.object({
  cpf: yup.string().required("CPF é obrigatório"),
  name: yup.string().required("Nome é obrigatório"),
  phoneNumber: yup.string().required("Telefone é obrigatório"),
  company: yup.string().required("Empresa é obrigatório"),
  departament: yup.string().required("Departamento é obrigatório"),
  reason: yup.string().required("Motivo é obrigatório"),
});

type ReimbusementProps = {
  cpf: string;
  name: string;
  phoneNumber: string;
  company: string;
  departament: string;
  reason: string;
  origin?: string;
  destination?: string;
};

export function ReimbusementDetails() {
  const route = useRoute();
  const { EntityId } = route.params as { EntityId: number };
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const [selectedType, setSelectedType] = useState<string>("");
  const [companies, setCompanies] = useState<companiesDTO[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<string>("");
  const [departaments, setDepartaments] = useState<departamentDTO[]>([]);
  const [sendReimbusement, setSendReimbusement] = useState(true);

  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<ReimbusementProps>({ resolver: yupResolver(ReimbusementSchema) });

  async function getReimbusementDetails() {
    try {
      const settings = {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          EntityId: EntityId,
        },
      };

      const {
        data: { Entity },
      } = await api("/services/Default/Reembolso/Retrieve", settings);

      if (Entity.ReembolsoItemList.length > 0) {
        setSendReimbusement(false);
      }

      await getSelectedCompany();

      setValue("cpf", Entity.Cpf);
      setValue("name", Entity.Nome);
      setValue("phoneNumber", Entity.Telefone);
      setValue("company", Entity.EmpresaId);

      await getSelectedSection(Entity.EmpresaId);

      setValue("departament", Entity.CentroCustoId);

      setValue("reason", Entity.Motivo);
      setSelectedType(Entity.Tipo === "Viagem" ? "Viagem" : "Simples");

      if (Entity.Tipo === 0) {
        setSelectedType("Simples");
      } else if (Entity.Tipo === 1) {
        setSelectedType("Viagem");

        setTimeout(() => {
          setValue("origin", Entity.Origem);
          setValue("destination", Entity.Destino);
        }, 0);
      }
    } catch (err) {
      //@ts-ignore
      console.log(err.response);
    }
  }

  async function handleApprove() {
    try {
      const settings = {
        method: "post",
        headers: {
          "Content-Type": "application/json; chatset=utf-8",
        },
        data: {
          EntityId: EntityId,
        },
      };

      await api("/Services/Default/Reembolso/EnviarAprovacao", settings);
      navigation.navigate("home");
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDelete() {
    try {
      const settings = {
        method: "post",
        headers: {
          "Content-Type": "application/json; chatset=utf-8",
        },
        data: {
          EntityId: EntityId,
        },
      };

      await api("/Services/Default/Reembolso/Delete", settings);
      navigation.navigate("home");
    } catch (error) {
      console.log(error);
    }
  }

  async function getSelectedCompany() {
    try {
      const settings = {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
      };

      const {
        data: { Entities },
      } = await api("/Services/Default/Empresa/List", settings);
      setCompanies(Entities);
      await getSelectedSection(Entities);
    } catch (err) {
      console.log("Erro ao buscar as empresas.");
    }
  }

  async function getSelectedSection(EmpresaId: number) {
    try {
      const settings = {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          EqualityFilter: {
            EmpresaId: EmpresaId,
          },
        },
      };

      const {
        data: { Entities },
      } = await api("/Services/Default/CentroCusto/List", settings);
      setDepartaments(Entities);
    } catch (err) {
      //console.log("Erro ao buscar as departamentos.");
    }
  }

  function openAlert() {
    Alert.alert(
      "Cancelar solicitação",
      "Cancelar a solicitação significa retira-la completamente da lista de aprovação junto a suas despesas\nDeseja continuar?",
      [
        {
          text: "Não",
          style: "cancel",
        },
        { text: "Sim", onPress: () => handleDelete() },
      ]
    );
  }

  useEffect(() => {
    getReimbusementDetails();
  }, []);

  return (
    <KeyboardAvoidingView flex={1} px={"$12"} py={"$4"} bg={"$gray500"}>
      <ScrollView mt={"$12"} flex={1} showsVerticalScrollIndicator={false}>
        <Header
          title={"Detalhes do Reembolso"}
          details={true}
          detailsId={EntityId}
          navigate={() => navigation.navigate("home")}
        />
        <HStack
          w={"$full"}
          justifyContent={"space-around"}
          my={"$2"}
          borderBottomWidth={"$2"}
          borderBottomColor={"$gray300"}
          pb={"$2"}
        >
          <Pressable
            bg={sendReimbusement ? "$gray400" : "$green600"}
            w={"$33"}
            h={"$14"}
            rounded={"$xl"}
            alignItems={"center"}
            justifyContent={"center"}
            onPress={handleApprove}
            disabled={sendReimbusement}
          >
            <Text
              color={sendReimbusement ? "$gray300" : "$white"}
              textAlign={"center"}
            >
              Enviar para aprovação
            </Text>
          </Pressable>
          <Pressable
            bg={"$red500"}
            px={"$2"}
            w={"$33"}
            h={"$14"}
            rounded={"$xl"}
            alignItems={"center"}
            justifyContent={"center"}
            onPress={openAlert}
          >
            <Text color={"$white"} textAlign={"center"}>
              Cancelar solicitação
            </Text>
          </Pressable>
        </HStack>

        {/* Tipo de Reembolso */}
        <VStack
          borderBottomColor={"$gray300"}
          borderBottomWidth={"$2"}
          pb={"$4"}
        >
          <HStack p={"$4"} mb={"$2"}>
            <Ionicons name={"wallet-outline"} size={24} color={"#7C7C8A"} />
            <Text color={"$gray300"} ml={"$4"} fontSize={"$lg"}>
              Tipo de Reembolso
            </Text>
          </HStack>

          <HStack w={"$full"} justifyContent={"space-around"}>
            <FilterButton
              name={"Simples"}
              isActive={selectedType === "Simples"}
            />
            <FilterButton
              name={"Viagem"}
              isActive={selectedType === "Viagem"}
            />
          </HStack>
        </VStack>

        {/* Dados Pessoais */}
        <VStack
          borderBottomColor={"$gray300"}
          borderBottomWidth={"$2"}
          pb={"$4"}
        >
          <HStack p={"$4"} mb={"$2"}>
            <Ionicons name={"person-outline"} size={24} color={"#7C7C8A"} />
            <Text color={"$gray300"} ml={"$4"} fontSize={"$lg"}>
              Dados Pessoais
            </Text>
          </HStack>
          <VStack
            borderBottomColor={"$gray300"}
            borderBottomWidth={"$2"}
            pb={"$4"}
          >
            <Controller
              control={control}
              name={"cpf"}
              render={({ field: { onChange, value } }) => (
                <>
                  <Text ml={"$2"} mb={"$1"} color={"$gray200"}>
                    CPF:
                  </Text>
                  <Input
                    value={value}
                    editStyle={"cpf"}
                    placeholder="CPF"
                    keyboardType="numeric"
                    onChangeText={onChange}
                    editable={false}
                    errorMessage={errors.cpf?.message}
                  />
                </>
              )}
            />

            <Controller
              control={control}
              name={"name"}
              render={({ field: { onChange, value } }) => (
                <>
                  <Text ml={"$2"} mb={"$1"} color={"$gray200"}>
                    Nome completo:
                  </Text>
                  <Input
                    placeholder="Nome Completo"
                    keyboardType="default"
                    value={value}
                    editable={false}
                    onChangeText={onChange}
                    errorMessage={errors.name?.message}
                  />
                </>
              )}
            />

            <Controller
              control={control}
              name={"phoneNumber"}
              render={({ field: { onChange, value } }) => (
                <>
                  <Text ml={"$2"} mb={"$1"} color={"$gray200"}>
                    Telefone:
                  </Text>
                  <Input
                    placeholder="Telefone"
                    keyboardType="numeric"
                    editable={false}
                    value={value}
                    onChangeText={onChange}
                    errorMessage={errors.phoneNumber?.message}
                  />
                </>
              )}
            />

            <Controller
              control={control}
              name={"company"}
              render={({ field: { onChange, value } }) => (
                <>
                  <Text ml={"$2"} mb={"$1"} color={"$gray200"}>
                    Empresa:
                  </Text>
                  <Picker
                    selectedValue={value}
                    onValueChange={(itemValue) => {
                      onChange(itemValue);
                      setSelectedCompany(itemValue);
                    }}
                    style={{
                      color: "white",
                      backgroundColor: "#121214",
                      marginBottom: 20,
                    }}
                  >
                    <Picker.Item label="Selecione uma empresa" value="" />
                    {Array.isArray(companies) && companies.length > 0 ? (
                      companies.map((company) => (
                        <Picker.Item
                          key={company.Id}
                          label={company.Nome}
                          value={company.Id}
                        />
                      ))
                    ) : (
                      <Picker.Item
                        label="Nenhuma empresa disponível"
                        value=""
                      />
                    )}
                  </Picker>
                  {errors.company && (
                    <Text color={"$red500"} ml={"$2"}>
                      {errors.company?.message}
                    </Text>
                  )}
                </>
              )}
            />

            <Controller
              control={control}
              name={"departament"}
              render={({ field: { onChange, value } }) => (
                <>
                  <Text ml={"$2"} mb={"$1"} color={"$gray200"}>
                    Departamento:
                  </Text>
                  <Picker
                    selectedValue={value}
                    onValueChange={onChange}
                    style={{
                      color: "white",
                      backgroundColor: "#121214",
                    }}
                  >
                    <Picker.Item label="Selecione um departamento" value="" />
                    {Array.isArray(departaments) && departaments.length > 0 ? (
                      departaments.map((departament) => (
                        <Picker.Item
                          key={departament.CentroCustoId}
                          label={
                            departament.Nome.split("- ").length > 1
                              ? departament.Nome.split("- ")[1]
                              : departament.Nome.split("- ")[0]
                          }
                          value={departament.CentroCustoId}
                        />
                      ))
                    ) : (
                      <Picker.Item
                        label="Nenhum departamento disponível"
                        value=""
                      />
                    )}
                  </Picker>
                  {errors.departament && (
                    <Text color={"$red500"} ml={"$2"}>
                      {errors.departament?.message}
                    </Text>
                  )}
                </>
              )}
            />
          </VStack>
          {selectedType === "Viagem" && (
            <VStack pb={"$4"}>
              <HStack p={"$4"} mb={"$2"}>
                <Ionicons
                  name={"airplane-outline"}
                  size={24}
                  color={"#7C7C8A"}
                />
                <Text color={"$gray300"} ml={"$4"} fontSize={"$lg"}>
                  Viagem
                </Text>
              </HStack>
              <VStack>
                <Controller
                  control={control}
                  name={"origin"}
                  render={({ field: { onChange, value } }) => (
                    <>
                      <Text ml={"$2"} mb={"$1"} color={"$gray200"}>
                        Origem
                      </Text>
                      <Input
                        placeholder="Origem"
                        keyboardType="default"
                        editable={false}
                        value={value}
                        onChangeText={onChange}
                      />
                    </>
                  )}
                />
                <Controller
                  control={control}
                  name={"destination"}
                  render={({ field: { onChange, value } }) => (
                    <>
                      <Text ml={"$2"} mb={"$1"} color={"$gray200"}>
                        Destino
                      </Text>
                      <Input
                        placeholder="Destino"
                        keyboardType="default"
                        editable={false}
                        value={value}
                        onChangeText={onChange}
                      />
                    </>
                  )}
                />
              </VStack>
            </VStack>
          )}
        </VStack>
      </ScrollView>

      <Button
        title="Ver despesas"
        onPress={() =>
          navigation.navigate("addReimbusementItem", { EntityId: EntityId })
        }
      />
    </KeyboardAvoidingView>
  );
}
