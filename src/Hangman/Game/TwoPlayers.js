import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {getRandomLoading} from '../../hangmanHelper';
import Hangman from './Hangman';
import Prompt from 'react-native-input-prompt';

// Css

const TwoPlayer = (props) => {
  const [promptVisible, setPromptVisible] = useState(false);
  const [word, setWord] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState('Enter a word for a friend');
  const _getResultMessage = () => {};

  useEffect(() => {
    setWord(props.route.params.peopleWord);
  }, [props]);

  const restartGame = () => {
    setWord('');
    setPromptVisible(true);
    setIsLoading(true);
    setTitle('Enter a word for a friend');
  };

  const handlePromptCancel = () => {
    navigation.push('Home');
    setPromptVisible(false);
  };

  handlePromptSubmit = (value) => {
    const userWord = value
      .replace(/[^A-Za-z]/g, '')
      .toLowerCase()
      .split('');
    if (userWord.length > 13) {
      setTitle('Enter a shorter word');
    } else if (userWord.length < 2) {
      setTitle('Enter a longer word');
    } else {
      setWord(userWord);
      setPromptVisible(false);
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.middle}>
      {isLoading ? (
        <View style={styles.middle}>
          <Text style={{marginBottom: 10}}>{getRandomLoading()}</Text>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <Hangman word={word} restartGame={restartGame} {...props} />
      )}
      {/* <Prompt
        visible={promptVisible}
        title={title}
        placeholder="Use only letters, up to 13"
        onCancel={handlePromptCancel}
        onSubmit={(value) => alert(value)}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  middle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
export default TwoPlayer;
