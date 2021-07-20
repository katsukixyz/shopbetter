import React, {useState} from 'react';
import {TextInput} from 'react-native';
import {SQLiteDatabase} from 'react-native-sqlite-storage';
import AlertModal from '../../AlertModal/AlertModal';
import {Comparison} from '../../../types/compareTypes';
import {addComparison, getComparisonData} from '../../../services/compare';

interface AddComparisonProps {
  db: SQLiteDatabase;
  setComparisonData: React.Dispatch<React.SetStateAction<Comparison[]>>;
  addComparisonModalVis: boolean;
  setAddComparisonModalVis: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddComparison: React.FC<AddComparisonProps> = ({
  db,
  setComparisonData,
  addComparisonModalVis,
  setAddComparisonModalVis,
}) => {
  const [nameInput, setNameInput] = useState('');
  const [priceInput, setPriceInput] = useState('');
  const [quantityInput, setQuantityInput] = useState('');

  const onConfirm = () => {
    try {
      if (priceInput && quantityInput) {
        addComparison(db, {
          name: nameInput,
          store: 'All',
          price: parseFloat(priceInput),
          quantity: parseFloat(quantityInput),
        }).then(() => {
          getComparisonData(db).then((data: Comparison[]) => {
            setComparisonData(data);
            setAddComparisonModalVis(false);
            setNameInput('');
            setPriceInput('');
            setQuantityInput('');
          });
        });
      }
    } catch (e) {
      console.log('err', e);
    }
  };

  const onCancel = () => {
    setAddComparisonModalVis(false);
    setNameInput('');
    setPriceInput('');
    setQuantityInput('');
  };

  return (
    <AlertModal
      title="Add item"
      modalVis={addComparisonModalVis}
      onConfirm={() => onConfirm()}
      onCancel={() => onCancel()}
      style={
        {
          // marginTop: 190,
          // marginBottom: 295,
        }
      }>
      <TextInput
        placeholder="Item name"
        placeholderTextColor="#909090"
        style={{
          backgroundColor: '#f8f4f4',
          padding: 14,
          borderRadius: 6,
          marginBottom: 10,
        }}
        onChangeText={setNameInput}
        value={nameInput}
      />
      <TextInput
        placeholder="Price"
        placeholderTextColor="#909090"
        keyboardType="numeric"
        style={{
          backgroundColor: '#f8f4f4',
          padding: 14,
          borderRadius: 6,
          marginBottom: 10,
        }}
        onChangeText={setPriceInput}
        value={priceInput}
      />
      <TextInput
        placeholder="Quantity/Weight"
        placeholderTextColor="#909090"
        keyboardType="numeric"
        style={{backgroundColor: '#f8f4f4', padding: 14, borderRadius: 6}}
        onChangeText={setQuantityInput}
        value={quantityInput}
      />
    </AlertModal>
  );
};

export default AddComparison;
