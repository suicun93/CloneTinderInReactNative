import React, { useState } from "react";
import { UserServiceImpl } from "../useCases/UserUseCase";
import { UserRepositoryImpl } from "../repositories/UserRepository";
import { collectDataFromUser } from "../models/MyData";

var userRepositoryImpl = new UserRepositoryImpl();
var userUseCase = new UserServiceImpl(userRepositoryImpl);

export function useHomeScreenController() {
  const [user, setUser] = useState(undefined);
  const [selectedItem, setSelectedItem] = useState(0);
  const listData = collectDataFromUser(user);

  const swipe = React.useCallback(
    async (direction: "right" | "left") => {
      try {
        if (direction === "right") {
          console.log(user, "controller");
          userUseCase.saveUserToLocalStorage(user.results[0].user);
        }
        setUser(undefined);
        setSelectedItem(0);
        var newUser = await userUseCase.getUserFromAPI();
        setUser(newUser);
      } catch (e) {
        console.log(e);
      }
    },
    [user]
  );

  return { user, selectedItem, swipe, setSelectedItem, listData };
}
