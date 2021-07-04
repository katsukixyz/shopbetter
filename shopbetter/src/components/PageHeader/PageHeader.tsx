import React from 'react';
import {Text, View} from 'react-native';

// interface Props {
//     children: React.ReactNode
// }

const PageHeader: React.FC = ({children}) => {
  return (
    <View>
      <Text
        style={{
          fontSize: 36,
          fontWeight: '700',
          paddingBottom: 10,
        }}>
        {children}
      </Text>
    </View>
  );
};

export default PageHeader;
