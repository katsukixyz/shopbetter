import React, {SetStateAction} from 'react';
import {Text} from 'react-native';
import {SQLiteDatabase} from 'react-native-sqlite-storage';
import AlertModal from '../../AlertModal/AlertModal';
import {removeComparison} from '../../../services/compare';
import {Comparison} from '../../../types/compareTypes';

interface RemoveComparisonProps {
  db: SQLiteDatabase;
  index: number;
  comparisonData: Comparison[];
  setComparisonData: React.Dispatch<React.SetStateAction<Comparison[]>>;
  removeComparisonModalVis: boolean;
  setRemoveComparisonModalVis: React.Dispatch<
    SetStateAction<{index: number; visible: boolean}>
  >;
}

const RemoveComparison: React.FC<RemoveComparisonProps> = ({
  db,
  index,
  comparisonData,
  setComparisonData,
  removeComparisonModalVis,
  setRemoveComparisonModalVis,
}) => {
  const currentComparison = comparisonData[index];
  const onConfirm = () => {
    const updatedComparisonData = [...comparisonData];
    updatedComparisonData.splice(index, 1);
    setComparisonData(updatedComparisonData);
    removeComparison(db, currentComparison.id!);
    setRemoveComparisonModalVis({index: index, visible: false});
  };

  const onCancel = () => {
    setRemoveComparisonModalVis({
      index: index,
      visible: false,
    });
  };

  return (
    <AlertModal
      style={{
        marginBottom: 320,
      }}
      title="Remove item"
      modalVis={removeComparisonModalVis}
      onConfirm={() => onConfirm()}
      onCancel={() => onCancel()}>
      <Text>Are sure you want to delete this item?</Text>
    </AlertModal>
  );
};

export default RemoveComparison;
