import React from 'react';
import {TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const AddButton: React.FC = () => {
  return (
    <TouchableOpacity
      style={{
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'black',
        position: 'absolute',
        bottom: 20,
        right: 20,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <MaterialCommunityIcons name="plus" color="white" size={30} />
    </TouchableOpacity>
  );
};

export default AddButton;
