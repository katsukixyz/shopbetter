import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, Modal} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import PageHeader from '../components/PageHeader/PageHeader';
import Card from '../components/Compare/Card/CompareCard';
import {ScrollView} from 'react-native-gesture-handler';
import {Picker} from '@react-native-picker/picker';
import AddButton from '../components/Compare/AddButton/AddButton';
import Filter from '../components/Compare/Filter/Filter';
import SQLite, {openDatabase} from 'react-native-sqlite-storage';
import {createTable, getTableData} from '../services/initTransactions';
import {addList} from '../services/list';

interface CompareProps {
  comparisonData: any;
  setComparisonData: React.Dispatch<React.SetStateAction<any>>;
}

const Compare: React.FC<CompareProps> = ({
  comparisonData,
  setComparisonData,
}) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
      }}>
      <PageHeader>Compare</PageHeader>
      <Filter />
      <FlatList
        contentContainerStyle={{paddingBottom: 50}}
        data={comparisonData}
        renderItem={e => <Card item={e.item} />}
        keyExtractor={item => item.name}
      />
      <AddButton />
    </SafeAreaView>
  );
};

export default Compare;
