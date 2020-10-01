import * as React from 'react';
import { Icon } from 'react-native-elements';
interface MyIconProps {
  name?: string;
  onPress?: () => void;
  color?: string;
}

export const MyIcon: React.FunctionComponent<MyIconProps> = ({
  name = 'event',
  onPress,
  color = '#bfbfbf',
}) => {
  return (
    <Icon
      name={name}
      type="material"
      color={color}
      containerStyle={{ padding: 10 }}
      size={30}
      onPress={onPress}
    />
  );
};
