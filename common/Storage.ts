import { AsyncStorage } from "react-native";
import { keyDB } from "../constants";
import { User } from "../models/UserModel";

export class Storage {
  constructor() {}
  getUsers = async (): Promise<User[] | undefined> => {
    let dbTemp = await AsyncStorage.getItem(keyDB);
    if (dbTemp) {
      let oldArray: User[];
      oldArray = JSON.parse(dbTemp);
      return oldArray;
    }
  };

  saveUser = (user: User) => {
    this.getUsers()
      .then((oldArray) => {
        if (!oldArray) oldArray = new Array<User>();
        oldArray = oldArray.concat(user);
        AsyncStorage.setItem(keyDB, JSON.stringify(oldArray))
          .then(() => {
            console.log("Saved");
          })
          .catch((saveError) => {
            console.log(saveError, "saveError");
            throw saveError;
          });
      })
      .catch((getUserError) => {
        console.log(getUserError, "getUserError");
        throw getUserError;
      });
  };
}
