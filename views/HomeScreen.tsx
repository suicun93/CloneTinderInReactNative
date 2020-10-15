import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  Animated,
  PanResponder,
  StyleSheet,
} from "react-native";
import GestureRecognizer from "react-native-swipe-gestures";

// Components
import { MyList } from "../components/MyList";
import FloatingHearts from "../components/FloatingHeart";
const avatar =  require("../images/avatar.png");

// Controller
import { useHomeScreenController } from "../presenters/HomeController";

// Xoay, Rotate
const detectPoint = 150;
var position = new Animated.ValueXY();
let [translateX, translateY] = [position.x, position.y];
const rotate = translateX.interpolate({
  inputRange: [0, detectPoint / 2, detectPoint],
  outputRange: ["0deg", "10deg", "18deg"],
});
var backgroundColorLike = translateX.interpolate({
  inputRange: [0, detectPoint / 2, detectPoint * 2],
  outputRange: [
    "rgba(1, 1, 1, 0.0)",
    "rgba(255, 255, 255, 0.5)",
    "rgba(255, 255, 255, 0.5)",
  ],
});
var backgroundColorUnlike = translateX.interpolate({
  inputRange: [-detectPoint * 2, -detectPoint / 2, 0],
  outputRange: [
    "rgba(255, 255, 255, 0.5)",
    "rgba(255, 255, 255, 0.5)",
    "rgba(1, 1, 1, 0.0)",
  ],
});
var textLike = translateX.interpolate({
  inputRange: [0, detectPoint / 2, detectPoint * 2],
  outputRange: [
    "rgba(1, 1, 1, 0)",
    "rgba(94, 224, 152, 0.8)",
    "rgba(94, 224, 152, 1)",
  ],
});
var textUnLike = translateX.interpolate({
  inputRange: [-detectPoint * 2, -detectPoint / 2, 0],
  outputRange: [
    "rgba(250, 111, 105, 1)",
    "rgba(250, 111, 105, 0.8)",
    "rgba(1, 1, 1, 0)",
  ],
});

export const HomeScreen: React.FunctionComponent = () => {
  const avatarImageUri = Image.resolveAssetSource(avatar).uri;
  const [countHeart, setCountHeart] = useState(0);
  const {
    user,
    selectedItem,
    swipe,
    setSelectedItem,
    listData,
  } = useHomeScreenController();

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (evt, gestureState) => true,
    onPanResponderMove: (evt, gestureState) => {
      position.setValue({ x: gestureState.dx, y: gestureState.dy });
    },
    onPanResponderRelease: (evt, gestureState) => {
      position.setValue({ x: 0, y: 0 });

      if (Math.abs(gestureState.dx) < detectPoint) {
        setCountHeart(countHeart + 1);
      } else {
        swipe(gestureState.dx < 0 ? "left" : "right");
      }
    },
  });

  React.useEffect(() => {
    swipe("left");
  }, []);
  return (
    <View style={{ flex: 1, backgroundColor: "#9ad9ea" }}>
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          {
            transform: [
              { translateX: position.x },
              { translateY: position.y },
              { rotate },
            ],
          },
        ]}
      >
        <Image
          source={{
            uri:
              user === undefined
                ? avatarImageUri
                : user.results[0].user.picture,
          }}
          style={{
            borderRadius: 10,
            borderColor: "#23b5be",
            borderWidth: 3,
            margin: 20,
            aspectRatio: 1,
            width: "90%",
          }}
          resizeMode="cover"
        />
        <Animated.View
          style={{
            ...StyleSheet.absoluteFillObject,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Animated.View
            style={{
              backgroundColor: backgroundColorLike,
              borderRadius: 10,
              borderColor: textLike,
              borderWidth: 7,
              paddingHorizontal: 15,
              marginTop: 100,
              transform: [{ rotate: "15deg" }],
            }}
          >
            <Animated.Text
              style={{ color: textLike, fontSize: 80, fontWeight: "bold" }}
            >
              Like
            </Animated.Text>
          </Animated.View>
        </Animated.View>
        <Animated.View
          style={{
            ...StyleSheet.absoluteFillObject,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Animated.View
            style={{
              backgroundColor: backgroundColorUnlike,
              borderRadius: 10,
              borderColor: textUnLike,
              borderWidth: 7,
              paddingHorizontal: 10,
              marginTop: 100,
              transform: [{ rotate: "-15deg" }],
            }}
          >
            <Animated.Text
              style={{ color: textUnLike, fontSize: 80, fontWeight: "bold" }}
            >
              Unlike
            </Animated.Text>
          </Animated.View>
        </Animated.View>
        <FloatingHearts count={countHeart} />
      </Animated.View>

      <View style={{ alignItems: "center", marginTop: 35 }}>
        <Text style={{ fontSize: 18, color: "#da5a5d" }}>
          {listData[selectedItem].title}
        </Text>
        <Text
          style={{
            fontSize: 35,
            marginVertical: 10,
            fontWeight: "700",
            color: "#da5a5d",
          }}
        >
          {listData[selectedItem].data}
        </Text>
      </View>

      <View
        style={{
          marginTop: 50,
          height: 50,
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <MyList
          selectedItem={selectedItem}
          onClick={(select: number) => {
            setSelectedItem(select);
          }}
        />
      </View>
    </View>
  );
};
