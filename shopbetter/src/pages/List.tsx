import React from 'react';
import {View, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import PageHeader from '../components/PageHeader/PageHeader';
import PagerView from 'react-native-pager-view';
import Card from '../components/List/Card/ListCard';

const List: React.FC = () => {
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
        {['1', '2'].map((e, i) => {
          return <Card key={i} />;
        })}
      </PagerView>
    </SafeAreaView>
  );
};

//! https://github.com/callstack/react-native-pager-view/pull/379

export default List;
