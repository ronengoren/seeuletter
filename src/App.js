/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './Hangman/Game/HomeScreen';
import OnePlayer from './Hangman/Game/OnePlayer';
import TwoPlayer from './Hangman/Game/TwoPlayers';
import Geography from './Hangman/Game/Geography';
import Persons from './Hangman/Game/Persons';
import FlagQuiz from './Hangman/Game/FlagQuiz';

import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
} from 'react-native-admob';
const Stack = createStackNavigator();

const App: () => React$Node = () => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="OnePlayer" component={OnePlayer} />
          <Stack.Screen name="TwoPlayers" component={TwoPlayer} />
          <Stack.Screen name="Geography" component={Geography} />
          <Stack.Screen name="Persons" component={Persons} />
          <Stack.Screen name="FlagQuiz" component={FlagQuiz} />
        </Stack.Navigator>
      </NavigationContainer>
      <AdMobBanner
        adSize="fullBanner"
        adUnitID={
          Platform.OS === 'ios'
            ? 'ca-app-pub-3940256099942544/2934735716'
            : 'ca-app-pub-5713671504596281/1412113813'
        }
        onAdFailedToLoad={(error) => console.error(error)}
        style={styles.ad}
      />
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  ad: {
    position: 'absolute',
    bottom: 1,
  },
});

export default App;
