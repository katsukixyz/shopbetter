import React from 'react';
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

const Tab = createBottomTabNavigator();

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <Tab.Navigator
          tabBarOptions={{
            // activeTintColor: '#211d58',
            activeTintColor: 'black',
            showLabel: false,
          }}>
          <Tab.Screen
            name="Compare"
            component={Compare}
            options={{
              tabBarIcon: ({color, size}) => (
                <MaterialCommunityIcons
                  name="compare-horizontal"
                  size={24}
                  color={color}
                />
              ),
            }}
          />
          <Tab.Screen
            name="List"
            component={List}
            options={{
              tabBarIcon: ({color, size}) => (
                <MaterialCommunityIcons
                  name="format-list-bulleted"
                  size={24}
                  color={color}
                />
              ),
            }}
          />
        </Tab.Navigator>
      </SafeAreaProvider>
    </NavigationContainer>
  );
};

export default App;
