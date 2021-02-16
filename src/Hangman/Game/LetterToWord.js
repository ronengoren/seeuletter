import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from 'react-native';

const LetterToWord = (props) => {
  // console.log(props.word);
  const [guesses, setGuesses] = useState(props.guesses);
  const getWordSlot = (letter, i) => {
    let contents = props.guesses.includes(letter) ? letter : ' ';
    return (
      <View key={i} style={styles.letterView}>
        <Text style={styles.letter}>{contents}</Text>
      </View>
    );
  };
  return (
    <View style={styles.dashes}>
      {props.word.map((letter, index) => {
        if (letter == '*') {
          return (
            <View style={styles.lowerMiddle} key={index}>
              <Text style={styles.dashBlankItem}> </Text>
            </View>
          );
        } else {
          return (
            <View style={styles.lowerMiddle} key={index}>
              {getWordSlot(letter.toUpperCase(), index)}
            </View>
          );
        }
      })}
    </View>
  );
};

{
}

export default LetterToWord;

const styles = StyleSheet.create({
  lowerMiddle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    // marginTop: 25,
    // marginBottom: 15,
  },
  letterView: {
    width: Dimensions.get('window').width / 2.2,
    // height: 150,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 2,
    marginLeft: 1.4,
    marginRight: 1.4,
    color: 'green',
  },
  letter: {
    fontSize: 15,
  },
  dashes: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'auto',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },

  dashBlankItem: {
    width: 20,
    fontSize: 20,
  },
});
