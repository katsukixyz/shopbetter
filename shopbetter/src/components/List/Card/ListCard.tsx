import React, {useCallback} from 'react';
import {View, Text} from 'react-native';
import DraggableFlatList, {
  RenderItemParams,
} from 'react-native-draggable-flatlist';
import {TouchableOpacity} from 'react-native-gesture-handler';
import SwipeableItem from 'react-native-swipeable-item';
import CheckBox from '@react-native-community/checkbox';
import Separator from '../Separator/Separator';
import Buttons from './Buttons/Buttons';

export interface ListObject {
  id?: number;
  name: string;
  items: string;
}

interface ListCardProps extends ListObject {
  setEditListNameModalVis: React.Dispatch<React.SetStateAction<boolean>>;
}

const Card: React.FC<ListCardProps> = ({
  name,
  items,
  setEditListNameModalVis,
}) => {
  return (
    <View
      style={{
        backgroundColor: 'white',
        height: '100%',
        width: '100%',
        borderRadius: 12,
        padding: 10,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingBottom: 8,
        }}>
        <Text
          onPress={() => setEditListNameModalVis(true)}
          style={{
            backgroundColor: 'red',
            fontWeight: '500',
            fontSize: 28,
            // paddingBottom: 8,
            width: 260,
            // maxWidth: 260,
          }}>
          {name}
        </Text>
        <Buttons />
      </View>
      {/* <DraggableFlatList
        style={{
          marginBottom: 20,
        }}
        data={JSON.parse(items)}
        renderItem={e => {
          return (
            <SwipeableItem item={e}>
              <Separator />
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <CheckBox
                  boxType="square"
                  style={{height: 16, marginLeft: 5}}
                  animationDuration={0.1}
                  lineWidth={1.5}
                  disabled={false}
                  value={false}
                  onValueChange={newValue => console.log(newValue)}
                />
                <Text style={{fontSize: 18, paddingTop: 10, paddingBottom: 10}}>
                  {e.item.name}
                </Text>
              </View>
            </SwipeableItem>
          );
        }}
        keyExtractor={(item: {name: string}) => {
          return item.name;
        }}
      /> */}
    </View>
  );
};

export default Card;
