import React from 'react';
import {TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const AddButton: React.FC = () => {
  return (
    <TouchableOpacity
      style={{
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: 'black',
        position: 'absolute',
        top: 64,
        right: 20,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <MaterialCommunityIcons name="filter" color="white" size={15} />
    </TouchableOpacity>
  );
};

export default AddButton;
