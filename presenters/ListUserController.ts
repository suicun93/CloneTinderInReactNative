import React, { useState } from "react";
import { User } from "../models/UserModel";
import { UserServiceImpl } from "../useCases/UserUseCase";
import { UserRepositoryImpl } from "../repositories/UserRepository";

var userRepositoryImpl = new UserRepositoryImpl();
var userUseCase = new UserServiceImpl(userRepositoryImpl);

export function useListUserController() {
  const [listUser, setListUser] = useState(new Array<User>());
  const loadUser = React.useCallback(() => {
    userUseCase.getUserFromLocalStorage().then((listUser: User[]) => {
      console.log("loadUser");
      setListUser(listUser);
    });
  }, []);
  return [listUser, loadUser] as [User[], () => void];
}
