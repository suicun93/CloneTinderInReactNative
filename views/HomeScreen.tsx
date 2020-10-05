import React, { useState } from 'react';
import { Text, View, Image } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';

// Models
import UserModelClass from '../models/UserClass';
import { MyData, collectDataFromUser } from '../models/MyData';

// Components
import { MyList } from '../components/MyList';
import FloatingHearts from '../components/FloatingHeart';
import { storeData } from '../common/Storage';
import { callApi } from '../common/Network';
import avatar from '../images/avatar.png';

interface ListUserProps {
  loaded: boolean;
  setLoaded: (loaded: boolean) => void;
}

export const HomeScreen: React.FunctionComponent = () => {
  const [user, setUser] = useState();
  const [selectedItem, setSelectedItem] = useState(0);
  const [countHeart, setCountHeart] = useState(0);
  const avatarImageUri = Image.resolveAssetSource(avatar).uri;

  const listData = collectDataFromUser(user);
  return (
    <View style={{ flex: 1, backgroundColor: '#9ad9ea' }}>
      <GestureRecognizer
        onSwipeLeft={() => {
          storeData(user);
          setUser(undefined);
          setSelectedItem(0);
          callApi((newUser: UserModelClass) => {
            setUser(newUser);
          });
        }}
        onSwipeRight={() => {
          setUser(undefined);
          setSelectedItem(0);
          callApi((newUser: UserModelClass) => {
            setUser(newUser);
          });
        }}
        onTouchEnd={() => {
          setCountHeart(countHeart + 1);
        }}>
        <Image
          style={{
            margin: 20,
            aspectRatio: 1,
            width: '90%',
            alignSelf: 'center',
            borderRadius: 10,
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
      </GestureRecognizer>

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
