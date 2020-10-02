import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Image,
} from 'react-native';
import { Icon } from 'react-native-elements';
import GestureRecognizer from 'react-native-swipe-gestures';

// Models
import UserModelClass from './models/UserClass';
import { MyData } from './models/MyData';

// Components
import { MyList } from './components/MyList';
import FloatingHearts from './components/FloatingHeart';
import { storeData } from './common/Storage';
import { callApi } from './common/Network';
import avatar from './assets/avatar.png';
import { appName } from './constants';

// Main App
const App = () => {
  const [user, setUser] = useState();
  const [selectedItem, setSelectedItem] = useState(0);
  const [countHeart, setCountHeart] = useState(0);
  const avatarImageUri = Image.resolveAssetSource(avatar).uri;

  const listData: MyData[] = [
    {
      title: 'My name is',
      data: !user
        ? 'Unknown'
        : user.results[0].user.name.first.toUpperCase() +
          ' ' +
          user.results[0].user.name.last.toUpperCase(),
    },
    {
      title: 'My email is',
      data: !user ? 'Unknown' : user.results[0].user.email,
    },
    {
      title: 'My address is',
      data: !user
        ? 'Unknown'
        : user.results[0].user.location.street +
          ', ' +
          user.results[0].user.location.city +
          ', ' +
          user.results[0].user.location.state,
    },
    {
      title: 'My phone is',
      data: !user ? 'Unknown' : user.results[0].user.phone,
    },
    {
      title: 'My cell is',
      data: !user ? 'Unknown' : user.results[0].user.cell,
    },
  ]; 

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flexDirection: 'row', backgroundColor: 'white' }}>
          <Icon
            name="home"
            color="#bfbfbf"
            containerStyle={{ padding: 10 }}
            size={40}
          />
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text
              style={{
                textAlign: 'center',
                color: '#da5a5d',
                fontSize: 35,
                fontWeight: 'bold',
                fontFamily: 'tahoma',
              }}>
              {appName}
            </Text>
          </View>
          <Icon
            name="settings"
            color="#bfbfbf"
            containerStyle={{ padding: 10 }}
            size={40}
          />
        </View>

        <View style={{ flex: 1, backgroundColor: '#eaeafa' }}>
          <GestureRecognizer
            onSwipeLeft={() => {
              storeData(user);
              setUser(undefined);
              setSelectedItem(0);
              callApi((newUser:UserModelClass) => {
                setUser(newUser);
              });
            }}
            onSwipeRight={() => {
              setUser(undefined);
              setSelectedItem(0);
              callApi((newUser:UserModelClass) => {
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
            <Text style={{ fontSize: 15 }}>{listData[selectedItem].title}</Text>
            <Text
              style={{ fontSize: 30, marginVertical: 10, fontWeight: '600' }}>
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
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({});

export default App;