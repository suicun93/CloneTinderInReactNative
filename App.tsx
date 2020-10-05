import React, { useState } from 'react';
import {
  StatusBar,
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Image,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { HomeScreen } from './views/HomeScreen';
import { ListUser } from './views/ListUser';

// Components
import { appName } from './constants';

// Main App
const App = () => {
  const [view, setView] = useState('homeScreen');
  const [loaded, setLoaded] = useState(false);
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{ flex: 1, backgroundColor: '#efe3af' }}>
        <View style={{ flexDirection: 'row', backgroundColor: '#efe3af' }}>
          <Icon
            name="home"
            color={view === 'homeScreen' ? '#d3766f' : 'rgba(255,255,255,0.7)'}
            containerStyle={{ padding: 10 }}
            size={40}
            onPress={() => {
              setLoaded(true);
              setView('homeScreen');
            }}
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
            name="book"
            color={view === 'listUser' ? '#d3766f' : 'rgba(255,255,255,0.7)'}
            containerStyle={{ padding: 10 }}
            size={40}
            onPress={() => {
              setLoaded(false);
              setView('listUser');
            }}
          />
        </View>
        {view === 'homeScreen' ? (
          <HomeScreen />
        ) : (
          <ListUser
            loaded={loaded}
            setLoaded={(load: boolean) => {
              setLoaded(load);
            }}
          />
        )}
      </SafeAreaView>
    </>
  );
};

export default App;
