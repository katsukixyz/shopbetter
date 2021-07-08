import React, {useState, useEffect} from 'react';
import {TextInput} from 'react-native';
import {SQLiteDatabase} from 'react-native-sqlite-storage';
import AlertModal from '../../AlertModal/AlertModal';
import {updateListItem} from '../../../services/list';
import {getTableData} from '../../../services/initTransactions';
import {ListPage, ListItem} from '../../../types/listTypes';

interface AddListItemProps {
  db: SQLiteDatabase;
  setShoppingData: React.Dispatch<React.SetStateAction<any>>;
  currentList: ListPage;
  addItemModalVis: boolean;
  setAddItemModalVis: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddListItem: React.FC<AddListItemProps> = ({
  db,
  setShoppingData,
  currentList,
  addItemModalVis,
  setAddItemModalVis,
}) => {
  const [itemNameInput, setItemNameInput] = useState('');

  const onConfirm = () => {
    let items: ListItem[] = JSON.parse(currentList.items);
    items.push({
      name: itemNameInput,
      checkVal: false,
    });

    updateListItem(db, currentList.id!, JSON.stringify(items)).then(() => {
      getTableData(db, 'shopping').then(data => {
        setShoppingData(data);
        setAddItemModalVis(false);
        setItemNameInput('');
      });
    });
  };

  const onCancel = () => {
    setItemNameInput('');
    setAddItemModalVis(false);
  };

  return (
    <AlertModal
      title="Add item"
      modalVis={addItemModalVis}
      setModalVis={setAddItemModalVis}
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
