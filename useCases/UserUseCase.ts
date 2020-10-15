import { UserModel, User } from "../models/UserModel";
import { UserRepository } from "../repositories/UserRepository";
export interface UserService {
  getUserFromLocalStorage: () => Promise<User[] | undefined>;
  saveUserToLocalStorage: (user: User) => Promise<void>;
  getUserFromAPI: () => Promise<UserModel>;
}
export class UserServiceImpl implements UserService {
  userRepo: UserRepository;
  constructor(userRepo: UserRepository) {
    this.userRepo = userRepo;
  }
  async getUserFromLocalStorage(): Promise<User[]> {
    let user = await this.userRepo.getUserFromLocalStorage();
    if (user) return user;
    return new Array<User>();
  }
  async saveUserToLocalStorage(user: User): Promise<void> {
    console.log(user, "to save");
    await this.userRepo.saveUserToLocalStorage(user);
  }
  async getUserFromAPI(): Promise<UserModel> {
    let user = await this.userRepo.getUserFromAPI();
    console.log(user, "service");
    return user;
  }
}
