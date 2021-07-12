import React, {useState, useEffect} from 'react';
import {TextInput} from 'react-native';
import {SQLiteDatabase} from 'react-native-sqlite-storage';
import AlertModal from '../../AlertModal/AlertModal';
import {editListName} from '../../../services/list';
import {getTableData} from '../../../services/initTransactions';
import {ListPage} from '../../../types/listTypes';

interface EditListNameProps {
  db: SQLiteDatabase;
  setShoppingData: React.Dispatch<React.SetStateAction<any>>;
  currentList: ListPage;
  editListNameModalVis: boolean;
  setEditListNameModalVis: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditListName: React.FC<EditListNameProps> = ({
  db,
  setShoppingData,
  currentList,
  editListNameModalVis,
  setEditListNameModalVis,
}) => {
  const [nameInput, setNameInput] = useState('');

  useEffect(() => {
    if (currentList) {
      setNameInput(currentList.name);
    }
  }, [currentList]);

  const onConfirm = () => {
    if (nameInput !== currentList.name) {
      editListName(db, currentList.id!, nameInput).then(() => {
        getTableData(db, 'shopping').then(data => {
          setShoppingData(data);
          setEditListNameModalVis(false);
        });
      });
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
