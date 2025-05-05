import { registerRootComponent } from 'expo';
import { AppRegistry } from 'react-native';
import App from './src/App';

AppRegistry.registerComponent('kitchencare-app', () => App);
registerRootComponent(App);
