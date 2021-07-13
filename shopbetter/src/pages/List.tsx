import React, {useState, useEffect, useRef, useCallback, useMemo} from 'react';
import {View, Animated} from 'react-native';
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
import {FlatList} from 'react-native-gesture-handler';
import {ScalingDot, SlidingBorder} from 'react-native-animated-pagination-dots';

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
  const [addListModalVis, setAddListModalVis] = useState(false);
  const scrollX = useRef(new Animated.Value(0)).current;

  const memoizedRenderItem = useCallback(() => renderItem, [shoppingData]);

  const renderItem = ({item, index}: {item: ListPage; index: number}) => (
    <ListCard
      key={item.id}
      pageIndex={index}
      name={item.name}
      items={item.items}
      db={shoppingDB}
      shoppingData={shoppingData}
      setShoppingData={setShoppingData}
    />
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
        // paddingLeft: 10,
        // paddingRight: 10,
        paddingTop: 10,
      }}>
      <PageHeader style={{paddingLeft: 20}}>Lists</PageHeader>
      {shoppingData ? (
        shoppingData.length > 0 ? (
          <View style={{flex: 1}}>
            <FlatList
              style={{width: 390}}
              horizontal
              showsHorizontalScrollIndicator={false}
              data={shoppingData}
              onScroll={Animated.event(
                [{nativeEvent: {contentOffset: {x: scrollX}}}],
                {useNativeDriver: false},
              )}
              decelerationRate="fast"
              pagingEnabled
              renderItem={memoizedRenderItem()}
              // renderItem={renderItem}
            />
            <ScalingDot
              activeDotColor="black"
              activeDotScale={1.3}
              inActiveDotColor="black"
              inActiveDotOpacity={0.2}
              data={shoppingData}
              scrollX={scrollX}
            />
          </View>
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
