import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import List from './src/pages/List';
import Compare from './src/pages/Compare';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createTable, deleteTable} from './src/services/initTransactions';
import {openDatabase} from 'react-native-sqlite-storage';
import {ListPage} from './src/types/listTypes';
import {Comparison} from './src/types/compareTypes';
import {getListData} from './src/services/list';
import {getComparisonData} from './src/services/compare';

const Tab = createBottomTabNavigator();

const comparisonDB = openDatabase(
  {
    name: 'comparison_db',
    location: 'default',
    // location: 'Documents',
  },
  () => console.log('Opened comparison db.'),
  () => console.log('Error occurred.'),
);

const shoppingDB = openDatabase(
  {
    name: 'shopping_db',
    location: 'default',
    // location: 'Documents',
  },
  () => console.log('Opened shopping db.'),
  () => console.log('Error occurred'),
);
const App = () => {
  const [comparisonData, setComparisonData] = useState<Comparison[]>([]);
  const [shoppingData, setShoppingData] = useState<ListPage[]>([]);

  useEffect(() => {
    // deleteTable(comparisonDB, 'comparison');
    // deleteTable(shoppingDB, 'shopping');
    createTable(comparisonDB, 'comparison');
    createTable(shoppingDB, 'shopping');
    getListData(shoppingDB).then((data: ListPage[]) => {
      setShoppingData(data);
    });
    getComparisonData(comparisonDB).then((data: Comparison[]) => {
      setComparisonData(data);
    });
  }, []);

  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <Tab.Navigator
          tabBarOptions={{
            activeTintColor: 'black',
            showLabel: false,
          }}>
          <Tab.Screen
            name="Compare"
            options={{
              tabBarIcon: ({color, size}) => (
                <MaterialCommunityIcons
                  name="compare-horizontal"
                  size={24}
                  color={color}
                />
              ),
            }}>
            {props => (
              <Compare
                {...props}
                comparisonDB={comparisonDB}
                comparisonData={comparisonData}
                setComparisonData={setComparisonData}
              />
            )}
          </Tab.Screen>
          <Tab.Screen
            name="List"
            options={{
              tabBarIcon: ({color, size}) => (
                <MaterialCommunityIcons
                  name="format-list-bulleted"
                  size={24}
                  color={color}
                />
              ),
            }}>
            {props => (
              <List
                {...props}
                shoppingDB={shoppingDB}
                shoppingData={shoppingData}
                setShoppingData={setShoppingData}
              />
            )}
          </Tab.Screen>
        </Tab.Navigator>
      </SafeAreaProvider>
    </NavigationContainer>
  );
};

export default App;
