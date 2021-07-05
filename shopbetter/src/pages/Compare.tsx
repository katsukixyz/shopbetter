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
import {createTable, getTableData} from '../services/sqliteTransactions';

const comparisonDB = openDatabase(
  {
    name: 'comparison_db.db',
    location: 'Documents',
  },
  () => console.log('Opened comparison db.'),
  () => console.log('Error occurred.'),
);

const Compare: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [comparisonData, setComparisonData] = useState<any>();

  useEffect(() => {
    createTable(comparisonDB, 'comparison').then(() => {
      getTableData(comparisonDB, 'comparison').then(data => {
        console.log(data);
        setComparisonData(data);
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
      <PageHeader>Compare</PageHeader>
      <Filter />
      {/* <Modal
        presentationStyle="overFullScreen"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View
        style={{
          margin: 20,
          backgroundColor: 'white',
          borderRadius: 20,
          padding: 35,
          alignItems: 'center',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 4,
          elevation: 5,
        }}
        >
          <Text>Joe</Text>
        </View>
      </Modal> */}
      <FlatList
        contentContainerStyle={{paddingBottom: 50}}
        data={comparisonData}
        renderItem={e => (
          <Card item={e.item} setModalVisible={setModalVisible} />
        )}
        keyExtractor={item => item.name}
      />
      <AddButton />
    </SafeAreaView>
  );
};

export default Compare;
