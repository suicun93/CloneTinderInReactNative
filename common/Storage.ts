import { AsyncStorage } from 'react-native';
import { User } from './models/UserModel';
import { keyDB } from '../constants';
import UserModelClass from './models/UserClass';

export const storeData = async (user: UserModelClass) => {
  console.log('storeData');
  if (!user) {
    return;
  }
  try {
    let dbTemp = await AsyncStorage.getItem(keyDB);
    let oldArray: User[];
    if (dbTemp) {
      oldArray = JSON.parse(dbTemp);
    } else {
      oldArray = new Array<User>();
    }
    oldArray = oldArray.concat(user.results[0].user);
    await AsyncStorage.setItem(keyDB, JSON.stringify(oldArray));
    console.log(oldArray, 'oldArray');
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
