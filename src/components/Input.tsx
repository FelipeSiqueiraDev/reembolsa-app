import { ComponentProps, useEffect, useState } from "react";
import {
  Input as GluestackInput,
  Icon,
  InputField,
  Text,
} from "@gluestack-ui/themed";

import { Ionicons } from "@expo/vector-icons";

type Props = ComponentProps<typeof InputField> & {
  errorMessage?: string;
  editStyle?: "default" | "cpf" | "password" | "date";
};

const formatCPF = (value: string) => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1");
};

const formatDate = (value: string) => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "$1/$2")
    .replace(/(\d{2})(\d)/, "$1/$2")
    .replace(/(\d{4})\d+?$/, "$1");
};

export function Input({
  errorMessage,
  editStyle = "default",
  onChangeText,
  ...rest
}: Props) {
  const [value, setValue] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(
    editStyle === "password"
  );

  const handleChange = (text: string) => {
    if (editStyle === "cpf") {
      const formatted = formatCPF(text);
      onChangeText && onChangeText(formatted);
    } else if (editStyle === "date") {
      const formatted = formatDate(text);
      onChangeText && onChangeText(formatted);
    } else {
      onChangeText && onChangeText(text);
    }
  };

  return (
    <GluestackInput
      h={"$14"}
      bg={"$gray700"}
      px={"$4"}
      borderWidth={"$0"}
      borderRadius={"$md"}
      alignItems={"center"}
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
        secureTextEntry={editStyle === "password" && passwordVisibility}
        {...rest}
      />

      {editStyle === "password" && (
        <Ionicons
          name={passwordVisibility ? "eye-off-outline" : "eye-outline"}
          size={24}
          color={"#7C7C8A"}
          onPress={() => setPasswordVisibility(!passwordVisibility)}
        />
      )}

      {errorMessage && (
        <Text color={"$red500"} fontSize={"$sm"} mb={"$4"}>
          {errorMessage}
        </Text>
      )}
    </GluestackInput>
  );
}
