import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, Modal} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import PageHeader from '../components/PageHeader/PageHeader';
import Card from '../components/Compare/Card/CompareCard';
import {ScrollView} from 'react-native-gesture-handler';
import {Picker} from '@react-native-picker/picker';
import AddButton from '../components/Compare/AddButton/AddButton';
import Filter from '../components/Compare/Filter/Filter';

const Compare: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const testData = [
    {
      name: 'Potatoes',
    },
    {
      name: 'Tomatoes',
    },
    {
      name: 'Eggs',
    },
    {
      name: 'Egg',
    },
    {
      name: 'Eg',
    },
    {
      name: 'Eggs!',
    },
    {
      name: 'Egg!!!!',
    },
    {
      name: 'Egjoeeojoeo',
    },
    {
      name: 'Egs!',
    },
  ];
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
        data={testData}
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
