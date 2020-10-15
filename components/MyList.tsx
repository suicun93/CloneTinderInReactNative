import React from "react";
import { MyIcon } from "./MyIcon";

interface MyListProps {
  onClick: (select: number) => void;
  selectedItem: number;
}

const ListName: Array<string> = [
  "account-circle",
  "mail",
  "place",
  "phone-in-talk",
  "save",
];

export const MyList: React.FunctionComponent<MyListProps> = ({
  selectedItem = 0,
  onClick,
}) => {
  return (
    <>
      <MyIcon
        name={ListName[0]}
        selected={selectedItem == 0}
        onPress={() => {
          onClick(0);
        }}
      />
      <MyIcon
        name={ListName[1]}
        selected={selectedItem == 1}
        onPress={() => {
          onClick(1);
        }}
      />
      <MyIcon
        name={ListName[2]}
        selected={selectedItem == 2}
        onPress={() => {
          onClick(2);
        }}
      />
      <MyIcon
        name={ListName[3]}
        selected={selectedItem == 3}
        onPress={() => {
          onClick(3);
        }}
      />
      <MyIcon
        name={ListName[4]}
        selected={selectedItem == 4}
        onPress={() => {
          onClick(4);
        }}
      />
    </>
  );
};
