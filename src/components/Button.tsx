import { ComponentProps } from "react";

import { Button as GluestackButton, Text } from "@gluestack-ui/themed";
import { Loading } from "@components/Loading";

type Props = ComponentProps<typeof GluestackButton> & {
  title: String;
  isLoading?: boolean;
};

export function Button({ title, isLoading = false, ...rest }: Props) {
  return (
    <GluestackButton
      w={"$full"}
      h={"$14"}
      bg={"$green700"}
      borderWidth={"$0"}
      borderColor={"$green500"}
      rounded={"$sm"}
      $active-bg={"$green400"}
      disabled={isLoading}
      {...rest}
    >
      {isLoading ? (
        <Loading />
      ) : (
        <Text color={"$white"} fontFamily={"$heading"} font-site={"sm"}>
          {title}
        </Text>
      )}
    </GluestackButton>
  );
}
