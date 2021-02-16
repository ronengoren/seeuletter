import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Modal,
} from 'react-native';
import HangmanView from './HangmanView';
import {List} from 'immutable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
} from 'react-native-admob';

AdMobInterstitial.setAdUnitID('ca-app-pub-5713671504596281/4036577035');
// Css
const getRandomValue = (arr) => arr[Math.floor(Math.random() * arr.length)];

const makeExample = (name, getJson) => ({name, getJson});
const SCORE_ANIMATIONS = [
  makeExample('1', () =>
    require('../../assets/animations/scoreAnimation/1.json'),
  ),
  makeExample('2', () =>
    require('../../assets/animations/scoreAnimation/2.json'),
  ),
  makeExample('3', () =>
    require('../../assets/animations/scoreAnimation/3.json'),
  ),
  makeExample('4', () =>
    require('../../assets/animations/scoreAnimation/4.json'),
  ),
  makeExample('5', () =>
    require('../../assets/animations/scoreAnimation/5.json'),
  ),
  makeExample('6', () =>
    require('../../assets/animations/scoreAnimation/6.json'),
  ),
  makeExample('10', () =>
    require('../../assets/animations/scoreAnimation/10.json'),
  ),
];
const Hangman = (props, navigation) => {
  const [word, setWord] = useState([]);
  const [wrongGuesses, setWrongGuesses] = useState(new List());
  const [guesses, setGuesses] = useState(new List());
  const [score, setScore] = useState(6);
  const [modalVisible, setModalVisible] = useState(false);
  const [winModalVisible, setWinmodalVisible] = useState(false);
  const [animations, setAnimations] = useState(SCORE_ANIMATIONS[0]);
  const [routeName, setRouteName] = useState('');
  const [flagUrl, setFlagUrl] = useState('');

  // console.log(animations.getJson());
  useEffect(() => {
    setWord(props.word);
    setFlagUrl(props.flag);
    getRouteName();
  });

  const getRouteName = () => {
    if (props.route.name == 'OnePlayer') {
      setRouteName('RANDOM WORD');
    } else if (props.route.name == 'TwoPlayers') {
      setRouteName('TRY TO GUESS YOUR FRIEND WORD');
    } else if (props.route.name == 'Geography') {
      setRouteName('GEOGRAPHY');
    } else if (props.route.name == 'Persons') {
      setRouteName('FAMOUS PERSON');
    } else {
      setRouteName('CAN YOU GUESS THE COUNTRY FROM THE FLAG?');
    }
  };

  const getHangingMan = () => {
    const images = {
      1: require('../../assets/images/man1.png'),
      2: require('../../assets/images/man2.png'),
      3: require('../../assets/images/man3.png'),
      4: require('../../assets/images/man4.png'),
      5: require('../../assets/images/man5.png'),
      6: require('../../assets/images/man6.png'),
      7: require('../../assets/images/man7.png'),
    };
    return images[wrongGuesses.size + 1];
  };

  showModalAd = () => {
    AdMobInterstitial.requestAd()
      .then(() => {
        receiveHint();

        AdMobInterstitial.showAd();
      })
      .catch((err) => {
        receiveHint();
      });
  };

  const receiveHint = () => {
    const letter = getRandomValue(word);

    if (!guesses.contains(letter)) {
      handleLetterPress(letter);
    } else {
      receiveHint();
    }
  };

  const restartGame = () => {
    setWinmodalVisible(false);
    setWrongGuesses(new List());
    setGuesses(new List());
    props.restartGame();
  };

  const handleLetterPress = (letter) => {
    let guessesArr;
    guessesArr = guesses.push(letter);

    if (word.includes(letter)) {
      checkAnswer(guessesArr, word);
    } else {
      let wrongGuessesArr;

      wrongGuessesArr = wrongGuesses.push(letter);
      wrongAnswer(wrongGuessesArr);
      setScore(score - 1);
      setAnimations(SCORE_ANIMATIONS[score - 1]);
      // scoreAlert(score - 1);
      setModalVisible(true);
    }
    setGuesses(guessesArr);
  };
  const checkAnswer = (guesses) => {
    const currentAnswer = word.filter((letter) => guesses.includes(letter));

    if (currentAnswer.length === word.join('').replace(/\*/g, '').length) {
      alertGameOver('You Win!');
    }
  };

  const wrongAnswer = (wrongGuesses) => {
    setWrongGuesses(wrongGuesses);
    if (wrongGuesses.size === 6) {
      setTimeout(() => {
        alertGameOver('You Lose');
      }, 2750);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const saveResult = (endState) => {
    getItem(endState).then((item) => {
      const value = `${parseInt(item, 10) + 1}`;
      AsyncStorage.setItem(endState, value);
    });
  };

  const getItem = async (item) => {
    const value = await AsyncStorage.getItem(item);
    return value || 0;
  };

  const alertGameOver = (alertMessage) => {
    let descr = '';
    if (alertMessage === 'You Lose') {
      descr = `The correct word was ${word
        .join('')
        .replace(/\*/g, ' ')
        .toUpperCase()}. `;
      saveResult('losses');
    } else {
      saveResult('wins');
    }

    setWinmodalVisible(true);
    // setAnimations(SCORE_ANIMATIONS[10]);

    Alert.alert(alertMessage, `${descr}Would you like to play again?`, [
      {text: 'No', onPress: () => goHome()},
      {text: 'Yes', onPress: () => restartGame()},
    ]);
  };

  const alertHome = () => {
    Alert.alert(
      'You have a game running.',
      'Are you sure you want to go home?',
      [{text: 'No'}, {text: 'Yes', onPress: () => goHome()}],
    );
  };
  const goHome = () => {
    props.navigation.navigate('Home');
  };

  return (
    <HangmanView
      alertHome={alertHome}
      showModalAd={showModalAd}
      handleLetterPress={handleLetterPress}
      getHangingMan={getHangingMan}
      word={word}
      wrongGuesses={wrongGuesses}
      guesses={guesses}
      score={score}
      modalVisible={modalVisible}
      winModalVisible={winModalVisible}
      closeModal={closeModal}
      animations={animations}
      goHome={goHome}
      restartGame={restartGame}
      header={routeName}
      flag={flagUrl}
    />
  );
};

const styles = StyleSheet.create({
  result: {
    fontSize: 24,
    margin: 18,
    textAlign: 'center',
  },
  instructions: {
    textAlign: 'center',
    color: 'grey',
  },
});
export default Hangman;
