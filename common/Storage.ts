import { AsyncStorage } from 'react-native';
import { keyDB } from '../constants';
import { UserModel, User } from '../models/UserModel';

export const storeData = async (user: UserModel) => {
  console.log('storeData');
  if (!user) {
    console.log('noUser');
    return;
  }
  try {
    let dbTemp = await AsyncStorage.getItem(keyDB);
    let oldArray: User[];
    // console.log('oldArray');
    if (dbTemp) {
      // console.log('if');
      oldArray = JSON.parse(dbTemp);
    } else {
      // console.log('else');
      oldArray = new Array<User>();
    }
    // console.log('noUser');
    oldArray = oldArray.concat(user.results[0].user);
    await AsyncStorage.setItem(keyDB, JSON.stringify(oldArray));
    // console.log(oldArray, 'oldArray');
  } catch (error) {
    // Error saving data
    console.log(error);
  }
};

export const restoreData = async (): Promise<User[]> => {
  console.log('restoreData');
  try {
    let dbTemp = await AsyncStorage.getItem(keyDB);
    let oldArray: User[];
    if (dbTemp) {
      oldArray = JSON.parse(dbTemp);
    } else {
      oldArray = new Array<User>();
    }
    return oldArray;
  } catch (error) {
    // Error restore data
    console.log(error);
  }
  return new Array<User>();
};
