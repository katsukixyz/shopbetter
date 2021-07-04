import React, {useCallback} from 'react';
import {View, Text} from 'react-native';
import DraggableFlatList, {
  RenderItemParams,
} from 'react-native-draggable-flatlist';
import {TouchableOpacity} from 'react-native-gesture-handler';
import CheckBox from '@react-native-community/checkbox';
import Separator from '../Separator/Separator';

const Card: React.FC = () => {
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
      name: 'joe!',
    },
    {
      name: 'japon!!!!',
    },
    {
      name: 'coronajapon!',
    },
    {
      name: 'https://coronanippon.com',
    },
    {
      name: 'go to da site!',
    },
  ];

  return (
    <View
      style={{
        backgroundColor: 'white',
        height: '100%',
        width: '100%',
        borderRadius: 12,
        padding: 10,
      }}>
      <Text
        style={{
          fontWeight: '500',
          fontSize: 28,
          paddingBottom: 8,
        }}>
        Store Name
      </Text>
      <DraggableFlatList
        style={{
          marginBottom: 20,
        }}
        data={testData}
        // debug
        renderItem={e => (
          <View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <CheckBox
                boxType="square"
                style={{height: 16, marginLeft: 5}}
                animationDuration={0.25}
                lineWidth={1.5}
                disabled={false}
                value={false}
                onValueChange={newValue => console.log(newValue)}
              />
              <Text style={{fontSize: 18, paddingTop: 10, paddingBottom: 10}}>
                {e.item.name}
              </Text>
            </View>
            <Separator />
          </View>
        )}
        keyExtractor={item => item.name}
        // keyExtractor={(item, index) => `draggable-item-${item.name}`}
      />
    </View>
  );
};

export default Card;
