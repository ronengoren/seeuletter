import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  Modal,
  Pressable,
  SafeAreaView,
} from 'react-native';
import Button from './Button';
import Gallows from './Gallows';
import LetterToWord from './LetterToWord';
import Keyboard from './Keyboard';
import LottieView from 'lottie-react-native';
// Css
import {SvgUri, SvgCssUri} from 'react-native-svg';
import SVGImage from 'react-native-svg-image';

const HangmanView = (props) => {
  const onRelease = () => {
    setTimeout(() => {
      props.closeModal();
    }, 2000);
  };
  // console.log(props);
  return (
    <ImageBackground
      // source={require('../../assets/images/gallow1.png')}
      style={styles.gallow}>
      <SafeAreaView style={styles.container}>
        {props.modalVisible ? (
          <Modal
            animationType="fade"
            transparent={true}
            visible={props.modalVisible}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <LottieView
                  autoPlay
                  loop={false}
                  source={props.animations.getJson()}
                  style={styles.animation}
                  enableMergePathsAndroidForKitKatAndAbove
                  onAnimationFinish={onRelease()}
                />
                <Text style={styles.scoreText}>MISTAKES LEFT...</Text>
              </View>
            </View>
          </Modal>
        ) : null}

        <Text style={styles.gameTitle}>{props.header}</Text>

        <View style={styles.top}>
          <View style={styles.flagCenteredView}>
            {props.flag ? (
              <SVGImage
                style={styles.tinyLogo}
                // resizeMethod={'stretch'}
                // resizeMode={'stretch'}
                source={{
                  uri: props.flag,
                }}
              />
            ) : (
              <LottieView
                autoPlay
                loop={true}
                source={require('../../assets/animations/homeBackground.json')}
                style={styles.animation}
                enableMergePathsAndroidForKitKatAndAbove
              />
            )}
          </View>
        </View>
        <View style={styles.top1}>
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
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 5,
    backgroundColor: '#fff',
  },
  top: {
    flex: 1,
    // flexDirection: 'row',
    justifyContent: 'center',
    // paddingTop: 15,
  },
  top1: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',

    // paddingTop: 15,
  },
  topButtons: {
    height: 45,
    width: 125,
  },
  gallow: {
    flex: 1,
    width: null,
    height: null,
    marginBottom: 100,
    // top: 1,
    // position: 'relative',
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
  scoreText: {
    fontSize: 13,
    textAlign: 'center',
    fontWeight: '500',
    justifyContent: 'flex-end',
    width: '100%',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  flagCenteredView: {
    // width: Dimensions.get('window').width,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    // marginTop: 22,

    // backgroundColor: 'pink',
  },
  tinyLogo: {
    height: Dimensions.get('window').height / 7,
    width: Dimensions.get('window').width / 2,
    alignItems: 'center',
    // flex: 1,
    justifyContent: 'center',
    // padding: 20,
    // backgroundColor: 'white',
    // borderRadius: 20,
    // padding: 35,
    // alignItems: 'center',
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 4,
    // elevation: 5,
  },

  modalView: {
    margin: 20,
    // backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 4,
    // elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  gameTitle: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 20,
    padding: 10,
    fontSize: 20,
  },
});
export default HangmanView;
