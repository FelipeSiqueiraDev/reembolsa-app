import { Text, Pressable } from "@gluestack-ui/themed";

type Props = {
  name: string;
  isActive?: boolean;
  onPress?: () => void;
};

export function FilterButton({
  name,
  isActive = false,
  onPress = () => {},
  ...rest
}: Props) {
  return (
    <Pressable
      p={"$1"}
      h={"$12"}
      w={"$32"}
      borderWidth={1}
      bg={isActive ? "$green500" : "$gray300"} // Marcação visual do filtro ativo
      rounded={"$xs"}
      overflow={"hidden"}
      alignItems={"center"}
      borderColor={isActive ? "$green500" : "$gray300"}
      justifyContent={"center"}
      $pressed={{
        borderColor: "$green600",
        borderWidth: 1,
      }}
      onPress={onPress}
    >
      <Text
        color={isActive ? "$white" : "$green300"}
        textAlign={"center"}
        textTransform={"uppercase"}
        fontSize={"$xs"}
        fontWeight={"bold"}
      >
        {name}
      </Text>
    </Pressable>
  );
}
