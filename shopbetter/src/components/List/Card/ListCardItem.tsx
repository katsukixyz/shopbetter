import React, {useCallback, SetStateAction} from 'react';
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

interface ListCardItemProps {
  items: string;
  shoppingData: any;
  setShoppingData: React.Dispatch<SetStateAction<any>>;
  db: SQLiteDatabase;
  pageIndex: number;
}

const ListCardItem = ({
  items,
  shoppingData,
  db,
  pageIndex,
  setShoppingData,
}: ListCardItemProps) => {
  const itemRefs = new Map();

  const renderUnderlayLeft = ({percentOpen}: UnderlayParams<ListItem>) => (
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

  return useCallback(
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
          <TouchableOpacity
            onLongPress={() => {
              [...itemRefs.entries()].forEach(([key, ref]) => {
                if (ref) {
                  ref.close();
                }
              });
              return drag();
            }}>
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
                  const changedItems = [...JSON.parse(items)];
                  changedItems[index!] = {
                    checkVal: newValue,
                    name: item.name,
                  };
                  // console.log(item, index, newValue);
                  // console.log(changedItems);
                  const changedShoppingData = [...shoppingData];
                  changedShoppingData[pageIndex] = {
                    ...shoppingData[pageIndex],
                    items: JSON.stringify(changedItems),
                  };
                  setShoppingData(changedShoppingData);
                  updateListItem(
                    db,
                    shoppingData[pageIndex].id!,
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
    [shoppingData, pageIndex, items],
  );
};

export default ListCardItem;
