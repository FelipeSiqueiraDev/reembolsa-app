import { ComponentProps } from "react";
import {
  Input as GluestackInput,
  InputField,
  Text,
} from "@gluestack-ui/themed";

type Props = ComponentProps<typeof InputField> & {
  errorMessage?: string;
};

export function Input({ errorMessage, ...rest }: Props) {
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
      <InputField color={"$gray100"} {...rest} />

      {errorMessage && (
        <Text color={"$red500"} fontSize={"$sm"} mb={"$4"}>
          {errorMessage}
        </Text>
      )}
    </GluestackInput>
  );
}
