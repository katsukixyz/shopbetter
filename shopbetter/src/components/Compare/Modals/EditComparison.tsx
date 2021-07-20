import React, {useState, useEffect} from 'react';
import {TextInput} from 'react-native';
import {SQLiteDatabase} from 'react-native-sqlite-storage';
import AlertModal from '../../AlertModal/AlertModal';
import {editListName} from '../../../services/list';
import {Comparison} from '../../../types/compareTypes';
import {updateComparison, getComparisonData} from '../../../services/compare';
import {closeItemRefs} from '../../List/Card/ListCard';

interface EditComparisonProps {
  db: SQLiteDatabase;
  comparisonData: Comparison[];
  setComparisonData: React.Dispatch<React.SetStateAction<Comparison[]>>;
  editComparisonModalVis: boolean;
  itemRefs: Map<any, any>;
  index: number;
  setEditComparisonModalVis: React.Dispatch<
    React.SetStateAction<{
      visible: boolean;
      index: number;
    }>
  >;
}

const EditComparison: React.FC<EditComparisonProps> = ({
  db,
  comparisonData,
  setComparisonData,
  editComparisonModalVis,
  itemRefs,
  index,
  setEditComparisonModalVis,
}) => {
  const [nameInput, setNameInput] = useState('');
  const [priceInput, setPriceInput] = useState('');
  const [quantityInput, setQuantityInput] = useState('');

  const comparisonItem = comparisonData[index];

  useEffect(() => {
    if (comparisonItem) {
      setNameInput(comparisonItem.name);
      setPriceInput(comparisonItem.price.toString());
      setQuantityInput(comparisonItem.quantity.toString());
    }
  }, [comparisonData, index]);

  const onConfirm = () => {
    try {
      if (
        !(
          comparisonItem.name === nameInput &&
          comparisonItem.price === parseFloat(priceInput) &&
          comparisonItem.quantity === parseFloat(quantityInput)
        )
      ) {
        let price = parseFloat(priceInput) || comparisonItem.price;
        let quantity = parseFloat(quantityInput) || comparisonItem.quantity;
        updateComparison(db, {
          id: comparisonItem.id,
          store: comparisonItem.store,
          name: nameInput,
          price: price,
          quantity: quantity,
        }).then(() => {
          // const updatedComparisonItem = {
          //   ...comparisonItem,
          //   name: nameInput,
          //   price: price,
          //   quantity: quantity,
          // };
          // const updatedComparisonData = [...comparisonData];
          // updatedComparisonData[index] = updatedComparisonItem;
          // setComparisonData(updatedComparisonData);
          getComparisonData(db).then(data => {
            setComparisonData(data);
          });
        });
      }
      closeItemRefs(itemRefs);
      setEditComparisonModalVis({
        visible: false,
        index: index,
      });
    } catch (e) {
      console.log(e);
    }
  };
  const onCancel = () => {
    setEditComparisonModalVis({
      visible: false,
      index: index,
    });
  };

  return (
    <AlertModal
      title="Edit item"
      modalVis={editComparisonModalVis}
      onConfirm={onConfirm}
      onCancel={onCancel}>
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
        contextMenuHidden={true}
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
        contextMenuHidden={true}
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

export default EditComparison;
