import React from 'react';
import {TouchableOpacity} from 'react-native';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

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
      <Ionicons name="filter" color="white" size={16} />
    </TouchableOpacity>
  );
};

export default AddButton;
