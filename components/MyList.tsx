import React, { useState } from 'react';
import { MyIcon } from './MyIcon';
interface MyListProps {
  onClick: (select: number) => void;
  selectedItem: number;
}

const ListName: Array<string> = [
  'account-circle',
  'mail',
  'place',
  'phone-in-talk',
  'save',
];
const selectedColor = 'red';
const disSelectedColor = '#bfbfbf';

export const MyList: React.FunctionComponent<MyListProps> = ({
  selectedItem = 0,
  onClick,
}) => {
  return (
    <>
      <MyIcon
        name={ListName[0]}
        color={selectedItem == 0 ? selectedColor : disSelectedColor}
        onPress={() => {
          onClick(0);
        }}
      />
      <MyIcon
        name={ListName[1]}
        color={selectedItem == 1 ? selectedColor : disSelectedColor}
        onPress={() => {
          onClick(1);
        }}
      />
      <MyIcon
        name={ListName[2]}
        color={selectedItem == 2 ? selectedColor : disSelectedColor}
        onPress={() => {
          onClick(2);
        }}
      />
      <MyIcon
        name={ListName[3]}
        color={selectedItem == 3 ? selectedColor : disSelectedColor}
        onPress={() => {
          onClick(3);
        }}
      />
      <MyIcon
        name={ListName[4]}
        color={selectedItem == 4 ? selectedColor : disSelectedColor}
        onPress={() => {
          onClick(4);
        }}
      />
    </>
  );
};
