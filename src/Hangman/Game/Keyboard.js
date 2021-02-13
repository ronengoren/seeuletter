import React from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from 'react-native';
import Button from './Button';

const ROW_ONE = 'qwertyuiop'.split('');
const ROW_TWO = 'asdfghjkl'.split('');
const ROW_THREE = 'zxcvbnm'.split('');

const keysRows = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  [' ', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ' '],
];
const Keyboard = (props) => {
  const handlePress = (letter, disabled) => () => {
    if (!disabled) props.handleLetterPress(letter.toLowerCase());
  };

  const getButton = (letter) => {
    const disabled = props.guesses.includes(letter);
    return (
      <Button
        key={letter}
        text={letter}
        handlePress={handlePress(letter.toLowerCase(), disabled)}
        disabled={disabled}
      />
    );
  };

  const getRow = (row) => (
    <View style={styles.letterRow} key={row.join('')}>
      {row.map(getButton)}
    </View>
  );

  return (
    <View style={styles.keyboard}>
      {[ROW_ONE, ROW_TWO, ROW_THREE].map(getRow)}
    </View>
  );
};

export default Keyboard;

const styles = StyleSheet.create({
  keyboard: {
    flex: 3,
  },
  letterRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
