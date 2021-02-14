import React, {useState, useEffect} from 'react';
import {Text, View, Image, StyleSheet, ImageBackground} from 'react-native';

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
    marginTop: 25,
    marginBottom: 15,
  },
  letterView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 2,
    marginLeft: 2,
    marginRight: 2,
    color: 'green',
  },
  letter: {
    fontSize: 23,
  },
  dashes: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'auto',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  dashItemContainer: {
    flex: 0,
    padding: 5,
    margin: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dashItem: {
    width: 20,
    color: '#841584',
    fontSize: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  dashBlankItem: {
    width: 20,
    fontSize: 20,
  },
});
