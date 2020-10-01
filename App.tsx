import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Image,
  AsyncStorage,
} from 'react-native';
import avatar from './assets/avatar.png';
import { Icon } from 'react-native-elements';
import GestureRecognizer from 'react-native-swipe-gestures';
import UserModelClass from './models/UserClass';
import { User } from './models/UserModel';
import { MyData } from './models/MyData';
import { defaultUri, appName } from './components/constants';
import { MyList } from './components/MyList';
import FloatingHearts from './components/FloatingHeart';

// Main App
const App = () => {
  const [user, setUser] = useState();
  const [selectedItem, setSelectedItem] = useState(0);
  const [count, setCount] = useState(0);

  const keyDB = 'com.duc.tinder';
  const avatarImageUri = Image.resolveAssetSource(avatar).uri;
  const config = {
    velocityThreshold: 0.2,
    directionalOffsetThreshold: 50,
  };

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

  const _callApi = async () => {
    console.log('right');
    setUser(undefined);
    setSelectedItem(0);
    postData('https://randomuser.me/api/0.4/?randomapi')
      .then((user) => {
        const userModel = new UserModelClass();
        Object.assign(userModel, user);
        setUser(userModel);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const _storeData = async () => {
    console.log('left');
    if (!user) {
      return;
    }
    try {
      let dbTemp = await AsyncStorage.getItem(keyDB);
      let oldArray: User[];
      if (dbTemp) {
        oldArray = JSON.parse(dbTemp);
        oldArray = oldArray.concat(user);
      } else {
        oldArray = new Array<User>();
        oldArray = oldArray.concat(user);
      }
      await AsyncStorage.setItem(keyDB, JSON.stringify(oldArray));
      console.log(oldArray.length, 'oldArray');
    } catch (error) {
      // Error saving data
      console.log(error);
    }
  };

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
            onSwipeLeft={() => _storeData()}
            onSwipeRight={() => _callApi()}
            onTouchStart={() => {
              setCount(count + 1);
            }}>
            <Image
              style={{
                margin: 20,
                aspectRatio: 1,
                width: '90%',
                alignSelf: 'center',
                borderRadius: 10,
              }}
              resizeMode="contain"
              source={{
                uri:
                  user === undefined
                    ? avatarImageUri
                    : user.results[0].user.picture,
              }}
            />
            <FloatingHearts count={count} color='pink' />
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

  // Example POST method implementation:
  async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      // body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }
};

const styles = StyleSheet.create({});

export default App;
