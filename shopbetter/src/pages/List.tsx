import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import PageHeader from '../components/PageHeader/PageHeader';
import PagerView from 'react-native-pager-view';
import Card from '../components/List/Card/ListCard';
import {openDatabase} from 'react-native-sqlite-storage';
import ComposeButton from '../components/List/ComposeButton/ComposeButton';
import {createTable, getTableData} from '../services/sqliteTransactions';

const shoppingDB = openDatabase(
  {
    name: 'shopping_db.db',
    location: 'Documents',
  },
  () => console.log('Opened shopping db.'),
  () => console.log('Error occurred'),
);

const List: React.FC = () => {
  const [shoppingData, setShoppingData] = useState<any>();

  useEffect(() => {
    createTable(shoppingDB, 'shopping').then(() => {
      getTableData(shoppingDB, 'shopping').then(data => {
        console.log(data);
        setShoppingData(data);
      });
    });
  }, []);

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
        showPageIndicator>
        {shoppingData
          ? shoppingData.map((e: any, i: number) => {
              return <Card key={i} />;
            })
          : null}
      </PagerView>
      <ComposeButton />
    </SafeAreaView>
  );
};

//! https://github.com/callstack/react-native-pager-view/pull/379

export default List;
