import React, {useState, useEffect} from 'react';
import {
  Easing,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  Alert,
} from 'react-native';
import Svg, {
  Circle,
  Ellipse,
  G,
  TSpan,
  TextPath,
  Path,
  Polygon,
  Polyline,
  Line,
  Rect,
  Use,
  Image,
  Symbol,
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
  ClipPath,
  Pattern,
  Mask,
} from 'react-native-svg';
import {Puzzles} from '../puzzles';

export default function GameScreen({navigation}) {
  const [answer, setAnswer] = useState('');
  const [hint, setHint] = useState('');
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [usedLetters, setUsedLetters] = useState([]);
  const [lettersLeft, setLettersLeft] = useState([]);
  const [input, setInput] = useState('');
  const [score, setScore] = useState(0);
  const [puzzles, setPuzzles] = useState(new Puzzles());
  let rope = (
    <Line
      x1="250"
      y1="0"
      x2="250"
      y2="120"
      stroke="#895917"
      strokeWidth="5"
      id="rope"
    />
  );
  let head = <Circle cx="250" cy="150" r="30" id="head" fill="#ecd2b7" />;
  let bodyMain = (
    <Rect
      width="10"
      height="100"
      x="245"
      y="150"
      id="bodyMain"
      fill="#ecd2b7"
    />
  );
  let hands = (
    <G>
      <Line
        x1="250"
        y1="200"
        x2="220"
        y2="230"
        stroke="#ecd2b7"
        stroke-Linecap="round"
        strokeWidth="10"
        id="handLeft"
      />
      <Line
        x1="250"
        y1="200"
        x2="280"
        y2="230"
        stroke="#ecd2b7"
        stroke-Linecap="round"
        strokeWidth="10"
        id="handRight"
      />
    </G>
  );
  let legs = (
    <G>
      <Line
        x1="250"
        y1="250"
        x2="230"
        y2="300"
        stroke="#ecd2b7"
        stroke-Linecap="round"
        strokeWidth="10"
        id="legLeft"
      />
      <Line
        x1="250"
        y1="250"
        x2="270"
        y2="300"
        stroke="#ecd2b7"
        stroke-Linecap="round"
        strokeWidth="10"
        id="legRight"
      />
    </G>
  );
  useEffect(() => {
    init();
  }, []);

  const init = () => {
    let puzzle = puzzles.getRandom();
    let answer = puzzle.answer.replace(/[^a-zA-Z]/gim, ' ').trim();

    let hint = puzzle.hint;
    let lettersLeft = Array(answer.length);
    for (let index = 0; index < answer.length; index++) {
      lettersLeft[index] = answer[index] == ' ' ? '*' : ' ';
    }
    setAnswer(answer);
    setHint(hint);
    setCorrect(0);
    setWrong(0);
    setUsedLetters([]);
    setLettersLeft(lettersLeft);
    setInput('');
  };

  const validate = (usedLetters, letter) => {
    usedLetters.push(letter);
    if (answer.toUpperCase().indexOf(letter) == -1) {
      setWrong(wrong + 1);

      if (score > 0) {
        setScore(score - 1);
      }
    } else {
      answer
        .toUpperCase()
        .split('')
        .map((value, index) => {
          if (value == letter) {
            lettersLeft[index] = letter;
            setAnswer(answer + 1);
            setScore(score + 1);
          }
        });
    }
    if (
      lettersLeft.join('').replace(/\*/g, ' ').toUpperCase() ==
      answer.toUpperCase()
    ) {
      Alert.alert(
        'You win',
        'You have gussed the correct answer',
        [{text: 'OK', onPress: () => init()}],
        {cancelable: false},
      );
    }
    if (wrong > 4) {
      Alert.alert(
        'You Lost',
        'Answer: ' + answer.toUpperCase() + ' ' + hint,
        [{text: 'OK', onPress: () => init()}],
        {cancelable: false},
      );
    }
    setUsedLetters(usedLetters);
    setCorrect(answer);
    setWrong(wrong);
    setLettersLeft(lettersLeft);
    setScore(score);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.scoreText}>Score: {score}</Text>
      <Text style={styles.scoreText}>wrongs: {wrong}</Text>

      <Svg
        version="1.1"
        viewBox="0 0 500 500"
        preserveAspectRatio="xMinYMin meet"
        class="svg-content"
        width="200"
        height="250">
        <Rect fill="#053544" width="10" height="400" x="20" y="0" />
        <Rect fill="#053544" width="300" height="10" x="20" y="0" />
        <Rect fill="#053544" width="300" height="10" x="0" y="400" />
        {wrong > 0 ? rope : null}
        {wrong > 1 ? head : null}
        {wrong > 2 ? bodyMain : null}
        {wrong > 3 ? hands : null}
        {wrong > 4 ? legs : null}
      </Svg>
      {renderDashes()}
      <View style={styles.hintContainer}>
        <Text style={styles.hintText}>Hint : {hint}</Text>
      </View>
      {renderKeyBoard()}
    </View>
  );
  function renderDashes() {
    return (
      <View style={styles.dashes}>
        {lettersLeft.map((letter, index) => {
          if (letter == '*') {
            return (
              <View style={styles.dashItemContainer} key={index}>
                <Text style={styles.dashBlankItem}> </Text>
              </View>
            );
          } else {
            return (
              <View style={styles.dashItemContainer} key={index}>
                <Text style={styles.dashItem}>{letter}</Text>
              </View>
            );
          }
        })}
      </View>
    );
  }

  function renderKeyBoard() {
    const keysRows = [
      ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
      ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
      [' ', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ' '],
    ];
    return (
      <View style={styles.keyboard}>
        {keysRows.map((keys, rowIndex) => {
          return (
            <View key={rowIndex} style={styles.keyboardRow}>
              {keys.map((letter, index) => {
                if (letter == ' ') {
                  return <Text key={index}> </Text>;
                } else if (usedLetters.indexOf(letter) != -1) {
                  return (
                    <View style={styles.keyItem} key={index}>
                      <Text key={index} style={styles.usedKey}>
                        {letter}
                      </Text>
                    </View>
                  );
                } else {
                  return (
                    <TouchableHighlight
                      onPress={() => {
                        onKeyPress(letter);
                      }}
                      style={styles.keyItem}
                      key={index}>
                      <Text style={styles.letter}>{letter}</Text>
                    </TouchableHighlight>
                  );
                }
              })}
            </View>
          );
        })}
      </View>
    );
  }
  function onKeyPress(letter) {
    if (usedLetters.indexOf(letter) == -1) {
      validate(usedLetters, letter);
    } else {
      return;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gameTitleView: {
    flexDirection: 'row',
  },
  gameTitle: {
    fontSize: 35,
    borderBottomWidth: 1,
    margin: 10,
  },
  keyboard: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  keyboardRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    margin: 2,
  },
  usedKey: {
    color: 'grey',
    fontSize: 20,
    width: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  letter: {
    color: 'black',
    fontSize: 20,
    width: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startGameBtn: {
    color: '#841584',
    fontSize: 25,
    margin: 10,
  },
  dashInputStyle: {
    height: 40,
  },
  dashes: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'auto',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  dashItemContainer: {
    flex: 0,
    padding: 5,
    margin: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dashItem: {
    width: 20,
    color: '#841584',
    fontSize: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  dashBlankItem: {
    width: 20,
    fontSize: 20,
  },
  hintContainer: {
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    padding: 10,
    backgroundColor: 'lightgrey',
  },
  hintText: {
    fontSize: 18,
    fontWeight: '500',
  },
  scoreText: {
    fontSize: 13,
    textAlign: 'right',
    fontWeight: '500',
    justifyContent: 'flex-end',
    width: '100%',
  },
});
