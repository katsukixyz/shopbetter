import React, {useState, useEffect, useRef, useCallback, useMemo} from 'react';
import {
  Alert,
  View,
  Text,
  Modal,
  VirtualizedList,
  ListRenderItem,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import PageHeader from '../components/PageHeader/PageHeader';
import PagerView from 'react-native-pager-view';
import ListCard from '../components/List/Card/ListCard';
import {SQLiteDatabase} from 'react-native-sqlite-storage';
import ComposeButton from '../components/List/ComposeButton/ComposeButton';
import AddList from '../components/List/Modals/AddList';
import {addList, editListName} from '../services/list';
import EditListName from '../components/List/Modals/EditListName';
import {ListPage, ListItem} from '../types/listTypes';
import AddListItem from '../components/List/Modals/AddListItem';
import RemoveList from '../components/List/Modals/RemoveList';
import {FlatList} from 'react-native-gesture-handler';
import {RenderItemParams} from 'react-native-draggable-flatlist';

interface ListProps {
  shoppingDB: SQLiteDatabase;
  shoppingData: any;
  setShoppingData: React.Dispatch<React.SetStateAction<any>>;
}

const List: React.FC<ListProps> = ({
  shoppingDB,
  shoppingData,
  setShoppingData,
}) => {
  // const [currentPageIndex, setCurrentPageIndex] = useState(0); //used only for modals
  const [addListModalVis, setAddListModalVis] = useState(false);

  const pagerView = useRef<PagerView>();

  // useMemo(() => {
  //   console.log('changed to ', currentPageIndex);
  //   pagerView.current?.setPageWithoutAnimation(currentPageIndex);
  // }, [shoppingData, currentPageIndex]);

  // const onViewableItemsChanged = useCallback(({viewableItems, changed}) => {
  //   console.log('Visible items are', viewableItems);
  //   console.log('Changed in this iteration', changed);
  // }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
      }}>
      <PageHeader>Lists</PageHeader>
      {shoppingData ? (
        shoppingData.length > 0 ? (
          <FlatList
            style={{flex: 1}}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={shoppingData}
            snapToInterval={370}
            getItemLayout={(data, index) => ({
              length: 370,
              offset: 370 * index,
              index,
            })}
            decelerationRate="fast"
            ItemSeparatorComponent={() => <View style={{margin: 10}} />}
            renderItem={({item, index}: {item: ListPage; index: number}) => {
              return (
                <ListCard
                  key={item.id}
                  pageIndex={index}
                  name={item.name}
                  items={item.items}
                  db={shoppingDB}
                  // currentPageIndex={index}
                  shoppingData={shoppingData}
                  setShoppingData={setShoppingData}
                  // removeListModalVis={removeListModalVis}
                  // setRemoveListModalVis={setRemoveListModalVis}
                  // editListNameModalVis={editListNameModalVis}
                  // setEditListNameModalVis={setEditListNameModalVis}
                  // addItemModalVis={addItemModalVis}
                  // setAddItemModalVis={setAddItemModalVis}
                />
              );
            }}
            // keyExtractor={(item, index) => {
            //   return item.id;
            // }}
          />
        ) : (
          <View></View>
        )
      ) : (
        <View></View>
      )}
      <AddList
        db={shoppingDB}
        setShoppingData={setShoppingData}
        addListModalVis={addListModalVis}
        setAddListModalVis={setAddListModalVis}
      />

      <ComposeButton setAddListModalVis={setAddListModalVis} />
    </SafeAreaView>
  );
};

//! https://github.com/callstack/react-native-pager-view/pull/379

export default List;

// <PagerView ref={ref => (pagerView.current = ref!)}
//   style={{flex: 1}}
//   initialPage={0}
//   pageMargin={20}
//   overdrag
//   onPageSelected={e => {
//     setCurrentPageIndex(e.nativeEvent.position);
//   }}
//   showPageIndicator>
//   {shoppingData.map((e: ListPage, i: number) => {
//     return (
//       <Card
//         key={e.id}
//         name={e.name}
//         items={e.items}
//         db={shoppingDB}
//         currentPageIndex={i}
//         shoppingData={shoppingData}
//         setShoppingData={setShoppingData}
//         setRemoveListModalVis={setRemoveListModalVis}
//         setEditListNameModalVis={setEditListNameModalVis}
//         setAddItemModalVis={setAddItemModalVis}
//       />
//     );
//   })}
// </PagerView>
