/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry, LogBox} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
  // name of the error/warning here, or a regex here
]);

AppRegistry.registerComponent(appName, () => App);
