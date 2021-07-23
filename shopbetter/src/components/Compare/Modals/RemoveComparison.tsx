import React, {SetStateAction} from 'react';
import {Text} from 'react-native';
import {SQLiteDatabase} from 'react-native-sqlite-storage';
import AlertModal from '../../AlertModal/AlertModal';
import {removeComparison, getComparisonData} from '../../../services/compare';
import {Comparison} from '../../../types/compareTypes';
import {closeItemRefs} from '../../List/Card/ListCard';

interface RemoveComparisonProps {
  db: SQLiteDatabase;
  index: number;
  comparisonData: Comparison[];
  setComparisonData: React.Dispatch<React.SetStateAction<Comparison[]>>;
  itemRefs: Map<any, any>;
  removeComparisonModalVis: boolean;
  setRemoveComparisonModalVis: React.Dispatch<
    SetStateAction<{index: number; visible: boolean}>
  >;
}

const RemoveComparison: React.FC<RemoveComparisonProps> = ({
  db,
  index,
  itemRefs,
  comparisonData,
  setComparisonData,
  removeComparisonModalVis,
  setRemoveComparisonModalVis,
}) => {
  const currentComparison = comparisonData[index];
  const onConfirm = () => {
    // const updatedComparisonData = [...comparisonData];
    // updatedComparisonData.splice(index, 1);
    // setComparisonData(updatedComparisonData);
    closeItemRefs(itemRefs);
    removeComparison(db, currentComparison.id!).then(() => {
      getComparisonData(db).then(data => {
        setComparisonData(data);
      });
    });
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
      title="Remove item"
      modalVis={removeComparisonModalVis}
      onConfirm={() => onConfirm()}
      onCancel={() => onCancel()}>
      <Text>Are you sure you want to delete this item?</Text>
    </AlertModal>
  );
};

export default RemoveComparison;
