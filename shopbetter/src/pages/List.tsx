import React, {useState, useEffect} from 'react';
import {Alert, View, Text, Modal} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import PageHeader from '../components/PageHeader/PageHeader';
import PagerView from 'react-native-pager-view';
import Card from '../components/List/Card/ListCard';
import {SQLiteDatabase} from 'react-native-sqlite-storage';
import ComposeButton from '../components/List/ComposeButton/ComposeButton';
import AddList from '../components/List/Modals/AddList';
import {addList, editListName} from '../services/list';
import EditListName from '../components/List/Modals/EditListName';
import {ListPage} from '../types/listTypes';
import AddListItem from '../components/List/Modals/AddListItem';

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
  const [currentPageIndex, setCurrentPageIndex] = useState(0); //used only for modals
  const [addListModalVis, setAddListModalVis] = useState(false);
  const [editListNameModalVis, setEditListNameModalVis] = useState(false);
  const [addItemModalVis, setAddItemModalVis] = useState(false);

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
          <PagerView
            style={{flex: 1}}
            initialPage={0}
            pageMargin={20}
            overdrag
            onPageSelected={e => {
              console.log('pageSelect', e.nativeEvent.position);
              setCurrentPageIndex(e.nativeEvent.position);
            }}
            showPageIndicator>
            {shoppingData.map((e: ListPage, i: number) => {
              return (
                <Card
                  key={e.id}
                  name={e.name}
                  items={e.items}
                  db={shoppingDB}
                  currentPageIndex={i}
                  shoppingData={shoppingData}
                  setShoppingData={setShoppingData}
                  setEditListNameModalVis={setEditListNameModalVis}
                  setAddItemModalVis={setAddItemModalVis}
                />
              );
            })}
          </PagerView>
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
      <EditListName
        db={shoppingDB}
        currentList={shoppingData[currentPageIndex]}
        setShoppingData={setShoppingData}
        editListNameModalVis={editListNameModalVis}
        setEditListNameModalVis={setEditListNameModalVis}
      />
      <AddListItem
        db={shoppingDB}
        currentList={shoppingData[currentPageIndex]}
        setShoppingData={setShoppingData}
        addItemModalVis={addItemModalVis}
        setAddItemModalVis={setAddItemModalVis}
      />

      <ComposeButton setAddListModalVis={setAddListModalVis} />
    </SafeAreaView>
  );
};

//! https://github.com/callstack/react-native-pager-view/pull/379

export default List;
