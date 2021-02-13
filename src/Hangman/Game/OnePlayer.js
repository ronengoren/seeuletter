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
import words from './words';

const random = () => words[Math.floor(Math.random() * words.length)];

const OnePlayer = (props) => {
  const [word, setWord] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setWord(random().split(''));
  }, []);

  const restartGame = () => {
    setIsLoading(true);
    getRandomWord();
  };

  const getRandomWord = () => {
    setWord(random().split(''));
    setIsLoading(false);
  };
  return isLoading ? (
    <View style={styles.loading}>
      <Text style={{marginBottom: 10}}>{getRandomLoading()}</Text>
      <ActivityIndicator size="large" />
    </View>
  ) : (
    <Hangman word={word} restartGame={restartGame} {...props} />
  );
};

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default OnePlayer;
