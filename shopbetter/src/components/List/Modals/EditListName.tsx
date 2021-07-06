import React, {useState, useEffect} from 'react';
import {RefreshControl} from 'react-native';
import {View, Text, TextInput} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {addList} from '../../../services/list';
import {SQLiteDatabase} from 'react-native-sqlite-storage';
import Separator from '../Separator/Separator';
import AlertModal from '../../AlertModal/AlertModal';
import {editListName} from '../../../services/list';
import {getTableData} from '../../../services/initTransactions';
import {ListObject} from '../Card/ListCard';

interface EditListNameProps {
  db: SQLiteDatabase;
  setShoppingData: React.Dispatch<React.SetStateAction<any>>;
  currentList: ListObject;
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
  useEffect(() => {
    setNameInput(currentList.name);
  }, [currentList]);

  const [nameInput, setNameInput] = useState('');

  const onConfirm = () => {
    editListName(db, currentList.id!, nameInput).then(() => {
      getTableData(db, 'shopping').then(data => {
        setShoppingData(data);
        setEditListNameModalVis(false);
        setNameInput('');
      });
    });
  };

  const onCancel = () => {
    setNameInput('');
    setEditListNameModalVis(false);
  };

  return (
    <AlertModal
      title="Edit list name"
      modalVis={editListNameModalVis}
      setModalVis={setEditListNameModalVis}
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
