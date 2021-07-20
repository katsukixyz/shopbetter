import React from 'react';
import {Text, View} from 'react-native';

interface PageHeaderProps {
  style?: {
    [key: string]: string | number;
  };
}

const PageHeader: React.FC<PageHeaderProps> = ({children, style}) => {
  return (
    <View style={style}>
      <Text
        style={{
          fontSize: 36,
          fontWeight: '700',
        }}>
        {children}
      </Text>
    </View>
  );
};

export default PageHeader;
