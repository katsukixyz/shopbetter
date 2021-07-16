import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, Modal} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import PageHeader from '../components/PageHeader/PageHeader';
import {ScrollView} from 'react-native-gesture-handler';
import {Picker} from '@react-native-picker/picker';
import AddButton from '../components/Compare/AddButton/AddButton';
import Filter from '../components/Compare/Filter/Filter';
import SQLite, {
  openDatabase,
  SQLiteDatabase,
} from 'react-native-sqlite-storage';
import {addList} from '../services/list';
import {Comparison} from '../types/compareTypes';
import AddComparison from '../components/Compare/Modals/AddComparison';
import CompareCard from '../components/Compare/CompareCard/CompareCard';
import EditComparison from '../components/Compare/Modals/EditComparison';

interface CompareProps {
  comparisonDB: SQLiteDatabase;
  comparisonData: Comparison[];
  setComparisonData: React.Dispatch<React.SetStateAction<Comparison[]>>;
}

const Compare: React.FC<CompareProps> = ({
  comparisonDB,
  comparisonData,
  setComparisonData,
}) => {
  const [addComparisonModalVis, setAddComparisonModalVis] = useState(false);
  const [editComparisonModalVis, setEditComparisonModalVis] = useState({
    index: 0,
    visible: false,
  });

  const itemRefs = new Map();

  const renderItem = ({item, index}: {item: Comparison; index: number}) => (
    <CompareCard
      item={item}
      itemRefs={itemRefs}
      index={index}
      setEditComparisonModalVis={setEditComparisonModalVis}
    />
  );

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
        renderItem={renderItem}
        keyExtractor={item => item.name}
      />
      <AddButton setAddComparisonModalVis={setAddComparisonModalVis} />
      <AddComparison
        db={comparisonDB}
        setComparisonData={setComparisonData}
        addComparisonModalVis={addComparisonModalVis}
        setAddComparisonModalVis={setAddComparisonModalVis}
      />
      <EditComparison
        db={comparisonDB}
        comparisonData={comparisonData}
        setComparisonData={setComparisonData}
        editComparisonModalVis={editComparisonModalVis.visible}
        itemRefs={itemRefs}
        index={editComparisonModalVis.index}
        setEditComparisonModalVis={setEditComparisonModalVis}
      />
    </SafeAreaView>
  );
};

export default Compare;
