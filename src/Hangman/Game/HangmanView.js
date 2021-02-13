import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from 'react-native';
import Button from './Button';
import Gallows from './Gallows';
import LetterToWord from './LetterToWord';
import Keyboard from './Keyboard';
import {
  AdMobBanner,
  AdMobInterstitial,
  AdMobRewarded,
  PublisherBanner,
} from 'react-native-admob';
import LottieView from 'lottie-react-native';

// Css
const BannerExample = ({style, title, children, ...props}) => (
  <View {...props} style={[styles.example, style]}>
    <Text style={styles.title}>{title}</Text>
    <View>{children}</View>
  </View>
);

const HangmanView = (props) => {
  const _getResultMessage = () => {};
  return (
    <ImageBackground
      // source={require('../../assets/images/gallow1.png')}
      style={styles.gallow}>
      <LottieView
        autoPlay
        loop={true}
        source={require('../../assets/animations/homeBackground.json')}
        style={styles.animation}
        enableMergePathsAndroidForKitKatAndAbove
      />
      <View style={styles.container}>
        <View style={styles.top}>
          <Button
            text="Home"
            handlePress={props.alertHome}
            style={styles.topButtons}
          />
          <Button
            text="Get a Hint"
            handlePress={props.showModalAd}
            style={styles.topButtons}
          />
        </View>
        {/* <Gallows {...props} /> */}
        <LetterToWord {...props} />
        <Keyboard {...props} />
        {/* <BannerExample>
        <AdMobBanner
          adSize="smartBannerPortrait"
          // adUnitID="ca-app-pub-5713671504596281/6322566273"
          adUnitID="ca-app-pub-3940256099942544/6300978111"
          // ref={(el) => (this._smartBannerExample = el)}
        />
      </BannerExample> */}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
  },
  top: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 20,
  },
  topButtons: {
    height: 45,
    width: 125,
  },
  gallow: {
    flex: 1,
    width: null,
    height: null,
  },
  example: {
    position: 'absolute',
    bottom: 1,
  },
  animation: {
    width: 100 + '%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default HangmanView;
