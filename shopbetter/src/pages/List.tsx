import React, {useState, useRef, useCallback} from 'react';
import {View, Animated, useWindowDimensions} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import PageHeader from '../components/PageHeader/PageHeader';
import ListCard from '../components/List/Card/ListCard';
import {SQLiteDatabase} from 'react-native-sqlite-storage';
import ComposeButton from '../components/List/ComposeButton/ComposeButton';
import AddList from '../components/List/Modals/AddList';
import {ListPage} from '../types/listTypes';
import {FlatList} from 'react-native-gesture-handler';
import {ScalingDot} from 'react-native-animated-pagination-dots';
import LimitReached from '../components/List/Modals/LimitReached';

interface ListProps {
  shoppingDB: SQLiteDatabase;
  shoppingData: ListPage[];
  setShoppingData: React.Dispatch<React.SetStateAction<ListPage[]>>;
}

const List: React.FC<ListProps> = ({
  shoppingDB,
  shoppingData,
  setShoppingData,
}) => {
  const {width} = useWindowDimensions();
  const [addListModalVis, setAddListModalVis] = useState(false);
  const [limitReachedModalVis, setLimitReachedModalVis] = useState(false);

  const scrollX = useRef(new Animated.Value(0)).current;

  const memoizedRenderItem = useCallback(() => renderItem, [shoppingData]);

  const renderItem = ({item, index}: {item: ListPage; index: number}) => (
    <ListCard
      key={item.id}
      style={{width: width - 40}}
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
        paddingTop: 20,
      }}>
      <PageHeader style={{paddingLeft: 20, marginBottom: 10}}>Lists</PageHeader>
      {shoppingData ? (
        shoppingData.length > 0 ? (
          <View style={{flex: 1, marginBottom: 10}}>
            <FlatList
              style={{width: width}}
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
              // containerStyle={{paddingBottom: 30}}
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
      <LimitReached
        limitReachedModalVis={limitReachedModalVis}
        setLimitReachedModalVis={setLimitReachedModalVis}
      />

      <ComposeButton
        length={shoppingData.length}
        setLimitReachedModalVis={setLimitReachedModalVis}
        setAddListModalVis={setAddListModalVis}
      />
    </SafeAreaView>
  );
};

//! https://github.com/callstack/react-native-pager-view/pull/379

export default List;
