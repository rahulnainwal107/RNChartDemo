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
import BarChartDemo from './BarChartDemo';
import LineChartDemo from './LineChartDemo';
import SvgChartDemo from './SvgChartDemo';
import SvgChartDemo2 from './SvgChartDemo2';
import CoinbasePro from './CoinbasePro/';
import VictoryNativeChart from './VictoryNativeChart';
import VictoryNativeChart1 from './VictoryNativeChart1';

import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => VictoryNativeChart1);
