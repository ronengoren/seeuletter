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
  Dimensions,
  SafeAreaView,
} from 'react-native';
import Prompt from 'react-native-input-prompt';
import Button from './Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';

const HomeScreen = ({navigation}) => {
  const [wins, setWins] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [promptVisible, setPromptVisible] = useState(false);
  const [title, setTitle] = useState('Enter a word for a friend');
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    getItem('losses').then((lose) => {
      getItem('wins').then((win) => {
        const losses = parseInt(lose, 10) || 0;
        const wins = parseInt(win, 10) || 0;
        let percentage = (wins / (wins + losses)).toFixed(2) * 100;
        if (!percentage) percentage = 0;
        setWins(wins);
        setPercentage(percentage);
      });
    });
  }, []);

  const getItem = async (item) => {
    const value = await AsyncStorage.getItem(item);
    return value;
  };
  const handleNavigator = () => {
    navigation.push('OnePlayer', {
      itemId: Math.floor(Math.random() * 120),
      navigation: navigation,
    });
  };
  const handleGeographyNavigator = () => {
    navigation.push('Geography', {
      itemId: Math.floor(Math.random() * 1320),
      navigation: navigation,
    });
  };
  const handlePersonsNavigator = () => {
    navigation.push('Persons', {
      itemId: Math.floor(Math.random() * 120),
      navigation: navigation,
    });
  };

  const handleFlagQuizNavigator = () => {
    navigation.push('FlagQuiz', {
      itemId: Math.floor(Math.random() * 120),
      navigation: navigation,
    });
  };

  const handlePromptSubmit = (value) => {
    const randomword = value
      .replace(/(\s)/g, '*')
      // .replace(/[^A-Za-z]/g, '')
      .toUpperCase()
      .split('');

    if (randomword.length > 13) {
      setTitle('Enter a shorter word');
    } else if (randomword.length < 2) {
      setTitle('Enter a longer word');
    } else {
      navigation.push('TwoPlayers', {
        itemId: Math.floor(Math.random() * 100),
        peopleWord: randomword,
        navigation: navigation,
      });
      handlePrompt(false);
    }
  };

  const handlePrompt = (bool) => {
    setPromptVisible(bool);
  };

  return (
    <ImageBackground
      // source={require('../../assets/images/gallow7.png')}
      style={styles.gallow}>
      {/* <View style={styles.manWrapper}></View> */}
      <View style={styles.home}>
        <Image
          source={require('../../assets/images/logo.png')}
          style={styles.seeuletter}
        />
        <LottieView
          autoPlay
          loop={true}
          source={require('../../assets/animations/homeBackground.json')}
          style={styles.animation}
          enableMergePathsAndroidForKitKatAndAbove
        />

        {/* <Text style={styles.header}>SEE YOU LETTER</Text> */}
        <Text>YOU WON {wins} TIMES!</Text>
        <Text style={styles.score}>YOUR AVERGAE WINNING {percentage}%</Text>
        <Button
          style={styles.button}
          text="1 PLAYER"
          handlePress={handleNavigator}
          color="#fff"
        />
        <Button
          style={styles.button}
          text="2 PLAYERS"
          handlePress={() => handlePrompt(true)}
        />
        <Button
          style={styles.button}
          text="GEOGRAPHY"
          handlePress={handleGeographyNavigator}
          color="#fff"
        />
        <Button
          style={styles.button}
          text="PERSONS"
          handlePress={handlePersonsNavigator}
          color="#fff"
        />
        <Button
          style={styles.button}
          text="FLAG QUIZ"
          handlePress={handleFlagQuizNavigator}
          color="#fff"
        />
        <Prompt
          visible={promptVisible}
          title={title}
          placeholder="Use only letters, up to 13"
          onCancel={() => handlePrompt(false)}
          onSubmit={(value) => handlePromptSubmit(value)}
        />
      </View>
    </ImageBackground>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  manWrapper: {
    flex: 1,
    alignItems: 'flex-end',
  },
  man: {
    top: 75,
    height: 200,
  },
  gallow: {
    flex: 1,
    width: null,
    height: null,
  },
  home: {
    flex: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flex: 1,
    width: Dimensions.get('screen').width,
    height: Dimensions.get('window').height / 4,
    justifyContent: 'center',
    alignItems: 'center',
    // fontSize: 40,
    // top: 20,
    // fontStyle: 'italic',
    // color: '#343434',
    // shadowColor: '#000',
  },
  button: {
    height: 45,
    width: 200,
    margin: 10,
  },
  seeuletter: {
    height: 100,
    width: 300,
    // margin: 10,
  },
  score: {
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    padding: 3,
  },
  animation: {
    width: 100 + '%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
