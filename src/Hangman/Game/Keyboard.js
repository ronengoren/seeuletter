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
    if (!disabled) props.handleLetterPress(letter);
  };

  const getButton = (letter, index) => {
    const disabled = props.guesses.includes(letter);

    if (letter == ' ') {
      return <Text key={index}> </Text>;
    } else {
      return (
        <Button
          key={letter}
          text={letter}
          handlePress={handlePress(letter, disabled)}
          disabled={disabled}
        />
      );
    }
  };

  const getRow = (row) => (
    <View style={styles.letterRow} key={row.join('')}>
      {row.map(getButton)}
    </View>
  );

  return <View style={styles.keyboard}>{keysRows.map(getRow)}</View>;
};

{
  /* {[ROW_ONE, ROW_TWO, ROW_THREE].map(getRow)} */
}

export default Keyboard;

const styles = StyleSheet.create({
  keyboard: {
    flex: 3,
  },
  letterRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  keyboard: {
    // flex: 1,
    // backgroundColor: '#fff',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  keyboardRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    margin: 2,
  },
  usedKey: {
    color: 'grey',
    fontSize: 20,
    width: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  letter: {
    color: 'black',
    fontSize: 20,
    width: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
