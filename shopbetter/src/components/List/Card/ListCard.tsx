import React, {useCallback, useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import DraggableFlatList, {
  RenderItemParams,
} from 'react-native-draggable-flatlist';
import Animated from 'react-native-reanimated';
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
import {getTableData} from '../../../services/initTransactions';
import ListCardItem from './ListCardItem';

interface ListCardProps extends ListPage {
  db: SQLiteDatabase;
  pageIndex: number;
  shoppingData: any;
  setShoppingData: React.Dispatch<React.SetStateAction<any>>;
}

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
          marginBottom: 20,
          maxHeight: JSON.parse(items).length * 42.7,
          //JANKY, VirtualizedList height cannot be controlled dynamically, especially if multiple are rendered at the same time like in a PageView
        }}
        onDragEnd={({data}) => {
          const changedShoppingData = [...shoppingData];
          changedShoppingData[pageIndex] = {
            ...shoppingData[pageIndex],
            items: JSON.stringify(data),
          };
          setShoppingData(changedShoppingData);
          updateListItem(db, shoppingData[pageIndex].id!, JSON.stringify(data));
        }}
        persistentScrollbar={true}
        ItemSeparatorComponent={Separator}
        data={items ? JSON.parse(items) : []}
        renderItem={ListCardItem({
          items,
          shoppingData,
          db,
          pageIndex,
          setShoppingData,
        })}
        keyExtractor={(item: ListItem, i: number) => {
          return 'draggable-item-' + i.toString();
        }}
      />
      <EditListName
        db={db}
        currentList={shoppingData[pageIndex]}
        setShoppingData={setShoppingData}
        editListNameModalVis={editListNameModalVis}
        setEditListNameModalVis={setEditListNameModalVis}
      />
      <AddListItem
        db={db}
        currentList={shoppingData[pageIndex]}
        setShoppingData={setShoppingData}
        addItemModalVis={addItemModalVis}
        setAddItemModalVis={setAddItemModalVis}
      />
      <RemoveList
        db={db}
        currentPageIndex={pageIndex}
        shoppingData={shoppingData}
        setShoppingData={setShoppingData}
        removeListModalVis={removeListModalVis}
        setRemoveListModalVis={setRemoveListModalVis}
      />
    </View>
  );
};

export default ListCard;
