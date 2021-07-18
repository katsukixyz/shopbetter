import React, {useState, useEffect} from 'react';
import AlertModal from '../../AlertModal/AlertModal';
import {Comparison} from '../../../types/compareTypes';
import {Picker} from '@react-native-picker/picker';
import {TextInput} from 'react-native-gesture-handler';

interface FilterProps {
  comparisonData: Comparison[];
  allStores: Set<string>;
  filterModalVis: boolean;
  setFilterModalVis: React.Dispatch<React.SetStateAction<boolean>>;
  setFilteredComparisonData: React.Dispatch<React.SetStateAction<Comparison[]>>;
}

const filterValues = (
  comparisonData: Comparison[],
  store: string,
  searchVal: string,
): Comparison[] => {
  let filtered: Comparison[] = comparisonData;
  if (store !== 'All') {
    const matchedStore = filtered.filter(e => e.store === store);
    filtered = matchedStore;
    if (searchVal) {
      const matchedSearch = filtered.filter(e =>
        e.name.toLowerCase().includes(searchVal.toLowerCase()),
      );
      filtered = matchedSearch;
    }
  } else {
    if (searchVal) {
      const matchedSearch = filtered.filter(e =>
        e.name.toLowerCase().includes(searchVal.toLowerCase()),
      );
      filtered = matchedSearch;
    }
  }
  return filtered;
};

const Filter: React.FC<FilterProps> = ({
  comparisonData,
  allStores,
  filterModalVis,
  setFilterModalVis,
  setFilteredComparisonData,
}) => {
  const [pickerInput, setPickerInput] = useState('All');
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    if ([...allStores].includes(pickerInput)) {
      //normal picking function
      setFilteredComparisonData(
        filterValues(comparisonData, pickerInput, searchInput),
      );
    } else {
      //when filtered list is modified (ex. changing comparison store while filtered), reset to All
      setFilteredComparisonData(comparisonData);
      setPickerInput('All');
    }
  }, [comparisonData, allStores]);

  const onConfirm = () => {
    setFilteredComparisonData(
      filterValues(comparisonData, pickerInput, searchInput),
    );
    setFilterModalVis(false);
  };
  const onCancel = () => {
    setFilterModalVis(false);
  };

  return (
    <AlertModal
      style={{marginTop: 220, marginBottom: 250}}
      title="Filter items"
      modalVis={filterModalVis}
      onConfirm={onConfirm}
      onCancel={onCancel}>
      <Picker
        style={{height: 120}}
        itemStyle={{height: 120}}
        selectedValue={pickerInput}
        onValueChange={itemValue => setPickerInput(itemValue)}>
        {['All', ...allStores].map((storeName, i) => (
          <Picker.Item key={i} label={storeName} value={storeName} />
        ))}
      </Picker>
      <TextInput
        placeholder="Search items..."
        value={searchInput}
        onChangeText={setSearchInput}
        style={{
          backgroundColor: '#f8f4f4',
          padding: 14,
          borderRadius: 6,
          marginBottom: 10,
        }}
      />
    </AlertModal>
  );
};

export {filterValues};
export default Filter;
