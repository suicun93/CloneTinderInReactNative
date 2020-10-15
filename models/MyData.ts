import { UserModel } from "./UserModel";

export interface MyData {
  title: string;
  data: string;
}

export const collectDataFromUser: (user: UserModel) => MyData[] = (
  user: UserModel
) => {
  const listData: MyData[] = [
    {
      title: "My name is",
      data: !user
        ? "Unknown"
        : user.results[0].user.name.first.toUpperCase() +
          " " +
          user.results[0].user.name.last.toUpperCase(),
    },
    {
      title: "My email is",
      data: !user ? "Unknown" : user.results[0].user.email,
    },
    {
      title: "My address is",
      data: !user
        ? "Unknown"
        : user.results[0].user.location.street +
          ", " +
          user.results[0].user.location.city +
          ", " +
          user.results[0].user.location.state,
    },
    {
      title: "My phone is",
      data: !user ? "Unknown" : user.results[0].user.phone,
    },
    {
      title: "My cell is",
      data: !user ? "Unknown" : user.results[0].user.cell,
    },
  ];
  return listData;
};
