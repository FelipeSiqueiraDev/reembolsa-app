import { useState } from "react";
import {
  Text,
  HStack,
  VStack,
  Select,
  ScrollView,
  KeyboardAvoidingView,
} from "@gluestack-ui/themed";

import { Ionicons } from "@expo/vector-icons";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";

import { Input } from "@components/Input";
import { Header } from "@components/Header";
import { Button } from "@components/Button";
import { FilterButton } from "@components/FilterButton";

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
};

export function CreateReimbusement() {
  const [selectedType, setSelectedType] = useState<string>("");
  const [companies, setCompanies] = useState<
    Array<{ id: string; name: string }>
  >([]);
  const [departaments, setDepartaments] = useState<
    Array<{ id: string; name: string }>
  >([]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ReimbusementProps>({ resolver: yupResolver(ReimbusementSchema) });

  function sendReimbusementRequest(data: ReimbusementProps) {
    console.log("Oi");
    console.log(data);
  }

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
                    placeholder="CPF"
                    keyboardType="numeric"
                    value={value}
                    onChangeText={onChange}
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
                    keyboardType="default"
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
                  <Select
                    selectedValue={value}
                    onValueChange={onChange}
                    placeholder="Selecione uma empresa"
                  >
                    {companies.map((company) => (
                      <Select.Item
                        key={company.id}
                        label={company.name}
                        value={company.id}
                      />
                    ))}
                  </Select>
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
                  <Select
                    selectedValue={value}
                    onValueChange={onChange}
                    placeholder="Selecione um departamento"
                  >
                    {departaments.map((departament) => (
                      <Select.Item
                        key={departament.id}
                        label={departament.name}
                        value={departament.id}
                      />
                    ))}
                  </Select>
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
        <VStack pb={"$4"}>
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
                    keyboardType="numeric"
                    value={value}
                    onChangeText={onChange}
                    errorMessage={errors.reason?.message}
                  />
                </>
              )}
            />
          </VStack>
        </VStack>

        <Button
          title={"Enviar"}
          onPress={handleSubmit(sendReimbusementRequest)}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
