import React, {SetStateAction, useEffect, useMemo, useState} from 'react';
import {View} from 'react-native';
import {SQLiteDatabase} from 'react-native-sqlite-storage';
import AlertModal from '../../AlertModal/AlertModal';
import {Comparison} from '../../../types/compareTypes';
import {Picker} from '@react-native-picker/picker';
import {TextInput} from 'react-native-gesture-handler';
import {updateComparison, getComparisonData} from '../../../services/compare';

interface StorePickerProps {
  db: SQLiteDatabase;
  comparisonData: Comparison[];
  setComparisonData: React.Dispatch<React.SetStateAction<Comparison[]>>;
  allStores: Set<string>;
  index: number;
  storePickerModalVis: boolean;
  setStorePickerModalVis: React.Dispatch<
    SetStateAction<{visible: boolean; index: number}>
  >;
}

const StorePicker: React.FC<StorePickerProps> = ({
  db,
  comparisonData,
  setComparisonData,
  allStores,
  index,
  storePickerModalVis,
  setStorePickerModalVis,
}) => {
  const [pickerInput, setPickerInput] = useState('');
  const [nameInput, setNameInput] = useState('');

  const currentComparison = comparisonData[index];

  useEffect(() => {
    if (currentComparison) {
      setPickerInput(currentComparison.store);
    }
  }, [currentComparison]);

  const onConfirm = () => {
    // const updatedComparisonData = [...comparisonData];
    if (pickerInput !== '+ Other store') {
      //   updatedComparisonData[index] = {
      //     ...currentComparison,
      //     store: pickerInput,
      //   };
      updateComparison(db, {
        ...currentComparison,
        store: pickerInput,
      }).then(() => {
        getComparisonData(db).then(data => {
          console.log(data);
          setComparisonData(data);
        });
      });
      //   setComparisonData(updatedComparisonData);
      setStorePickerModalVis({visible: false, index: index});
      setNameInput('');
    } else if (nameInput) {
      //   updatedComparisonData[index] = {
      //     ...currentComparison,
      //     store: nameInput,
      //   };
      updateComparison(db, {
        ...currentComparison,
        store: nameInput,
      }).then(() => {
        getComparisonData(db).then(data => {
          console.log(data);
          setComparisonData(data);
        });
      });
      //   setComparisonData(updatedComparisonData);
      setStorePickerModalVis({visible: false, index: index});
      setNameInput('');
    }
  };
  const onCancel = () => {
    setStorePickerModalVis({visible: false, index: index});
    setNameInput('');
    setPickerInput(currentComparison.store);
  };

  return (
    <AlertModal
      style={{
        marginTop: 220,
        marginBottom: pickerInput === '+ Other store' ? 250 : 290,
      }}
      title="Change store"
      modalVis={storePickerModalVis}
      onConfirm={onConfirm}
      onCancel={onCancel}>
      <Picker
        style={{height: 120}}
        itemStyle={{height: 120}}
        selectedValue={pickerInput}
        onValueChange={itemValue => setPickerInput(itemValue)}>
        {['All', ...allStores, '+ Other store'].map((storeName, i) => (
          <Picker.Item key={i} label={storeName} value={storeName} />
        ))}
      </Picker>
      {pickerInput === '+ Other store' ? (
        <TextInput
          placeholder="New store name"
          value={nameInput}
          onChangeText={setNameInput}
          style={{
            backgroundColor: '#f8f4f4',
            padding: 14,
            borderRadius: 6,
            marginBottom: 10,
          }}
        />
      ) : (
        <View />
      )}
    </AlertModal>
  );
};

export default StorePicker;
