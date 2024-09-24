import React, { useState } from "react";
import { Modal, Image, ImageProps, View, Dimensions } from "react-native";
import { Pressable } from "@gluestack-ui/themed";
import { Ionicons } from "@expo/vector-icons";

type Props = ImageProps & {
  onPress(): void;
};

export function Picture({ onPress, ...rest }: Props) {
  const [isModalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <>
      <Pressable h={"$48"} onPress={openModal}>
        <Ionicons
          name="close-circle"
          size={34}
          color={"#b91c1c"}
          style={{
            position: "absolute",
            top: 2,
            right: 2,
            zIndex: 1,
          }}
          onPress={onPress}
        />
        <Image
          style={{
            height: "100%",
            width: "100%",
            resizeMode: "cover",
            borderRadius: 4,
          }}
          {...rest}
        />
      </Pressable>

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeModal}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.9)",
          }}
        >
          <Ionicons
            name="close"
            size={34}
            color={"#fff"}
            style={{
              position: "absolute",
              top: 40,
              right: 20,
              zIndex: 1,
            }}
            onPress={closeModal}
          />

          <Image
            style={{
              width: Dimensions.get("window").width * 0.9,
              height: Dimensions.get("window").height * 0.7,
              resizeMode: "contain",
              borderRadius: 10,
            }}
            {...rest}
          />
        </View>
      </Modal>
    </>
  );
}
