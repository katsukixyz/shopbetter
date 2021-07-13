import React, {useState, useEffect} from 'react';
import {TextInput} from 'react-native';
import {SQLiteDatabase} from 'react-native-sqlite-storage';
import AlertModal from '../../AlertModal/AlertModal';
import {updateListItem} from '../../../services/list';
import {getTableData} from '../../../services/initTransactions';
import {ListPage, ListItem} from '../../../types/listTypes';

interface AddListItemProps {
  db: SQLiteDatabase;
  shoppingData: any;
  pageIndex: number;
  setShoppingData: React.Dispatch<React.SetStateAction<any>>;
  addItemModalVis: boolean;
  setAddItemModalVis: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddListItem: React.FC<AddListItemProps> = ({
  db,
  pageIndex,
  shoppingData,
  setShoppingData,
  addItemModalVis,
  setAddItemModalVis,
}) => {
  const currentList = shoppingData[pageIndex];
  const [itemNameInput, setItemNameInput] = useState('');

  const onConfirm = () => {
    let items: ListItem[] = JSON.parse(currentList.items);
    items.push({
      name: itemNameInput,
      checkVal: false,
    });

    const updatedShoppingData = [...shoppingData];
    updatedShoppingData[pageIndex].items = JSON.stringify(items);
    setShoppingData(updatedShoppingData);
    updateListItem(db, currentList.id!, JSON.stringify(items));
    setItemNameInput('');
    setAddItemModalVis(false);
  };

  const onCancel = () => {
    setAddItemModalVis(false);
    setItemNameInput('');
  };

  return (
    <AlertModal
      title="Add item"
      modalVis={addItemModalVis}
      onConfirm={() => onConfirm()}
      onCancel={() => onCancel()}>
      <TextInput
        style={{backgroundColor: '#f8f4f4', padding: 14, borderRadius: 6}}
        placeholder="Item name"
        value={itemNameInput}
        onChangeText={setItemNameInput}
      />
    </AlertModal>
  );
};

export default AddListItem;
