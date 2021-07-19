import React, {SetStateAction} from 'react';
import {Text} from 'react-native';
import AlertModal from '../../AlertModal/AlertModal';

interface LimitReachedProps {
  limitReachedModalVis: boolean;
  setLimitReachedModalVis: React.Dispatch<SetStateAction<boolean>>;
}

const LimitReached: React.FC<LimitReachedProps> = ({
  limitReachedModalVis,
  setLimitReachedModalVis,
}) => {
  const onCancel = () => {
    setLimitReachedModalVis(false);
  };

  return (
    <AlertModal
      style={{
        marginBottom: 320,
      }}
      title="Error"
      oneButton
      modalVis={limitReachedModalVis}
      onCancel={() => onCancel()}>
      <Text>The maximum supported number of lists is 10 at this time.</Text>
    </AlertModal>
  );
};

export default LimitReached;
