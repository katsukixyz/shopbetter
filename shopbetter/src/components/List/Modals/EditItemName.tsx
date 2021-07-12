import React, {useState, useEffect} from 'react';
import {ListPage} from '../../../types/listTypes';
import AlertModal from '../../AlertModal/AlertModal';
import {TextInput} from 'react-native-gesture-handler';
import {SQLiteDatabase} from 'react-native-sqlite-storage';
import {updateListItem} from '../../../services/list';
import {getTableData} from '../../../services/initTransactions';

interface EditItemNameProps {
  db: SQLiteDatabase;
  currentList: ListPage;
  listIndex: number;
  itemRefs: Map<any, any>;
  setShoppingData: React.Dispatch<React.SetStateAction<any>>;
  editItemNameModalVis: boolean;
  setEditItemNameModalVis: React.Dispatch<
    React.SetStateAction<{
      visible: boolean;
      index: number;
      itemRefs: Map<any, any>;
    }>
  >;
}

const EditItemName: React.FC<EditItemNameProps> = ({
  db,
  currentList,
  listIndex,
  itemRefs,
  setShoppingData,
  editItemNameModalVis,
  setEditItemNameModalVis,
}) => {
  const [nameInput, setNameInput] = useState('');

  useEffect(() => {
    if (currentList && JSON.parse(currentList.items).length !== 0) {
      setNameInput(JSON.parse(currentList.items)[listIndex].name);
    }
  }, [currentList, listIndex]);

  const onConfirm = () => {
    const currentItems = JSON.parse(currentList.items);
    // console.log(currentItems[listIndex]);
    if (nameInput !== currentItems[listIndex]) {
      const updatedItems = [...currentItems];
      updatedItems[listIndex].name = nameInput;
      updateListItem(db, currentList.id!, JSON.stringify(updatedItems)).then(
        () => {
          getTableData(db, 'shopping').then(data => {
            setShoppingData(data);
          });
        },
      );
    }
    [...itemRefs.entries()].forEach(([key, ref]) => {
      if (ref) {
        ref.close();
      }
    });
    setEditItemNameModalVis({
      visible: false,
      index: listIndex,
      itemRefs: itemRefs,
    });
  };

  const onCancel = () => {
    setEditItemNameModalVis({
      visible: false,
      index: listIndex,
      itemRefs: itemRefs,
    });
  };

  return (
    <AlertModal
      title="Edit item name"
      modalVis={editItemNameModalVis}
      onConfirm={() => onConfirm()}
      onCancel={() => onCancel()}>
      <TextInput
        style={{backgroundColor: '#f8f4f4', padding: 14, borderRadius: 6}}
        placeholder="Item name"
        value={nameInput}
        onChangeText={setNameInput}
      />
    </AlertModal>
  );
};

export default EditItemName;
