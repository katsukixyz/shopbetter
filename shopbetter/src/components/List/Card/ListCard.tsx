import React, {useCallback, useState, useEffect, memo} from 'react';
import {View, Text} from 'react-native';
import DraggableFlatList, {
  RenderItemParams,
} from 'react-native-draggable-flatlist';
import Animated, {AnimatedLayout} from 'react-native-reanimated';
import {TouchableOpacity} from 'react-native-gesture-handler';
import SwipeableItem, {UnderlayParams} from 'react-native-swipeable-item';
import CheckBox from '@react-native-community/checkbox';
import Separator from '../Separator/Separator';
import Buttons from './Buttons/Buttons';
import {ListPage, ListItem} from '../../../types/listTypes';
import {updateListItem} from '../../../services/list';
import {SQLiteDatabase} from 'react-native-sqlite-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import EditListName from '../Modals/EditListName';
import AddListItem from '../Modals/AddListItem';
import RemoveList from '../Modals/RemoveList';
import ListCardItem from './ListCardItem';
import EditItemName from '../Modals/EditItemName';
import RemoveListItem from '../Modals/RemoveListItem';

interface ListCardProps extends ListPage {
  db: SQLiteDatabase;
  pageIndex: number;
  shoppingData: ListPage[];
  setShoppingData: React.Dispatch<React.SetStateAction<ListPage[]>>;
}

const closeItemRefs = (itemRefs: Map<any, any>) => {
  [...itemRefs.entries()].forEach(([key, ref]) => {
    if (ref) {
      ref.close();
    }
  });
};

const ListCard: React.FC<ListCardProps> = ({
  db,
  name,
  items,
  pageIndex,
  shoppingData,
  setShoppingData,
}) => {
  const [removeListModalVis, setRemoveListModalVis] = useState(false);
  const [editListNameModalVis, setEditListNameModalVis] = useState(false);
  const [addItemModalVis, setAddItemModalVis] = useState(false);
  const [editItemNameModalVis, setEditItemNameModalVis] = useState<{
    visible: boolean;
    index: number;
    itemRefs: Map<any, any>;
  }>({visible: false, index: 0, itemRefs: new Map()});

  const [removeItemModalVis, setRemoveItemModalVis] = useState<{
    visible: boolean;
    index: number;
    itemRefs: Map<any, any>;
  }>({
    visible: false,
    index: 0,
    itemRefs: new Map(),
  });

  const itemRefs = new Map();

  return (
    <View
      style={{
        backgroundColor: 'white',
        // flex: 1,
        height: '100%',
        width: 350,
        // width: '100%',
        borderRadius: 12,
        padding: 10,
        marginLeft: 20,
        marginRight: 20,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingBottom: 8,
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: '#f8f4f4',
            padding: 5,
            borderRadius: 6,
          }}
          onPress={() => setEditListNameModalVis(true)}>
          <Text
            style={{
              fontWeight: '500',
              fontSize: 28,
              maxWidth: 260,
            }}>
            {name}
          </Text>
        </TouchableOpacity>
        <Buttons
          setAddItemModalVis={setAddItemModalVis}
          setRemoveListModalVis={setRemoveListModalVis}
        />
      </View>
      <DraggableFlatList
        style={{
          flexGrow: 0,
        }}
        containerStyle={{
          flex: 1,
          marginBottom: 25,
          maxHeight: items ? items.length * 42.7 : 0,
          //JANKY, VirtualizedList height cannot be controlled dynamically, especially if multiple are rendered at the same time like in a PageView
        }}
        onDragEnd={({data}) => {
          const changedShoppingData = [...shoppingData];
          changedShoppingData[pageIndex] = {
            ...shoppingData[pageIndex],
            items: data,
          };
          setShoppingData(changedShoppingData);
          updateListItem(db, shoppingData[pageIndex].id!, JSON.stringify(data));
        }}
        persistentScrollbar={true}
        ItemSeparatorComponent={Separator}
        data={items ? items : []}
        renderItem={ListCardItem({
          itemRefs,
          items,
          shoppingData,
          db,
          pageIndex,
          setShoppingData,
          setEditItemNameModalVis,
          setRemoveItemModalVis,
        })}
        keyExtractor={(item: ListItem, i: number) => {
          return 'draggable-item-' + i.toString();
        }}
      />
      <EditListName
        db={db}
        pageIndex={pageIndex}
        shoppingData={shoppingData}
        setShoppingData={setShoppingData}
        editListNameModalVis={editListNameModalVis}
        setEditListNameModalVis={setEditListNameModalVis}
      />
      <AddListItem
        db={db}
        shoppingData={shoppingData}
        pageIndex={pageIndex}
        setShoppingData={setShoppingData}
        addItemModalVis={addItemModalVis}
        setAddItemModalVis={setAddItemModalVis}
      />
      <RemoveListItem
        db={db}
        shoppingData={shoppingData}
        pageIndex={pageIndex}
        setShoppingData={setShoppingData}
        itemRefs={removeItemModalVis.itemRefs}
        listIndex={removeItemModalVis.index}
        removeItemModalVis={removeItemModalVis.visible}
        setRemoveItemModalVis={setRemoveItemModalVis}
      />
      <EditItemName
        db={db}
        shoppingData={shoppingData}
        setShoppingData={setShoppingData}
        itemRefs={editItemNameModalVis.itemRefs}
        listIndex={editItemNameModalVis.index}
        pageIndex={pageIndex}
        editItemNameModalVis={editItemNameModalVis.visible}
        setEditItemNameModalVis={setEditItemNameModalVis}
      />
      <RemoveList
        db={db}
        shoppingData={shoppingData}
        pageIndex={pageIndex}
        setShoppingData={setShoppingData}
        removeListModalVis={removeListModalVis}
        setRemoveListModalVis={setRemoveListModalVis}
      />
    </View>
  );
};

export {closeItemRefs};
export default ListCard;
