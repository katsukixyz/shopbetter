import React, {useState} from 'react';
import {View, Text, TextInput} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {addList} from '../../../services/list';
import {SQLiteDatabase} from 'react-native-sqlite-storage';
import Separator from '../Separator/Separator';
import AlertModal from '../../AlertModal/AlertModal';
import Modal from 'react-native-modal';
import {getTableData} from '../../../services/initTransactions';

interface AddListProps {
  db: SQLiteDatabase;
  setShoppingData: React.Dispatch<React.SetStateAction<any>>;
  addListModalVis: boolean;
  setAddListModalVis: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddList: React.FC<AddListProps> = ({
  db,
  setShoppingData,
  addListModalVis,
  setAddListModalVis,
}) => {
  const [nameInput, setNameInput] = useState('');

  const onConfirm = () => {
    addList(db, {name: nameInput, items: JSON.stringify([])}).then(() => {
      getTableData(db, 'shopping').then(data => {
        setShoppingData(data);
        setAddListModalVis(false);
        setNameInput('');
      });
    });
  };

  const onCancel = () => {
    setNameInput('');
    setAddListModalVis(false);
  };

  return (
    <AlertModal
      title="Add list"
      modalVis={addListModalVis}
      setModalVis={setAddListModalVis}
      onConfirm={() => onConfirm()}
      onCancel={() => onCancel()}>
      <TextInput
        placeholder="New list name"
        style={{backgroundColor: '#f8f4f4', padding: 14, borderRadius: 6}}
        onChangeText={setNameInput}
        value={nameInput}
      />
    </AlertModal>
  );
};

export default AddList;
