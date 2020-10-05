import React, { useState } from 'react';
import { Text, View, Image, FlatList } from 'react-native';

// Models
import { User } from '../models/UserModel';

// Components
import { restoreData } from '../common/Storage';

interface ListUserProps {
  loaded: boolean;
  setLoaded: (loaded: boolean) => void;
}
const UserItem = ({ user }: { user: User }) => (
  console.log(user),
  <View
    style={{
      flexDirection: 'row',
      marginVertical: 5,
      padding: 10,
      backgroundColor: 'rgba(255,255,255,0.5)',
      borderRadius: 10,
    }}>
    <Image
      source={{ uri: user.picture }}
      style={{ width: 90, aspectRatio: 1, borderRadius: 5, marginRight: 10 }}
    />
    <View style={{ paddingRight: 1, flex: 1 }}>
      <Text
        style={{
          fontSize: 22,
          fontWeight: '500',
          marginBottom: 4,
          marginTop: 5,
          color: '#da5a5d',
        }}>
        {user.name.last.toUpperCase() + ' ' + user.name.first.toUpperCase()}
      </Text>

      <Text
        style={{
          fontSize: 14,
          marginBottom: 4,
          color: '#da5a5d',
          width: '100%',
        }}
        numberOfLines={1}>
        {'Email:  ' +
          user.location.street +
          ', ' +
          user.location.city +
          ', ' +
          user.location.state}
      </Text>

      <Text style={{ fontSize: 14, color: '#da5a5d' }}>
        {'Phone: ' + user.phone}
      </Text>
    </View>
  </View>
);
export const ListUser: React.FunctionComponent<ListUserProps> = (
  listUserProps: ListUserProps
) => {
  const [listUser, setListUser] = useState(new Array<User>());

  if (!listUserProps.loaded) {
    restoreData().then((listUserOut: User[]) => {
      // console.log(listUser.length, 'listUser');
      listUserProps.setLoaded(true);
      setListUser(listUserOut);
    });
  }

  return listUser.length !== 0 ? (
    <FlatList
      style={{
        paddingHorizontal: 13,
        paddingVertical: 10,
        backgroundColor: '#9ad9ea',
      }}
      data={listUser}
      renderItem={({ item }) =>
        <UserItem item={item} />
      }
      keyExtractor={(item) => item.id}
    />
  ) : (
      <Text
        style={{
          marginHorizontal: 17,
          marginVertical: 15,
          textAlign: 'center',
          fontSize: 25,
          fontWeight: '500',
          backgroundColor: '#9ad9ea',
        }}>
        List is empty
      </Text>
    );
};
