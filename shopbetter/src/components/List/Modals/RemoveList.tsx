import React, {useState, useEffect, SetStateAction} from 'react';
import {Text} from 'react-native';
import {SQLiteDatabase} from 'react-native-sqlite-storage';
import AlertModal from '../../AlertModal/AlertModal';
import {removeList} from '../../../services/list';
import {getTableData} from '../../../services/initTransactions';

interface RemoveListProps {
  db: SQLiteDatabase;
  shoppingData: any;
  setShoppingData: React.Dispatch<React.SetStateAction<any>>;
  currentPageIndex: number;
  removeListModalVis: boolean;
  setRemoveListModalVis: React.Dispatch<SetStateAction<boolean>>;
}

const RemoveList: React.FC<RemoveListProps> = ({
  db,
  shoppingData,
  setShoppingData,
  currentPageIndex,
  removeListModalVis,
  setRemoveListModalVis,
}) => {
  const currentList = shoppingData[currentPageIndex];
  const onConfirm = () => {
    removeList(db, currentList.id!).then(() => {
      getTableData(db, 'shopping').then(data => {
        setShoppingData(data);
        setRemoveListModalVis(false);
      });
    });
  };

  const onCancel = () => {
    setRemoveListModalVis(false);
  };

  return (
    <AlertModal
      style={{
        marginBottom: 320,
      }}
      title="Remove list"
      modalVis={removeListModalVis}
      setModalVis={setRemoveListModalVis}
      onConfirm={() => onConfirm()}
      onCancel={() => onCancel()}>
      <Text>Are sure you want to delete this list?</Text>
    </AlertModal>
  );
};

export default RemoveList;
