import { User, UserModel } from "../models/UserModel";
import { Storage } from "../common/Storage";
import { Network } from "../common/Network";
export interface UserRepository {
  getUserFromLocalStorage: () => Promise<User[] | undefined>;
  saveUserToLocalStorage: (user: User) => Promise<void>;
  getUserFromAPI: () => Promise<UserModel>;
}
export class UserRepositoryImpl implements UserRepository {
  storage: Storage;
  network: Network;
  constructor() {
    this.storage = new Storage();
    this.network = new Network();
  }
  async getUserFromLocalStorage(): Promise<User[] | undefined> {
    let dbTemp = await this.storage.getUsers();
    return dbTemp;
  }
  async saveUserToLocalStorage(user: User): Promise<void> {
    this.storage.saveUser(user);
  }
  async getUserFromAPI(): Promise<UserModel> {
    const user = await this.network.getUser();
    console.log(user, "repository");
    return user;
  }
}
