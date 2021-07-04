import React from 'react';
import {View, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import PageHeader from '../components/PageHeader/PageHeader';

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
    </SafeAreaView>
  );
};

//! pageview (?), each page has one rectangular "sheet" with rounded corners, items split by separators

export default List;
