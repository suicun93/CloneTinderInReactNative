import React, { useState } from 'react';
import {
  Text,
  View,
  Image,
  Animated, // add this
  Easing, // add this
  Dimensions,
  PanResponder,
} from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';

// Models
import { UserModel } from '../models/UserModel';
import { MyData, collectDataFromUser } from '../models/MyData';

// Components
import { MyList } from '../components/MyList';
import FloatingHearts from '../components/FloatingHeart';
import { storeData } from '../common/Storage';
import { callApi } from '../common/Network';
import avatar from '../images/avatar.png';
// Xoay, Rotate
var position = new Animated.ValueXY();
let [translateX, translateY] = [position.x, position.y];
const rotate = translateX.interpolate({
  inputRange: [0, 100, 200],
  outputRange: ['0deg', '7deg', '15deg'],
});

export const HomeScreen: React.FunctionComponent = () => {
  const [user, setUser] = useState();
  const [selectedItem, setSelectedItem] = useState(0);
  const [countHeart, setCountHeart] = useState(0);
  const avatarImageUri = Image.resolveAssetSource(avatar).uri;

  const listData = collectDataFromUser(user);

  const getNewUser = (direction: 'left' | 'right') => {
    if (direction === 'right') {
      storeData(user);
    }
    setUser(undefined);
    setSelectedItem(0);
    callApi((newUser: UserModel) => {
      setUser(newUser);
    });
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (evt, gestureState) => true,
    onPanResponderMove: (evt, gestureState) => {
      position.setValue({ x: gestureState.dx, y: gestureState.dy });
    },
    onPanResponderRelease: (evt, gestureState) => {
      position.setValue({ x: 0, y: 0 });
      if (Math.abs(gestureState.dx) < 100) {
        setCountHeart(countHeart + 1);
      } else {
        getNewUser(gestureState.dx < 0 ? 'left' : 'right');
      }
    },
  });
  return (
    <View style={{ flex: 1, backgroundColor: '#9ad9ea' }}>
      <Animated.View
        {...panResponder.panHandlers}
        style={{
          transform: [
            { translateX: position.x },
            { translateY: position.y },
            { rotate },
          ],
        }}>
        <Image
          style={{
            margin: 20,
            aspectRatio: 1,
            width: '90%',
            alignSelf: 'center',
            borderRadius: 10,
            borderColor: '#23b5be',
            borderWidth: 3,
          }}
          resizeMode="stretch"
          source={{
            uri:
              user === undefined
                ? avatarImageUri
                : user.results[0].user.picture,
          }}
        />
        <FloatingHearts count={countHeart} />
      </Animated.View>

      <View style={{ alignItems: 'center', marginTop: 35 }}>
        <Text style={{ fontSize: 18, color: '#da5a5d' }}>
          {listData[selectedItem].title}
        </Text>
        <Text
          style={{
            fontSize: 35,
            marginVertical: 10,
            fontWeight: '700',
            color: '#da5a5d',
          }}>
          {listData[selectedItem].data}
        </Text>
      </View>

      <View
        style={{
          marginTop: 50,
          height: 50,
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
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
