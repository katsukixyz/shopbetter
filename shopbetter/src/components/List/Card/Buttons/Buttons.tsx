import React from 'react';
import {View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface ButtonsProps {
  setAddItemModalVis: React.Dispatch<React.SetStateAction<boolean>>;
}

const Buttons: React.FC<ButtonsProps> = ({setAddItemModalVis}) => {
  return (
    <View
      style={{
        paddingTop: 2,
        width: 70,
        // height: 44,
        flexDirection: 'row',
        justifyContent: 'space-between',
        // alignItems: 'center',
      }}>
      <TouchableOpacity
        style={{
          width: 30,
          height: 30,
          borderRadius: 15,
          backgroundColor: 'black',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={() => console.log('joe')}>
        <Ionicons name="trash-outline" color="white" size={18} />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          width: 30,
          height: 30,
          borderRadius: 15,
          backgroundColor: 'black',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={() => setAddItemModalVis(true)}>
        <MaterialCommunityIcons name="plus" color="white" size={18} />
      </TouchableOpacity>
    </View>
  );
};

export default Buttons;
