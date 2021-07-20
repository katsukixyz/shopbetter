import React, {useState, useEffect} from 'react';
import {View, Text, Animated} from 'react-native';
import {
  Swipeable,
  RectButton,
  TouchableOpacity,
  // TouchableOpacity,
} from 'react-native-gesture-handler';
import {Comparison} from '../../../types/compareTypes';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface CompareCardProps {
  item: Comparison;
  index: number;
  itemRefs: Map<any, any>;
  setEditComparisonModalVis: React.Dispatch<
    React.SetStateAction<{
      visible: boolean;
      index: number;
    }>
  >;
  setRemoveComparisonModalVis: React.Dispatch<
    React.SetStateAction<{visible: boolean; index: number}>
  >;
  setStorePickerModalVis: React.Dispatch<
    React.SetStateAction<{visible: boolean; index: number}>
  >;
}

const CompareCard: React.FC<CompareCardProps> = ({
  item,
  index,
  itemRefs,
  setEditComparisonModalVis,
  setRemoveComparisonModalVis,
  setStorePickerModalVis,
}) => {
  const renderRightActions = (
    progress: Animated.AnimatedInterpolation,
    _dragAnimatedValue: Animated.AnimatedInterpolation,
  ) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [120, 0],
    });

    return (
      <View style={{width: 120}}>
        <Animated.View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            transform: [{translateX: trans}],
          }}>
          <View style={{alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() =>
                setEditComparisonModalVis({
                  visible: true,
                  index: index,
                })
              }
              style={{
                width: 40,
                height: 40,
                marginBottom: 5,
                borderRadius: 20,
                backgroundColor: '#007aff',
              }}>
              <Ionicons
                name="create-outline"
                color="white"
                size={22}
                style={{paddingLeft: 10, paddingTop: 7.5}}
              />
            </TouchableOpacity>
            <Text>Edit</Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() =>
                setRemoveComparisonModalVis({visible: true, index: index})
              }
              style={{
                width: 40,
                height: 40,
                marginBottom: 5,
                borderRadius: 20,
                backgroundColor: '#ff3b30',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Ionicons name="trash-outline" color="white" size={22} />
            </TouchableOpacity>
            <Text>Delete</Text>
          </View>
        </Animated.View>
      </View>
    );
  };

  return (
    <Swipeable
      ref={ref => {
        if (ref && !itemRefs.get(index)) {
          itemRefs.set(index, ref);
        }
      }}
      onSwipeableWillOpen={() => {
        [...itemRefs.entries()].forEach(([key, ref]) => {
          if (key !== index && ref) {
            ref.close();
          }
        });
      }}
      renderRightActions={renderRightActions}>
      <View
        style={{
          backgroundColor: 'white',
          minHeight: 85,
          borderRadius: 12,
          marginTop: 5,
          marginBottom: 5,
          padding: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            width: '55%',
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontWeight: '500', fontSize: 22, paddingBottom: 5}}>
              {item.name}
            </Text>
            <RectButton
              style={{
                backgroundColor: '#f8f4f4',
                width: 150,
                height: 28,
                borderRadius: 6,
                justifyContent: 'center',
                padding: 5,
              }}
              onPress={() =>
                setStorePickerModalVis({index: index, visible: true})
              }>
              <Text ellipsizeMode="tail" numberOfLines={1}>
                {item.store}
              </Text>
            </RectButton>
          </View>
        </View>
        <View
          style={{
            width: '40%',
            flexDirection: 'column',
            justifyContent: 'center',
            // alignItems: 'center',
          }}>
          <View style={{flexDirection: 'row', paddingBottom: 5}}>
            <Ionicons
              style={{width: 30}}
              name="pricetag"
              color="black"
              size={18}
            />
            <Text
              style={{flex: 1}}
              adjustsFontSizeToFit
              ellipsizeMode="tail"
              numberOfLines={1}
              minimumFontScale={0.01}>
              {`$${item.price.toFixed(2)}`}
            </Text>
          </View>
          <View style={{flexDirection: 'row', paddingBottom: 5}}>
            <FontAwesome
              style={{width: 30}}
              name="balance-scale"
              color="black"
              size={18}
            />
            <Text
              style={{flex: 1}}
              adjustsFontSizeToFit
              ellipsizeMode="tail"
              numberOfLines={1}
              minimumFontScale={0.01}>
              {item.quantity % 1 === 0
                ? item.quantity
                : item.quantity.toFixed(2)}
            </Text>
          </View>
          <View>
            <Text
              style={{flex: 1, fontWeight: '500', fontSize: 18}}
              adjustsFontSizeToFit
              ellipsizeMode="tail"
              numberOfLines={1}
              minimumFontScale={0.01}>{`$${(item.price / item.quantity).toFixed(
              2,
            )}/unit`}</Text>
          </View>
        </View>
      </View>
    </Swipeable>
  );
};

export default CompareCard;
