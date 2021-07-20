import React, {useState, useEffect, SetStateAction} from 'react';
import {Text} from 'react-native';
import {SQLiteDatabase} from 'react-native-sqlite-storage';
import AlertModal from '../../AlertModal/AlertModal';
import {removeList, updateListItem} from '../../../services/list';
import {ListPage} from '../../../types/listTypes';

interface ClearListProps {
  db: SQLiteDatabase;
  pageIndex: number;
  shoppingData: ListPage[];
  setShoppingData: React.Dispatch<React.SetStateAction<ListPage[]>>;
  clearListModalVis: boolean;
  setClearListModalVis: React.Dispatch<SetStateAction<boolean>>;
}

const ClearList: React.FC<ClearListProps> = ({
  db,
  pageIndex,
  shoppingData,
  setShoppingData,
  clearListModalVis,
  setClearListModalVis,
}) => {
  const currentList = shoppingData[pageIndex];
  const onConfirm = () => {
    const updatedShoppingData = [...shoppingData];
    updatedShoppingData[pageIndex].items = [];
    setShoppingData(updatedShoppingData);

    updateListItem(db, currentList.id!, JSON.stringify([]));
    setClearListModalVis(false);
  };

  const onCancel = () => {
    setClearListModalVis(false);
  };

  return (
    <AlertModal
      title="Clear list"
      modalVis={clearListModalVis}
      onConfirm={() => onConfirm()}
      onCancel={() => onCancel()}>
      <Text>Are you sure you want to clear this list?</Text>
    </AlertModal>
  );
};

export default ClearList;
