import React, {useState, useEffect} from 'react';
import {Alert, View, Text, Modal} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import PageHeader from '../components/PageHeader/PageHeader';
import PagerView from 'react-native-pager-view';
import Card, {ListObject} from '../components/List/Card/ListCard';
import {openDatabase, SQLiteDatabase} from 'react-native-sqlite-storage';
import ComposeButton from '../components/List/ComposeButton/ComposeButton';
import {
  deleteTable,
  createTable,
  getTableData,
} from '../services/initTransactions';
import AddList from '../components/List/Modals/AddList';
import {addList, editListName} from '../services/list';
import EditListName from '../components/List/Modals/EditListName';

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
  const [currentList, setCurrentList] = useState<ListObject>({
    id: 0,
    name: '',
    items: '[]',
  });
  const [editListNameModalVis, setEditListNameModalVis] = useState(false);
  const [addListModalVis, setAddListModalVis] = useState(false);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
      }}>
      <PageHeader>Lists</PageHeader>
      <PagerView
        style={{flex: 1}}
        initialPage={0}
        pageMargin={20}
        overdrag
        onPageSelected={e =>
          setCurrentList(shoppingData[e.nativeEvent.position])
        }
        showPageIndicator>
        {shoppingData ? (
          shoppingData.map((e: ListObject, i: number) => {
            return (
              <Card
                key={e.id}
                setEditListNameModalVis={setEditListNameModalVis}
                {...e}
              />
            );
          })
        ) : (
          <View></View>
        )}
      </PagerView>
      <AddList
        db={shoppingDB}
        setShoppingData={setShoppingData}
        addListModalVis={addListModalVis}
        setAddListModalVis={setAddListModalVis}
      />
      <EditListName
        db={shoppingDB}
        currentList={currentList}
        setShoppingData={setShoppingData}
        editListNameModalVis={editListNameModalVis}
        setEditListNameModalVis={setEditListNameModalVis}
      />

      <ComposeButton setAddListModalVis={setAddListModalVis} />
    </SafeAreaView>
  );
};

//! https://github.com/callstack/react-native-pager-view/pull/379

export default List;
