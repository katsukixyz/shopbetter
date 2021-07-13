import React, {useState, useEffect, SetStateAction} from 'react';
import {Text} from 'react-native';
import {SQLiteDatabase} from 'react-native-sqlite-storage';
import AlertModal from '../../AlertModal/AlertModal';
import {removeList, updateListItem} from '../../../services/list';
import {getTableData} from '../../../services/initTransactions';
import {ListPage} from '../../../types/listTypes';
import {closeItemRefs} from '../Card/ListCard';

interface RemoveItemProps {
  db: SQLiteDatabase;
  listIndex: number;
  pageIndex: number;
  itemRefs: Map<any, any>;
  shoppingData: any;
  setShoppingData: React.Dispatch<React.SetStateAction<any>>;
  removeItemModalVis: boolean;
  setRemoveItemModalVis: React.Dispatch<
    SetStateAction<{visible: boolean; index: number; itemRefs: Map<any, any>}>
  >;
}

const RemoveListItem: React.FC<RemoveItemProps> = ({
  db,
  listIndex,
  pageIndex,
  itemRefs,
  shoppingData,
  setShoppingData,
  removeItemModalVis,
  setRemoveItemModalVis,
}) => {
  const currentList = shoppingData[pageIndex];

  const onConfirm = () => {
    const updatedItems = [...JSON.parse(currentList.items)];
    updatedItems.splice(listIndex, 1);
    const updatedShoppingData = [...shoppingData];
    updatedShoppingData[pageIndex].items = JSON.stringify(updatedItems);

    closeItemRefs(itemRefs);
    setShoppingData(updatedShoppingData);
    updateListItem(db, currentList.id!, JSON.stringify(updatedItems));
    setRemoveItemModalVis({
      visible: false,
      index: listIndex,
      itemRefs: itemRefs,
    });
  };

  const onCancel = () => {
    setRemoveItemModalVis({
      visible: false,
      index: listIndex,
      itemRefs: itemRefs,
    });
  };

  return (
    <AlertModal
      style={{
        marginBottom: 320,
      }}
      title="Remove item"
      modalVis={removeItemModalVis}
      onConfirm={() => onConfirm()}
      onCancel={() => onCancel()}>
      <Text>Are sure you want to delete this item?</Text>
    </AlertModal>
  );
};

export default RemoveListItem;
