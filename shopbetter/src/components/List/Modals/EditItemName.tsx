import React, {useState, useEffect} from 'react';
import AlertModal from '../../AlertModal/AlertModal';
import {TextInput} from 'react-native-gesture-handler';
import {SQLiteDatabase} from 'react-native-sqlite-storage';
import {updateListItem} from '../../../services/list';
import {closeItemRefs} from '../Card/ListCard';
import {ListPage} from '../../../types/listTypes';

interface EditItemNameProps {
  db: SQLiteDatabase;
  listIndex: number;
  pageIndex: number;
  itemRefs: Map<any, any>;
  shoppingData: ListPage[];
  setShoppingData: React.Dispatch<React.SetStateAction<ListPage[]>>;
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
  listIndex,
  pageIndex,
  itemRefs,
  shoppingData,
  setShoppingData,
  editItemNameModalVis,
  setEditItemNameModalVis,
}) => {
  const currentList = shoppingData[pageIndex];

  const [nameInput, setNameInput] = useState('');

  useEffect(() => {
    if (currentList.items) {
      if (currentList.items.length > 0) {
        setNameInput(currentList.items[listIndex].name);
      }
    }
  }, [currentList, listIndex]);

  const onConfirm = () => {
    const currentItems = currentList.items;
    if (nameInput !== currentItems[listIndex].name) {
      const updatedItems = [...currentItems];
      updatedItems[listIndex].name = nameInput;

      const updatedShoppingData = [...shoppingData];
      updatedShoppingData[pageIndex].items = updatedItems;
      setShoppingData(updatedShoppingData);

      updateListItem(db, currentList.id!, JSON.stringify(updatedItems));
    }
    closeItemRefs(itemRefs);
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
        placeholderTextColor="#909090"
        value={nameInput}
        onChangeText={setNameInput}
      />
    </AlertModal>
  );
};

export default EditItemName;
