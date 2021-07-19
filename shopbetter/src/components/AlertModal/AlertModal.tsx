import React, {useState, ReactPropTypes} from 'react';
import {View, Text, TextInput} from 'react-native';
import Modal from 'react-native-modal';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SQLiteDatabase} from 'react-native-sqlite-storage';
import {addList} from '../../services/list';
import Separator from '../List/Separator/Separator';

interface AlertModalProps {
  style?: {
    [key: string]: string | number;
  };
  title: string;
  modalVis: boolean;
  oneButton?: boolean;
  onConfirm?: () => void;
  onCancel: () => void;
  children: React.ReactNode;
}

const AlertModal: React.FC<AlertModalProps> = ({
  style,
  title,
  modalVis,
  oneButton,
  onConfirm,
  onCancel,
  children,
}) => {
  return (
    <View>
      <Modal
        isVisible={modalVis}
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
        animationInTiming={100}
        animationOutTiming={100}>
        <View
          style={{
            flex: 1,
            padding: 20,
            backgroundColor: 'white',
            marginTop: 290,
            marginRight: 50,
            marginLeft: 50,
            marginBottom: 310,
            borderRadius: 12,
            ...style,
          }}>
          <Text style={{fontSize: 24, fontWeight: '600', paddingBottom: 10}}>
            {title}
          </Text>
          <View style={{paddingBottom: 20}}>{children}</View>

          <Separator style={{paddingBottom: 20, borderTopColor: '#d3d3d3'}} />
          {oneButton ? (
            <View>
              <TouchableOpacity
                onPress={onCancel}
                style={{
                  backgroundColor: '#0a84ff',
                  justifyContent: 'center',
                  padding: 10,
                  alignItems: 'center',
                  borderRadius: 6,
                }}>
                <Text style={{color: 'white', fontSize: 16, fontWeight: '400'}}>
                  Dismiss
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <TouchableOpacity onPress={onCancel}>
                <Text
                  style={{
                    color: '#0a84ff',
                    fontSize: 16,
                    fontWeight: '400',
                    padding: 10,
                  }}>
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onConfirm}>
                <View
                  style={{
                    padding: 8,
                    backgroundColor: '#0a84ff',
                    alignItems: 'center',
                    width: 120,
                    borderRadius: 6,
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 16,
                      fontWeight: '400',
                      //   padding: 3,
                    }}>
                    Confirm
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
};

export default AlertModal;
