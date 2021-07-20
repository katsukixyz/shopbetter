import React, {useState, useEffect, useMemo} from 'react';
import {View, Text, FlatList, Modal} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import PageHeader from '../components/PageHeader/PageHeader';
import {ScrollView} from 'react-native-gesture-handler';
import {Picker} from '@react-native-picker/picker';
import AddButton from '../components/Compare/AddButton/AddButton';
import FilterButton from '../components/Compare/FilterButton/FilterButton';
import SQLite, {
  openDatabase,
  SQLiteDatabase,
} from 'react-native-sqlite-storage';
import {addList} from '../services/list';
import {Comparison} from '../types/compareTypes';
import AddComparison from '../components/Compare/Modals/AddComparison';
import CompareCard from '../components/Compare/CompareCard/CompareCard';
import EditComparison from '../components/Compare/Modals/EditComparison';
import RemoveComparison from '../components/Compare/Modals/RemoveComparison';
import StorePicker from '../components/Compare/Modals/StorePicker';
import Filter from '../components/Compare/Modals/Filter';

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
  const [filteredComparisonData, setFilteredComparisonData] = useState<
    Comparison[]
  >([]);

  const [filterModalVis, setFilterModalVis] = useState(false);

  const [addComparisonModalVis, setAddComparisonModalVis] = useState(false);
  const [editComparisonModalVis, setEditComparisonModalVis] = useState({
    index: 0,
    visible: false,
  });
  const [removeComparisonModalVis, setRemoveComparisonModalVis] = useState({
    index: 0,
    visible: false,
  });

  const [storePickerModalVis, setStorePickerModalVis] = useState({
    index: 0,
    visible: false,
  });

  const itemRefs = new Map();

  const allStores = useMemo(() => {
    return comparisonData
      .filter(({store}) => store !== 'All')
      .reduce((acc, {store}) => {
        return acc.add(store);
      }, new Set<string>());
  }, [comparisonData]);

  const renderItem = ({item, index}: {item: Comparison; index: number}) => (
    <CompareCard
      item={item}
      itemRefs={itemRefs}
      index={index}
      setEditComparisonModalVis={setEditComparisonModalVis}
      setRemoveComparisonModalVis={setRemoveComparisonModalVis}
      setStorePickerModalVis={setStorePickerModalVis}
    />
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 20,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 10,
        }}>
        <PageHeader>Compare</PageHeader>
        <FilterButton
          setFilterModalVis={setFilterModalVis}
          itemRefs={itemRefs}
        />
      </View>
      <FlatList
        contentContainerStyle={{paddingBottom: 50}}
        data={filteredComparisonData}
        renderItem={renderItem}
        keyExtractor={(item, i) => i.toString()}
      />
      <AddButton setAddComparisonModalVis={setAddComparisonModalVis} />
      <Filter
        comparisonData={comparisonData}
        allStores={allStores}
        filterModalVis={filterModalVis}
        setFilterModalVis={setFilterModalVis}
        setFilteredComparisonData={setFilteredComparisonData}
      />
      <AddComparison
        db={comparisonDB}
        setComparisonData={setComparisonData}
        addComparisonModalVis={addComparisonModalVis}
        setAddComparisonModalVis={setAddComparisonModalVis}
      />
      <EditComparison
        db={comparisonDB}
        // comparisonData={comparisonData}
        comparisonData={filteredComparisonData}
        setComparisonData={setComparisonData}
        editComparisonModalVis={editComparisonModalVis.visible}
        itemRefs={itemRefs}
        index={editComparisonModalVis.index}
        setEditComparisonModalVis={setEditComparisonModalVis}
      />
      <RemoveComparison
        db={comparisonDB}
        // comparisonData={comparisonData}
        comparisonData={filteredComparisonData}
        setComparisonData={setComparisonData}
        index={removeComparisonModalVis.index}
        removeComparisonModalVis={removeComparisonModalVis.visible}
        setRemoveComparisonModalVis={setRemoveComparisonModalVis}
      />
      <StorePicker
        db={comparisonDB}
        // comparisonData={comparisonData}
        comparisonData={filteredComparisonData}
        setComparisonData={setComparisonData}
        allStores={allStores}
        index={storePickerModalVis.index}
        storePickerModalVis={storePickerModalVis.visible}
        setStorePickerModalVis={setStorePickerModalVis}
      />
    </SafeAreaView>
  );
};

export default Compare;
