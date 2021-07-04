import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {Swipeable, RectButton} from 'react-native-gesture-handler';
import {Picker} from '@react-native-picker/picker';

type CompareItem = {
  name: string;
};

const CompareCard: React.FC<{
  item: CompareItem;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({item, setModalVisible}) => {
  const [selectedLanguage, setSelectedLanguage] = useState('joe');

  const renderRightActions = (progress: any, dragX: any) => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          backgroundColor: 'red',
          // width: 20,
          // padding: 20,
          marginTop: 5,
          marginBottom: 5,
          borderRadius: 12,
        }}></View>
    );
  };

  return (
    <Swipeable
      friction={2}
      rightThreshold={41}
      renderRightActions={renderRightActions}>
      <View
        style={{
          backgroundColor: 'white',
          height: 80,
          borderRadius: 12,
          marginTop: 5,
          marginBottom: 5,
          padding: 10,
        }}>
        <Text style={{fontWeight: '500', fontSize: 18}}>{item.name}</Text>
        {/* <RectButton onPress={() => setModalVisible(true)}>
          <Text>Click me</Text>
        </RectButton> */}
        <Text>joe</Text>
        {/* <Picker
          style={{backgroundColor: 'red'}}
          selectedValue={selectedLanguage}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedLanguage(itemValue)
          }>
          <Picker.Item label="joe" value="joe" />
          <Picker.Item label="joe2" value="joe2" />
        </Picker> */}
      </View>
    </Swipeable>
  );
};

export default CompareCard;
