import React, {useState, useEffect} from 'react';
import {
  Easing,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  Alert,
  Image,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import {getRandomLoading} from '../../hangmanHelper';
import Hangman from './Hangman';
import {Puzzles} from './puzzles/FlagQuiz/index';
const FlagQuiz = (props) => {
  const [word, setWord] = useState([]);
  const [flagUrl, setFlagUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [lettersLeftArray, setLettersLeftArray] = useState([]);
  useEffect(() => {
    getRandomWord();
  }, []);

  const dashedWord = (puzzles) => {
    let puzzle = puzzles.getRandom();

    let flag = puzzle.flag;
    setFlagUrl(puzzle.flag);

    let answer = puzzle.country
      .toUpperCase()
      .replace(/[^a-zA-Z]/gim, ' ')
      .trim();

    let lettersLeft = Array(answer.length);
    for (let i = 0; i < answer.length; i++) {
      lettersLeft[i] = answer[i] == ' ' ? '*' : answer[i];
    }
    setWord(lettersLeft);
  };
  const restartGame = () => {
    setIsLoading(true);
    getRandomWord();
  };

  const getRandomWord = () => {
    let puzzles = new Puzzles();
    dashedWord(puzzles);
    setIsLoading(false);
  };

  return isLoading ? (
    <View style={styles.loading}>
      <Text style={{marginBottom: 10}}>{getRandomLoading()}</Text>
      <ActivityIndicator size="large" />
    </View>
  ) : (
    <Hangman word={word} restartGame={restartGame} {...props} flag={flagUrl} />
  );
};

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FlagQuiz;
