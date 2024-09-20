import { ComponentProps, useState } from "react";
import {
  Input as GluestackInput,
  InputField,
  Text,
} from "@gluestack-ui/themed";

type Props = ComponentProps<typeof InputField> & {
  errorMessage?: string;
  editStyle?: "default" | "cpf";
};

const formatCPF = (value: string) => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1");
};

export function Input({ errorMessage, editStyle = "default", ...rest }: Props) {
  const [value, setValue] = useState("");

  const handleChange = (text: string) => {
    if (editStyle === "cpf") {
      setValue(formatCPF(text));
    } else {
      setValue(text);
    }
  };

  return (
    <GluestackInput
      h={"$14"}
      bg={"$gray700"}
      px={"$4"}
      borderWidth={"$0"}
      borderRadius={"$md"}
      mb={"$4"}
      $focus={{
        borderWidth: "$1",
        borderColor: "$green500",
      }}
    >
      <InputField
        color={"$gray100"}
        value={value}
        onChangeText={handleChange}
        {...rest}
      />

      {errorMessage && (
        <Text color={"$red500"} fontSize={"$sm"} mb={"$4"}>
          {errorMessage}
        </Text>
      )}
    </GluestackInput>
  );
}
