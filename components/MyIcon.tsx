import React from "react";
import { View } from "react-native";
import { Icon } from "react-native-elements";

interface MyIconProps {
  name?: string;
  onPress?: () => void;
  selected: boolean;
}

const selectedColor = "#d3766f";
const disSelectedColor = "rgba(255,255,255,0.6)";

export const MyIcon: React.FunctionComponent<MyIconProps> = ({
  name = "event",
  onPress,
  selected = false,
}) => {
  return (
    <View
      style={{
        marginHorizontal: 3,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          backgroundColor: selected ? selectedColor : disSelectedColor,
          height: 3,
          width: "60%",
        }}
      ></View>
      <Icon
        name={name}
        type="material"
        color={selected ? selectedColor : disSelectedColor}
        containerStyle={{ padding: 10 }}
        size={30}
        onPress={onPress}
      />
    </View>
  );
};
