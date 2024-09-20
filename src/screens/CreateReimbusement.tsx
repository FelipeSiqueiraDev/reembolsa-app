import { useEffect, useState, useCallback } from "react";
import {
  Text,
  HStack,
  VStack,
  ScrollView,
  KeyboardAvoidingView,
} from "@gluestack-ui/themed";
import debounce from "lodash/debounce";

import { Ionicons } from "@expo/vector-icons";

import * as yup from "yup";
import { Picker } from "@react-native-picker/picker";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";

import { useNavigation, useRoute } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

import { Input } from "@components/Input";
import { Header } from "@components/Header";
import { Button } from "@components/Button";
import { FilterButton } from "@components/FilterButton";

import { api } from "@services/api";

import { departamentDTO } from "@dtos/departamentDTO";
import { companiesDTO } from "@dtos/companiesDTO";

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

export function CreateReimbusement() {
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const [selectedType, setSelectedType] = useState<string>("");
  const [companies, setCompanies] = useState<companiesDTO[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<string>("");
  const [departaments, setDepartaments] = useState<departamentDTO[]>([]);

  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<ReimbusementProps>({ resolver: yupResolver(ReimbusementSchema) });

  const debouncedGetUserInfo = useCallback(
    debounce((cpf: string) => {
      if (cpf.length === 14) {
        getUserInfo(cpf);
      }
    }, 500),
    []
  );

  async function getUserInfo(cpf: string) {
    try {
      const settings = {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          Cpf: cpf,
        },
      };

      const {
        data: { Entity },
      } = await api("/Services/Default/Reembolso/VerificarPessoa", settings);

      console.log(Entity);

      setValue("name", Entity.Nome);
      setValue("phoneNumber", Entity.Telefone);
    } catch (err) {
      //@ts-ignore
      console.log(err.response);
    }
  }

  async function getCompanies() {
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
    } catch (err) {
      console.log("Erro ao buscar as empresas.");
    }
  }

  async function getSections(companyId: string) {
    try {
      const settings = {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          EqualityFilter: {
            EmpresaId: Number(companyId),
          },
        },
      };
      const {
        data: { Entities },
      } = await api("/Services/Default/CentroCusto/List", settings);
      setDepartaments(Entities);
    } catch (err) {
      console.log("Erro ao buscar as departaments.");
    }
  }

  async function sendReimbusementRequest(data: ReimbusementProps) {
    const reimbusementData = {
      Nome: data.name,
      Cpf: data.cpf,
      Telefone: data.phoneNumber,
      Motivo: data.reason,
      EmpresaId: data.company,
      CentroCustoId: data.departament,
      Tipo: selectedType,
      Origem: selectedType === "Viagem" && data.origin,
      Destino: selectedType === "Viagem" && data.destination,
    };

    try {
      const settings = {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          Entity: reimbusementData,
        },
      };

      const { data } = await api(
        "/Services/Default/Reembolso/Create",
        settings
      );

      navigation.navigate("addReimbusementItem", data);
    } catch (err) {
      //@ts-ignore
      console.log(err.response);
    }
  }

  useEffect(() => {
    getCompanies();
    if (selectedCompany) {
      getSections(selectedCompany);
    }
  }, [selectedCompany]);

  return (
    <KeyboardAvoidingView flex={1} px={"$12"} py={"$4"} bg={"$gray500"}>
      <ScrollView flex={1} showsVerticalScrollIndicator={false}>
        <Header title={"Criar novo Reembolso"} />

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
              onPress={() => setSelectedType("Simples")}
            />
            <FilterButton
              name={"Viagem"}
              isActive={selectedType === "Viagem"}
              onPress={() => setSelectedType("Viagem")}
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
          <VStack>
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
                    onChangeText={(itemValue) => {
                      onChange(itemValue);
                      debouncedGetUserInfo(itemValue);
                    }}
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
        </VStack>

        {/* Detalhes */}
        <VStack
          borderBottomColor={"$gray300"}
          borderBottomWidth={"$2"}
          pb={"$4"}
        >
          <HStack p={"$4"} mb={"$2"}>
            <Ionicons name={"newspaper-outline"} size={24} color={"#7C7C8A"} />
            <Text color={"$gray300"} ml={"$4"} fontSize={"$lg"}>
              Detalhes
            </Text>
          </HStack>
          <VStack>
            <Controller
              control={control}
              name={"reason"}
              render={({ field: { onChange, value } }) => (
                <>
                  <Text ml={"$2"} mb={"$1"} color={"$gray200"}>
                    Motivo
                  </Text>
                  <Input
                    placeholder="Motivo"
                    keyboardType="default"
                    value={value}
                    onChangeText={onChange}
                    errorMessage={errors.reason?.message}
                  />
                </>
              )}
            />
          </VStack>
        </VStack>

        {/* VIAGEM */}
        {selectedType === "Viagem" && (
          <VStack pb={"$4"}>
            <HStack p={"$4"} mb={"$2"}>
              <Ionicons name={"airplane-outline"} size={24} color={"#7C7C8A"} />
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
                      value={value}
                      onChangeText={onChange}
                    />
                  </>
                )}
              />
            </VStack>
          </VStack>
        )}

        <Button
          title={"Enviar"}
          onPress={handleSubmit(sendReimbusementRequest)}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
