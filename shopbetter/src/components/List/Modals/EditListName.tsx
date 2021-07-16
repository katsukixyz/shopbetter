import React, {useState, useEffect} from 'react';
import {TextInput} from 'react-native';
import {SQLiteDatabase} from 'react-native-sqlite-storage';
import AlertModal from '../../AlertModal/AlertModal';
import {editListName} from '../../../services/list';
import {ListPage} from '../../../types/listTypes';

interface EditListNameProps {
  db: SQLiteDatabase;
  pageIndex: number;
  shoppingData: ListPage[];
  setShoppingData: React.Dispatch<React.SetStateAction<ListPage[]>>;
  editListNameModalVis: boolean;
  setEditListNameModalVis: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditListName: React.FC<EditListNameProps> = ({
  db,
  pageIndex,
  shoppingData,
  setShoppingData,
  // currentList,
  editListNameModalVis,
  setEditListNameModalVis,
}) => {
  const currentList = shoppingData[pageIndex];
  const [nameInput, setNameInput] = useState('');

  useEffect(() => {
    if (currentList) {
      setNameInput(currentList.name);
    }
  }, [currentList]);

  const onConfirm = () => {
    if (nameInput !== currentList.name) {
      const updatedShoppingData = [...shoppingData];
      updatedShoppingData[pageIndex].name = nameInput;

      setShoppingData(updatedShoppingData);
      editListName(db, currentList.id!, nameInput);
      setEditListNameModalVis(false);
    }
  };

  const onCancel = () => {
    setEditListNameModalVis(false);
  };

  return (
    <AlertModal
      title="Edit list name"
      modalVis={editListNameModalVis}
      onConfirm={() => onConfirm()}
      onCancel={() => onCancel()}>
      <TextInput
        style={{backgroundColor: '#f8f4f4', padding: 14, borderRadius: 6}}
        placeholder="List name"
        value={nameInput}
        onChangeText={setNameInput}
      />
    </AlertModal>
  );
};

export default EditListName;
