import React, {useCallback} from 'react';
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

interface ListCardProps extends ListPage {
  db: SQLiteDatabase;
  currentPageIndex: number;
  shoppingData: any;
  setShoppingData: React.Dispatch<React.SetStateAction<any>>;
  setEditListNameModalVis: React.Dispatch<React.SetStateAction<boolean>>;
  setAddItemModalVis: React.Dispatch<React.SetStateAction<boolean>>;
}

const Card: React.FC<ListCardProps> = ({
  db,
  name,
  items,
  currentPageIndex,
  shoppingData,
  setShoppingData,
  setEditListNameModalVis,
  setAddItemModalVis,
}) => {
  const currentList = shoppingData[currentPageIndex];
  const itemRefs = new Map();

  const renderUnderlayLeft = ({
    item,
    percentOpen,
  }: UnderlayParams<ListItem>) => (
    <Animated.View
      style={{
        flex: 1,
        justifyContent: 'flex-end',
        flexDirection: 'row',
        alignItems: 'center',
        opacity: percentOpen,
        // Fade in on open
      }}>
      <View
        style={{
          flexDirection: 'row',
          width: 60,
          justifyContent: 'space-between',
        }}>
        <Ionicons name="create-outline" color="#007aff" size={22} />
        <Ionicons name="trash-outline" color="#ff3b30" size={22} />
      </View>
    </Animated.View>
  );

  const renderItem = useCallback(
    ({item, index, drag}: RenderItemParams<ListItem>) => {
      return (
        <SwipeableItem
          key={index}
          item={item}
          ref={ref => {
            if (ref && !itemRefs.get(index)) {
              itemRefs.set(index, ref);
            }
          }}
          onChange={({open}) => {
            if (open) {
              [...itemRefs.entries()].forEach(([key, ref]) => {
                if (key !== index && ref) {
                  ref.close();
                }
              });
            }
          }}
          overSwipe={10}
          snapPointsLeft={[30]}
          renderUnderlayLeft={renderUnderlayLeft}>
          <TouchableOpacity onLongPress={drag}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <CheckBox
                boxType="square"
                style={{height: 16, marginLeft: 5}}
                animationDuration={0.05}
                lineWidth={1.5}
                value={item.checkVal}
                onValueChange={newValue => {
                  const changedItems = [...JSON.parse(currentList.items)];
                  changedItems[index!] = {
                    checkVal: newValue,
                    name: item.name,
                  };
                  const changedShoppingData = [...shoppingData];
                  changedShoppingData[currentPageIndex] = {
                    ...currentList,
                    items: JSON.stringify(changedItems),
                  };
                  setShoppingData(changedShoppingData);
                  updateListItem(
                    db,
                    currentList.id!,
                    JSON.stringify(changedItems),
                  );
                }}
              />
              <Text
                adjustsFontSizeToFit
                ellipsizeMode="tail"
                numberOfLines={1}
                minimumFontScale={0.01}
                // selectable // incompatible with long-hold drag
                style={{
                  maxWidth: 330,
                  fontSize: 18,
                  paddingTop: 10,
                  paddingBottom: 10,
                }}>
                {item.name}
              </Text>
            </View>
          </TouchableOpacity>
        </SwipeableItem>
      );
    },
    [],
  );
  return (
    <View
      style={{
        backgroundColor: 'white',
        height: '100%',
        width: '100%',
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
        <Buttons setAddItemModalVis={setAddItemModalVis} />
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
          changedShoppingData[currentPageIndex] = {
            ...currentList,
            items: JSON.stringify(data),
          };
          setShoppingData(changedShoppingData);
          updateListItem(db, currentList.id!, JSON.stringify(data));
        }}
        persistentScrollbar={true}
        ItemSeparatorComponent={Separator}
        data={items ? JSON.parse(items) : []}
        renderItem={renderItem}
        keyExtractor={(item: ListItem, i: number) => {
          return 'draggable-item-' + i.toString();
        }}
      />
    </View>
  );
};

export default Card;
