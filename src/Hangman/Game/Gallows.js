import React from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from 'react-native';

const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');

const Gallows = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        {/* <ImageBackground
          source={require('../../assets/images/gallow8.png')}
          style={styles.gallow}>
          <Image source={props.getHangingMan()} style={styles.man} />
        </ImageBackground> */}
      </View>
      <View style={styles.right}>
        <Image source={props.getHangingMan()} style={styles.man} />

        {!props.wrongGuesses
          ? null
          : props.wrongGuesses.map((letter, i) => (
              <View key={i}>
                <Text style={styles.letter}>{letter}</Text>
              </View>
            ))}
      </View>
    </View>
  );
};

export default Gallows;

const styles = StyleSheet.create({
  container: {
    flex: 6,
    flexDirection: 'row',
  },
  left: {
    // flex: 2,
    // margin: 2,
  },
  right: {
    flex: 1,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  letter: {
    fontSize: 35,
    color: 'white',
  },
  gallow: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    alignItems: 'flex-end',
  },
  man: {
    top: 25,
  },
});
