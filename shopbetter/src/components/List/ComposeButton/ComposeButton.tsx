import React from 'react';
import {TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface ComposeButton {
  setAddListModalVis: React.Dispatch<React.SetStateAction<boolean>>;
}

const ComposeButton: React.FC<ComposeButton> = ({setAddListModalVis}) => {
  return (
    <TouchableOpacity
      onPress={() => setAddListModalVis(true)}
      style={{
        width: 60,
        height: 60,
        position: 'absolute',
        bottom: 20,
        right: 20,
        borderRadius: 30,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <MaterialCommunityIcons name="text-box-plus" color="white" size={30} />
    </TouchableOpacity>
  );
};

export default ComposeButton;
