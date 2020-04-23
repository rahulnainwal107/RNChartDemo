/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import NewScree from './NewScree';
import NativeCharts from './NativeCharts';
import NativeCharts1 from './NativeCharts1';
import F2Chart from './F2Chart';
import FusionCharts from './FusionCharts';
import DepthChart from './DepthChart';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => FusionCharts);
