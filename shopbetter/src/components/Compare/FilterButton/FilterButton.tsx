import React from 'react';
import {TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {closeItemRefs} from '../../List/Card/ListCard';

interface FilterButtonProps {
  itemRefs: Map<any, any>;
  setFilterModalVis: React.Dispatch<React.SetStateAction<boolean>>;
}

const FilterButton: React.FC<FilterButtonProps> = ({
  itemRefs,
  setFilterModalVis,
}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        closeItemRefs(itemRefs);
        setFilterModalVis(true);
      }}
      style={{
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: 'black',
        // position: 'absolute',
        // top: 64,
        // right: 20,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Ionicons
        name="filter"
        color="white"
        size={16}
        style={{paddingLeft: 1}}
      />
    </TouchableOpacity>
  );
};

export default FilterButton;
