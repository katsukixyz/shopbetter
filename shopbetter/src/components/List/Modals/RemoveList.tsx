import React, {useState, useEffect, SetStateAction} from 'react';
import {Text} from 'react-native';
import {SQLiteDatabase} from 'react-native-sqlite-storage';
import AlertModal from '../../AlertModal/AlertModal';
import {removeList} from '../../../services/list';
import {getTableData} from '../../../services/initTransactions';
import {ListPage} from '../../../types/listTypes';

interface RemoveListProps {
  db: SQLiteDatabase;
  pageIndex: number;
  shoppingData: ListPage[];
  setShoppingData: React.Dispatch<React.SetStateAction<ListPage[]>>;
  removeListModalVis: boolean;
  setRemoveListModalVis: React.Dispatch<SetStateAction<boolean>>;
}

const RemoveList: React.FC<RemoveListProps> = ({
  db,
  pageIndex,
  shoppingData,
  setShoppingData,
  removeListModalVis,
  setRemoveListModalVis,
}) => {
  const currentList = shoppingData[pageIndex];
  const onConfirm = () => {
    const updatedShoppingData = [...shoppingData];
    updatedShoppingData.splice(pageIndex, 1);
    setShoppingData(updatedShoppingData);

    removeList(db, currentList.id!);
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
      onConfirm={() => onConfirm()}
      onCancel={() => onCancel()}>
      <Text>Are sure you want to delete this list?</Text>
    </AlertModal>
  );
};

export default RemoveList;
