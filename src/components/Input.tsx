import { ComponentProps } from "react";
import { Input as GluestackInput, InputField } from "@gluestack-ui/themed";

type Props = ComponentProps<typeof InputField>;

export function Input({ ...rest }: Props) {
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
    </GluestackInput>
  );
}
