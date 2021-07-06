import React from 'react';
import {View} from 'react-native';

interface SeparatorProps {
  style?: {
    [key: string]: string | number;
  };
}

const Separator: React.FC<SeparatorProps> = ({style}) => {
  return (
    <View
      style={{
        borderTopColor: '#c4c4c4',
        borderTopWidth: 1,
        ...style,
      }}
    />
  );
};

export default Separator;
