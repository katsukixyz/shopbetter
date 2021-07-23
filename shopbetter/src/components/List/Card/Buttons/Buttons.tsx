import React from 'react';
import {View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface ButtonsProps {
  setRemoveListModalVis: React.Dispatch<React.SetStateAction<boolean>>;
  setClearListModalVis: React.Dispatch<React.SetStateAction<boolean>>;
  setAddItemModalVis: React.Dispatch<React.SetStateAction<boolean>>;
}

const Buttons: React.FC<ButtonsProps> = ({
  setAddItemModalVis,
  setClearListModalVis,
  setRemoveListModalVis,
}) => {
  return (
    <View
      style={{
        paddingTop: 2,
        width: 100,
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
        onPress={() => setRemoveListModalVis(true)}>
        <Ionicons
          name="trash-outline"
          color="white"
          size={18}
          style={{paddingLeft: 1}}
        />
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
        onPress={() => setClearListModalVis(true)}>
        <MaterialCommunityIcons name="refresh" color="white" size={18} />
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
