import React, {useCallback, SetStateAction} from 'react';
import {View, Text, Animated} from 'react-native';
import {RenderItemParams} from 'react-native-draggable-flatlist';
import {TouchableOpacity} from 'react-native-gesture-handler';
import CheckBox from '@react-native-community/checkbox';
import {ListItem, ListPage} from '../../../types/listTypes';
import {updateListItem} from '../../../services/list';
import {SQLiteDatabase} from 'react-native-sqlite-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Swipeable from 'react-native-gesture-handler/Swipeable';

interface ListCardItemProps {
  db: SQLiteDatabase;
  pageIndex: number;
  itemRefs: Map<any, any>;
  items: ListItem[];
  shoppingData: ListPage[];
  setShoppingData: React.Dispatch<SetStateAction<ListPage[]>>;
  setEditItemNameModalVis: React.Dispatch<
    SetStateAction<{visible: boolean; index: number; itemRefs: Map<any, any>}>
  >;
  setRemoveItemModalVis: React.Dispatch<
    SetStateAction<{visible: boolean; index: number; itemRefs: Map<any, any>}>
  >;
}

const ListCardItem = ({
  itemRefs,
  items,
  shoppingData,
  db,
  pageIndex,
  setShoppingData,
  setEditItemNameModalVis,
  setRemoveItemModalVis,
}: ListCardItemProps) => {
  const renderRightActions = (
    progress: Animated.AnimatedInterpolation,
    _dragAnimatedValue: Animated.AnimatedInterpolation,
    index: number,
  ) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [60, 0],
    });

    return (
      <View
        style={{
          width: 60,
        }}>
        <Animated.View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            transform: [{translateX: trans}],
          }}>
          <Ionicons
            name="create-outline"
            color="#007aff"
            size={22}
            onPress={() => {
              setEditItemNameModalVis({
                visible: true,
                index: index,
                itemRefs: itemRefs,
              });
            }}
          />
          <Ionicons
            name="trash-outline"
            color="#ff3b30"
            size={22}
            onPress={() => {
              setRemoveItemModalVis({
                visible: true,
                index: index,
                itemRefs: itemRefs,
              });
            }}
          />
        </Animated.View>
      </View>
    );
  };

  return useCallback(
    ({item, index, drag}: RenderItemParams<ListItem>) => {
      return (
        <Swipeable
          key={index}
          ref={ref => {
            if (ref && !itemRefs.get(index)) {
              itemRefs.set(index, ref);
            }
          }}
          onSwipeableWillOpen={() => {
            [...itemRefs.entries()].forEach(([key, ref]) => {
              if (key !== index && ref) {
                ref.close();
              }
            });
          }}
          renderRightActions={(progress, drag) =>
            renderRightActions(progress, drag, index!)
          }
          rightThreshold={70}>
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
                animationDuration={0.000000000001}
                onAnimationType="fade"
                offAnimationType="fade"
                lineWidth={1.5}
                value={item.checkVal}
                onValueChange={newValue => {
                  const changedItems = [...items];
                  changedItems[index!] = {
                    checkVal: newValue,
                    name: item.name,
                  };
                  const changedShoppingData = [...shoppingData];
                  changedShoppingData[pageIndex] = {
                    ...shoppingData[pageIndex],
                    items: changedItems,
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
                  flex: 1,
                  maxWidth: 330,
                  fontSize: 18,
                  paddingTop: 10,
                  paddingBottom: 10,
                }}>
                {item.name}
              </Text>
            </View>
          </TouchableOpacity>
        </Swipeable>
      );
    },
    [shoppingData, pageIndex, items],
  );
};

export default ListCardItem;
