import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

const Button = ({disabled, text, handlePress, style}) => {
  getStyles = () => ({
    borderRadius: 5,
    padding: 8,
    margin: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 10,
    shadowOpacity: 0.25,
    backgroundColor: disabled ? '#3ec6cd' : '#2E9298',
  });

  return (
    <TouchableOpacity onPress={handlePress} style={style}>
      <View style={getStyles()}>
        <Text style={styles.buttonText}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    padding: 5,
  },
});
