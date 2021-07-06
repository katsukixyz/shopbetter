import React from 'react';
import {View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Buttons: React.FC = () => {
  return (
    <View
      style={{
        paddingTop: 2,
        width: 70,
      }}>
      <TouchableOpacity
        style={{
          width: 30,
          height: 30,
          borderRadius: 15,
          backgroundColor: 'black',
          position: 'absolute',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Ionicons name="trash-outline" color="white" size={18} />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          width: 30,
          height: 30,
          borderRadius: 15,
          backgroundColor: 'black',
          position: 'absolute',
          alignItems: 'center',
          justifyContent: 'center',
          left: 40,
        }}>
        <MaterialCommunityIcons name="plus" color="white" size={18} />
      </TouchableOpacity>
    </View>
  );
};

export default Buttons;
