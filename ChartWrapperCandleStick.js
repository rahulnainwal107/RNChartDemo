import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Button,
  View,
  processColor,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import update from 'immutability-helper';
import axios from 'axios';

import _ from 'lodash';
import {CandleStickChart} from 'react-native-charts-wrapper';

const api = 'https://min-api.cryptocompare.com/data/v2/';
const api_key =
  '35983c064a052063e99ed64ea840af00fa11f4e22a8e0b9929ff092dafd201fb';

// let values = [
//   {shadowH: 101.76, shadowL: 100.4, open: 100.78, close: 101.03},
//   {shadowH: 101.58, shadowL: 100.27, open: 101.31, close: 101.12},
//   {shadowH: 102.24, shadowL: 100.15, open: 101.41, close: 101.17},
//   {shadowH: 102.28, shadowL: 101.5, open: 102.24, close: 102.23},
//   {shadowH: 102.91, shadowL: 101.78, open: 101.91, close: 102.52},
//   {shadowH: 105.18, shadowL: 103.85, open: 103.96, close: 104.58},
//   {shadowH: 106.31, shadowL: 104.59, open: 104.61, close: 105.97},
//   {shadowH: 106.47, shadowL: 104.96, open: 105.52, close: 105.8},
//   {shadowH: 106.5, shadowL: 105.19, open: 106.34, close: 105.92},
//   {shadowH: 107.65, shadowL: 105.1401, open: 105.93, close: 105.91},
//   {shadowH: 107.29, shadowL: 105.21, open: 105.25, close: 106.72},
//   {shadowH: 107.07, shadowL: 105.9, open: 106.48, close: 106.13},
//   {shadowH: 106.25, shadowL: 104.89, open: 105.47, close: 105.67},
//   {shadowH: 106.19, shadowL: 105.06, open: 106, close: 105.19},
//   {shadowH: 107.79, shadowL: 104.88, open: 104.89, close: 107.7},
//   {shadowH: 110.42, shadowL: 108.6, open: 108.65, close: 109.56},
//   {shadowH: 109.9, shadowL: 108.88, open: 109.72, close: 108.99},
//   {shadowH: 110, shadowL: 108.2, open: 108.78, close: 109.99},
//   {shadowH: 112.19, shadowL: 110.27, open: 110.42, close: 111.08},
//   {shadowH: 110.73, shadowL: 109.42, open: 109.51, close: 109.81},
//   {shadowH: 110.98, shadowL: 109.2, open: 110.23, close: 110.96},
//   {shadowH: 110.42, shadowL: 108.121, open: 109.95, close: 108.54},
//   {shadowH: 109.77, shadowL: 108.17, open: 108.91, close: 108.66},
//   {shadowH: 110.61, shadowL: 108.83, open: 108.97, close: 109.04},
//   {shadowH: 110.5, shadowL: 108.66, open: 109.34, close: 110.44},
//   {shadowH: 112.34, shadowL: 110.8, open: 110.8, close: 112.0192},
//   {shadowH: 112.39, shadowL: 111.33, open: 111.62, close: 112.1},
//   {shadowH: 112.3, shadowL: 109.73, open: 112.11, close: 109.85},
//   {shadowH: 108.95, shadowL: 106.94, open: 108.89, close: 107.48},
//   {shadowH: 108, shadowL: 106.23, open: 107.88, close: 106.91},
//   {shadowH: 108.09, shadowL: 106.06, open: 106.64, close: 107.13},
//   {shadowH: 106.93, shadowL: 105.52, open: 106.93, close: 105.97},
//   {shadowH: 106.48, shadowL: 104.62, open: 105.01, close: 105.68},
//   {shadowH: 105.65, shadowL: 104.51, open: 105, close: 105.08},
//   {shadowH: 105.3, shadowL: 103.91, open: 103.91, close: 104.35},
//   {shadowH: 98.71, shadowL: 95.68, open: 96, close: 97.82},
//   {shadowH: 97.88, shadowL: 94.25, open: 97.61, close: 94.8075},
//   {shadowH: 94.72, shadowL: 92.51, open: 93.99, close: 93.75},
//   {shadowH: 94.08, shadowL: 92.4, open: 93.965, close: 93.65},
//   {shadowH: 95.74, shadowL: 93.68, open: 94.2, close: 95.18},
//   {shadowH: 95.9, shadowL: 93.82, open: 95.2, close: 94.19},
//   {shadowH: 94.07, shadowL: 92.68, open: 94, close: 93.24},
//   {shadowH: 93.45, shadowL: 91.85, open: 93.37, close: 92.72},
//   {shadowH: 93.77, shadowL: 92.59, open: 93, close: 92.82},
//   {shadowH: 93.57, shadowL: 92.11, open: 93.33, close: 93.39},
//   {shadowH: 93.57, shadowL: 92.46, open: 93.48, close: 92.51},
//   {shadowH: 92.78, shadowL: 89.47, open: 92.72, close: 90.32},
//   {shadowH: 91.67, shadowL: 90, open: 90, close: 90.52},
//   {shadowH: 97.88, shadowL: 94.25, open: 97.61, close: 94.8075},
//   {shadowH: 94.72, shadowL: 92.51, open: 93.99, close: 93.75},
//   {shadowH: 94.08, shadowL: 92.4, open: 93.965, close: 93.65},
//   {shadowH: 95.74, shadowL: 93.68, open: 94.2, close: 95.18},
//   {shadowH: 95.9, shadowL: 93.82, open: 95.2, close: 94.19},
//   {shadowH: 94.07, shadowL: 92.68, open: 94, close: 93.24},
//   {shadowH: 93.45, shadowL: 91.85, open: 93.37, close: 92.72},
//   {shadowH: 93.77, shadowL: 92.59, open: 93, close: 92.82},
//   {shadowH: 93.57, shadowL: 92.11, open: 93.33, close: 93.39},
//   {shadowH: 93.57, shadowL: 92.46, open: 93.48, close: 92.51},
//   {shadowH: 92.78, shadowL: 89.47, open: 92.72, close: 90.32},
//   {shadowH: 91.67, shadowL: 90, open: 90, close: 90.52},
// ];

let values = [
  {
    time: 1588161000,
    shadowH: 6591.75,
    shadowL: 6584.13,
    open: 6591.75,
    volumefrom: 1.863,
    volumeto: 12247.55,
    close: 6586.15,
    conversionType: 'direct',
    conversionSymbol: '',
  },
  {
    time: 1588161060,
    shadowH: 6586.71,
    shadowL: 6580.5,
    open: 6586.15,
    volumefrom: 19.73,
    volumeto: 129946.7,
    close: 6584.68,
    conversionType: 'direct',
    conversionSymbol: '',
  },
  {
    time: 1588161120,
    shadowH: 6584.68,
    shadowL: 6574.21,
    open: 6584.68,
    volumefrom: 8.381,
    volumeto: 55128.16,
    close: 6576.5,
    conversionType: 'direct',
    conversionSymbol: '',
  },
  {
    time: 1588161180,
    shadowH: 6579.47,
    shadowL: 6572.91,
    open: 6576.5,
    volumefrom: 4.076,
    volumeto: 26794,
    close: 6579.47,
    conversionType: 'direct',
    conversionSymbol: '',
  },
  {
    time: 1588161240,
    shadowH: 6585.98,
    shadowL: 6579.17,
    open: 6579.47,
    volumefrom: 3.677,
    volumeto: 24230.04,
    close: 6585.98,
    conversionType: 'direct',
    conversionSymbol: '',
  },
  {
    time: 1588161300,
    shadowH: 6591.01,
    shadowL: 6585.47,
    open: 6585.98,
    volumefrom: 1.042,
    volumeto: 6860.3,
    close: 6585.47,
    conversionType: 'direct',
    conversionSymbol: '',
  },
  {
    time: 1588161360,
    shadowH: 6588.42,
    shadowL: 6583.07,
    open: 6585.47,
    volumefrom: 4.1,
    volumeto: 27012.84,
    close: 6588.19,
    conversionType: 'direct',
    conversionSymbol: '',
  },
  {
    time: 1588161420,
    shadowH: 6588.19,
    shadowL: 6583.33,
    open: 6588.19,
    volumefrom: 1.65,
    volumeto: 10860.77,
    close: 6587.6,
    conversionType: 'direct',
    conversionSymbol: '',
  },
  {
    time: 1588161480,
    shadowH: 6587.6,
    shadowL: 6586.97,
    open: 6587.6,
    volumefrom: 0.2994,
    volumeto: 1969.03,
    close: 6586.97,
    conversionType: 'direct',
    conversionSymbol: '',
  },
  {
    time: 1588161540,
    shadowH: 6591.77,
    shadowL: 6586.97,
    open: 6586.97,
    volumefrom: 2.617,
    volumeto: 17239.02,
    close: 6591.77,
    conversionType: 'direct',
    conversionSymbol: '',
  },
  {
    time: 1588161600,
    shadowH: 6592.21,
    shadowL: 6591.77,
    open: 6591.77,
    volumefrom: 0,
    volumeto: 0,
    close: 6592.21,
    conversionType: 'direct',
    conversionSymbol: '',
  },
  {
    time: 1588161000,
    shadowH: 6591.75,
    shadowL: 6584.13,
    open: 6591.75,
    volumefrom: 1.863,
    volumeto: 12247.55,
    close: 6586.15,
    conversionType: 'direct',
    conversionSymbol: '',
  },
  {
    time: 1588161060,
    shadowH: 6586.71,
    shadowL: 6580.5,
    open: 6586.15,
    volumefrom: 19.73,
    volumeto: 129946.7,
    close: 6584.68,
    conversionType: 'direct',
    conversionSymbol: '',
  },
  {
    time: 1588161120,
    shadowH: 6584.68,
    shadowL: 6574.21,
    open: 6584.68,
    volumefrom: 8.381,
    volumeto: 55128.16,
    close: 6576.5,
    conversionType: 'direct',
    conversionSymbol: '',
  },
  {
    time: 1588161180,
    shadowH: 6579.47,
    shadowL: 6572.91,
    open: 6576.5,
    volumefrom: 4.076,
    volumeto: 26794,
    close: 6579.47,
    conversionType: 'direct',
    conversionSymbol: '',
  },
  {
    time: 1588161240,
    shadowH: 6585.98,
    shadowL: 6579.17,
    open: 6579.47,
    volumefrom: 3.677,
    volumeto: 24230.04,
    close: 6585.98,
    conversionType: 'direct',
    conversionSymbol: '',
  },
  {
    time: 1588161300,
    shadowH: 6591.01,
    shadowL: 6585.47,
    open: 6585.98,
    volumefrom: 1.042,
    volumeto: 6860.3,
    close: 6585.47,
    conversionType: 'direct',
    conversionSymbol: '',
  },
  {
    time: 1588161360,
    shadowH: 6588.42,
    shadowL: 6583.07,
    open: 6585.47,
    volumefrom: 4.1,
    volumeto: 27012.84,
    close: 6588.19,
    conversionType: 'direct',
    conversionSymbol: '',
  },
  {
    time: 1588161420,
    shadowH: 6588.19,
    shadowL: 6583.33,
    open: 6588.19,
    volumefrom: 1.65,
    volumeto: 10860.77,
    close: 6587.6,
    conversionType: 'direct',
    conversionSymbol: '',
  },
  {
    time: 1588161480,
    shadowH: 6587.6,
    shadowL: 6586.97,
    open: 6587.6,
    volumefrom: 0.2994,
    volumeto: 1969.03,
    close: 6586.97,
    conversionType: 'direct',
    conversionSymbol: '',
  },
  {
    time: 1588161540,
    shadowH: 6591.77,
    shadowL: 6586.97,
    open: 6586.97,
    volumefrom: 2.617,
    volumeto: 17239.02,
    close: 6591.77,
    conversionType: 'direct',
    conversionSymbol: '',
  },
  {
    time: 1588161600,
    shadowH: 6592.21,
    shadowL: 6591.77,
    open: 6591.77,
    volumefrom: 0,
    volumeto: 0,
    close: 6592.21,
    conversionType: 'direct',
    conversionSymbol: '',
  },
  {
    time: 1588161000,
    shadowH: 6591.75,
    shadowL: 6584.13,
    open: 6591.75,
    volumefrom: 1.863,
    volumeto: 12247.55,
    close: 6586.15,
    conversionType: 'direct',
    conversionSymbol: '',
  },
  {
    time: 1588161060,
    shadowH: 6586.71,
    shadowL: 6580.5,
    open: 6586.15,
    volumefrom: 19.73,
    volumeto: 129946.7,
    close: 6584.68,
    conversionType: 'direct',
    conversionSymbol: '',
  },
  {
    time: 1588161120,
    shadowH: 6584.68,
    shadowL: 6574.21,
    open: 6584.68,
    volumefrom: 8.381,
    volumeto: 55128.16,
    close: 6576.5,
    conversionType: 'direct',
    conversionSymbol: '',
  },
  {
    time: 1588161180,
    shadowH: 6579.47,
    shadowL: 6572.91,
    open: 6576.5,
    volumefrom: 4.076,
    volumeto: 26794,
    close: 6579.47,
    conversionType: 'direct',
    conversionSymbol: '',
  },
  {
    time: 1588161240,
    shadowH: 6585.98,
    shadowL: 6579.17,
    open: 6579.47,
    volumefrom: 3.677,
    volumeto: 24230.04,
    close: 6585.98,
    conversionType: 'direct',
    conversionSymbol: '',
  },
  {
    time: 1588161300,
    shadowH: 6591.01,
    shadowL: 6585.47,
    open: 6585.98,
    volumefrom: 1.042,
    volumeto: 6860.3,
    close: 6585.47,
    conversionType: 'direct',
    conversionSymbol: '',
  },
  {
    time: 1588161360,
    shadowH: 6588.42,
    shadowL: 6583.07,
    open: 6585.47,
    volumefrom: 4.1,
    volumeto: 27012.84,
    close: 6588.19,
    conversionType: 'direct',
    conversionSymbol: '',
  },
  {
    time: 1588161420,
    shadowH: 6588.19,
    shadowL: 6583.33,
    open: 6588.19,
    volumefrom: 1.65,
    volumeto: 10860.77,
    close: 6587.6,
    conversionType: 'direct',
    conversionSymbol: '',
  },
  {
    time: 1588161480,
    shadowH: 6587.6,
    shadowL: 6586.97,
    open: 6587.6,
    volumefrom: 0.2994,
    volumeto: 1969.03,
    close: 6586.97,
    conversionType: 'direct',
    conversionSymbol: '',
  },
  {
    time: 1588161540,
    shadowH: 6591.77,
    shadowL: 6586.97,
    open: 6586.97,
    volumefrom: 2.617,
    volumeto: 17239.02,
    close: 6591.77,
    conversionType: 'direct',
    conversionSymbol: '',
  },
  {
    time: 1588161600,
    shadowH: 6592.21,
    shadowL: 6591.77,
    open: 6591.77,
    volumefrom: 0,
    volumeto: 0,
    close: 6592.21,
    conversionType: 'direct',
    conversionSymbol: '',
  },
  {
    time: 1588161000,
    shadowH: 6591.75,
    shadowL: 6584.13,
    open: 6591.75,
    volumefrom: 1.863,
    volumeto: 12247.55,
    close: 6586.15,
    conversionType: 'direct',
    conversionSymbol: '',
  },
  {
    time: 1588161060,
    shadowH: 6586.71,
    shadowL: 6580.5,
    open: 6586.15,
    volumefrom: 19.73,
    volumeto: 129946.7,
    close: 6584.68,
    conversionType: 'direct',
    conversionSymbol: '',
  },
  {
    time: 1588161120,
    shadowH: 6584.68,
    shadowL: 6574.21,
    open: 6584.68,
    volumefrom: 8.381,
    volumeto: 55128.16,
    close: 6576.5,
    conversionType: 'direct',
    conversionSymbol: '',
  },
  {
    time: 1588161180,
    shadowH: 6579.47,
    shadowL: 6572.91,
    open: 6576.5,
    volumefrom: 4.076,
    volumeto: 26794,
    close: 6579.47,
    conversionType: 'direct',
    conversionSymbol: '',
  },
  {
    time: 1588161240,
    shadowH: 6585.98,
    shadowL: 6579.17,
    open: 6579.47,
    volumefrom: 3.677,
    volumeto: 24230.04,
    close: 6585.98,
    conversionType: 'direct',
    conversionSymbol: '',
  },
  {
    time: 1588161300,
    shadowH: 6591.01,
    shadowL: 6585.47,
    open: 6585.98,
    volumefrom: 1.042,
    volumeto: 6860.3,
    close: 6585.47,
    conversionType: 'direct',
    conversionSymbol: '',
  },
  {
    time: 1588161360,
    shadowH: 6588.42,
    shadowL: 6583.07,
    open: 6585.47,
    volumefrom: 4.1,
    volumeto: 27012.84,
    close: 6588.19,
    conversionType: 'direct',
    conversionSymbol: '',
  },
  {
    time: 1588161420,
    shadowH: 6588.19,
    shadowL: 6583.33,
    open: 6588.19,
    volumefrom: 1.65,
    volumeto: 10860.77,
    close: 6587.6,
    conversionType: 'direct',
    conversionSymbol: '',
  },
  {
    time: 1588161480,
    shadowH: 6587.6,
    shadowL: 6586.97,
    open: 6587.6,
    volumefrom: 0.2994,
    volumeto: 1969.03,
    close: 6586.97,
    conversionType: 'direct',
    conversionSymbol: '',
  },
  {
    time: 1588161540,
    shadowH: 6591.77,
    shadowL: 6586.97,
    open: 6586.97,
    volumefrom: 2.617,
    volumeto: 17239.02,
    close: 6591.77,
    conversionType: 'direct',
    conversionSymbol: '',
  },
  {
    time: 1588161600,
    shadowH: 6592.21,
    shadowL: 6591.77,
    open: 6591.77,
    volumefrom: 0,
    volumeto: 0,
    close: 6592.21,
    conversionType: 'direct',
    conversionSymbol: '',
  },
  {
    time: 1588161000,
    shadowH: 6591.75,
    shadowL: 6584.13,
    open: 6591.75,
    volumefrom: 1.863,
    volumeto: 12247.55,
    close: 6586.15,
    conversionType: 'direct',
    conversionSymbol: '',
  },
  {
    time: 1588161060,
    shadowH: 6586.71,
    shadowL: 6580.5,
    open: 6586.15,
    volumefrom: 19.73,
    volumeto: 129946.7,
    close: 6584.68,
    conversionType: 'direct',
    conversionSymbol: '',
  },
  {
    time: 1588161120,
    shadowH: 6584.68,
    shadowL: 6574.21,
    open: 6584.68,
    volumefrom: 8.381,
    volumeto: 55128.16,
    close: 6576.5,
    conversionType: 'direct',
    conversionSymbol: '',
  },
  {
    time: 1588161180,
    shadowH: 6579.47,
    shadowL: 6572.91,
    open: 6576.5,
    volumefrom: 4.076,
    volumeto: 26794,
    close: 6579.47,
    conversionType: 'direct',
    conversionSymbol: '',
  },
  {
    time: 1588161240,
    shadowH: 6585.98,
    shadowL: 6579.17,
    open: 6579.47,
    volumefrom: 3.677,
    volumeto: 24230.04,
    close: 6585.98,
    conversionType: 'direct',
    conversionSymbol: '',
  },
  {
    time: 1588161300,
    shadowH: 6591.01,
    shadowL: 6585.47,
    open: 6585.98,
    volumefrom: 1.042,
    volumeto: 6860.3,
    close: 6585.47,
    conversionType: 'direct',
    conversionSymbol: '',
  },
  {
    time: 1588161360,
    shadowH: 6588.42,
    shadowL: 6583.07,
    open: 6585.47,
    volumefrom: 4.1,
    volumeto: 27012.84,
    close: 6588.19,
    conversionType: 'direct',
    conversionSymbol: '',
  },
  {
    time: 1588161420,
    shadowH: 6588.19,
    shadowL: 6583.33,
    open: 6588.19,
    volumefrom: 1.65,
    volumeto: 10860.77,
    close: 6587.6,
    conversionType: 'direct',
    conversionSymbol: '',
  },
  {
    time: 1588161480,
    shadowH: 6587.6,
    shadowL: 6586.97,
    open: 6587.6,
    volumefrom: 0.2994,
    volumeto: 1969.03,
    close: 6586.97,
    conversionType: 'direct',
    conversionSymbol: '',
  },
  {
    time: 1588161540,
    shadowH: 6591.77,
    shadowL: 6586.97,
    open: 6586.97,
    volumefrom: 2.617,
    volumeto: 17239.02,
    close: 6591.77,
    conversionType: 'direct',
    conversionSymbol: '',
  },
  {
    time: 1588161600,
    shadowH: 6592.21,
    shadowL: 6591.77,
    open: 6591.77,
    volumefrom: 0,
    volumeto: 0,
    close: 6592.21,
    conversionType: 'direct',
    conversionSymbol: '',
  },
];

class ChartWrapperCandleStick extends React.Component {
  constructor() {
    super();

    this.state = {
      legend: {
        enabled: false,
        textSize: 14,
        form: 'SQUARE',
        formSize: 14,
        xEntrySpace: 10,
        yEntrySpace: 5,
        formToTextSpace: 5,
        wordWrapEnabled: true,
        maxSizePercent: 0.5,
      },
      animation: {
        // durationX: 1500,
        // durationY: 1500,
        // easingX: 'EaseInCirc',
        durationX: 0,
        durationY: 1500,
        easingY: 'EaseInOutQuart',
      },
      visibleRange: {
        x: {min: 0, max: 25},
      },
      data: {
        dataSets: [
          {
            values: values,

            label: 'Bar dataSet',
            config: {
              //mode: "CUBIC_BEZIER",
              highlightColor: processColor('grey'),
              shadowColor: processColor('white'),
              shadowWidth: 1,
              shadowColorSameAsCandle: true,
              increasingColor: processColor('green'),
              increasingPaintStyle: 'FILL',
              decreasingColor: processColor('red'),
              colors: [processColor('green')],
              axisDependency: 'RIGHT',
              //valueFormatter: ['Transportation $100,000'],
              valueTextColor: processColor('white'),
            },
            xAxis: {
              // drawGridLines: false,
              // position: 'BOTTOM',
            },
            yAxis: {
              // left: {
              //   axisLineColor: processColor('green'),
              //   gridColor: processColor('red'),
              //   labelCount: 6,
              //   labelCountForce: false,
              // },
              // right: {
              //   enabled: false,
              //   drawLabels: false,
              //   drawAxisLine: true,
              //   axisLineColor: processColor('black'),
              //   drawGridLines: false,
              // },
            },
          },
        ],
      },
      marker: {
        enabled: true,
        markerColor: processColor('grey'),
        textColor: processColor('white'),
        markerFontSize: 14,
        digits: 2,
        backgroundTint: processColor('teal'),
      },
      zoomXValue: {
        $set: 1,
      },
    };

    this.x = 0;
  }

  componentDidMount() {
    var instance = axios.create({
      baseURL: api,
      timeout: 1000,
      headers: {api_key: api_key},
    });
    instance.get('histominute?fsym=BTC&tsym=GBP&limit=10').then((res) => {
      const nameList = res.data;
      console.log('Name list is ', JSON.stringify(nameList.Data.Data));
    });
    this.setState(
      update(this.state, {
        xAxis: {
          $set: {
            granularity: 1,
            granularityEnabled: true,
            drawLabels: true,
            drawGridLines: false,
            position: 'BOTTOM',
            Offset: 5,
            // limitLines: _.times(
            //   this.state.data.dataSets[0].values.length / 5,
            //   (i) => {
            //     return {
            //       limit: null,
            //       lineColor: processColor('darkgray'),
            //       lineWidth: 1,
            //       label: (i + 1).toString(),
            //     };
            //   },
            // ),
            textColor: processColor('black'),
            textSize: 12,
            //gridColor: processColor('red'),
            //gridLineWidth: 1,
            axisLineColor: processColor('grey'),
            axisLineWidth: 1,
            // gridDashedLine: {
            //   lineLength: 10,
            //   spaceLength: 10
            // },
            labelCount: 6,
            avoidFirstLastClipping: true,
          },
        },
        yAxis: {
          $set: {
            left: {
              enabled: false,
              valueFormatter: '$ #',
              drawGridLines: false,
              textColor: processColor('black'),
              textSize: 12,
              axisLineColor: processColor('grey'),
              axisLineWidth: 1,
              //   axisMinValue: 0,
              //   axisMinimum: 0,
              // granularityEnabled: true,
              // granularity: 10,
              //axisMaximum: 12000,
              limitLines: [
                {
                  limit: 200.4,
                  lineColor: processColor('red'),
                  lineDashPhase: 2,
                  lineDashLengths: [10, 20],
                },
                {
                  limit: 120.47,
                  lineColor: processColor('red'),
                  lineDashPhase: 2,
                  lineDashLengths: [10, 20],
                },
              ],
            },
            right: {
              enabled: true,
              drawGridLines: false,
              valueFormatter: '#',
              textColor: processColor('black'),
              textSize: 12,
              axisLineColor: processColor('grey'),
              axisLineWidth: 1,
              axisMinValue: 0,
              //axisMinimum: 0,
              // granularityEnabled: true,
              // granularity: 10,
              limitLines: [
                {
                  limit: 200.4,
                  lineColor: processColor('red'),
                  lineDashPhase: 2,
                  lineDashLengths: [10, 20],
                },
                {
                  limit: 120.47,
                  lineColor: processColor('red'),
                  lineDashPhase: 2,
                  lineDashLengths: [10, 20],
                },
              ],
            },
          },
        },
        zoomXValue: {
          $set: 1,
        },
      }),
    );
  }

  handleSelect(event) {
    let entry = event.nativeEvent;
    if (entry == null) {
      this.setState({...this.state, selectedEntry: null});
    } else {
      this.setState({...this.state, selectedEntry: JSON.stringify(entry)});
    }

    console.log(event.nativeEvent);
  }

  render() {
    console.log('Values ', values);
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{flex: 1}}>
          <View>
            <Text> selected entry</Text>
            <Text> {this.state.selectedEntry}</Text>
          </View>

          <View style={styles.container}>
            <CandleStickChart
              scaleEnabled={false}
              style={styles.chart}
              data={this.state.data}
              marker={this.state.marker}
              chartDescription={{text: ''}}
              legend={this.state.legend}
              xAxis={this.state.xAxis}
              yAxis={this.state.yAxis}
              maxVisibleValueCount={10}
              autoScaleMinMaxEnabled={true}
              doubleTapToZoomEnabled={false}
              animation={this.state.animation}
              drawValueAboveBar={true}
              touchEnabled={true}
              dragEnabled={true}
              //scaleEnabled={true}
              pinchZoom={false}
              scaleXEnabled={true}
              scaleYEnabled={false}
              visibleRange={this.state.visibleRange}
              drawBorders={false}
              // dragDecelerationEnabled={true}
              // dragDecelerationFrictionCoef={0.99}
              // keepPositionOnRotation={false}

              zoom={{
                scaleX: 0,
                scaleY: 0,
                xValue: 400,
                yValue: 0,
                axisDependency: 'RIGHT',
              }}
              onSelect={this.handleSelect.bind(this)}
              ref="chart"
              onChange={(event) => console.log(event.nativeEvent)}
            />
          </View>
          <View style={{alignItems: 'center', flexDirection: 'row'}}>
            <TouchableOpacity style={styles.touchableButtonStyle}>
              <Text style={styles.buttonTextStyle}>30m</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.touchableButtonStyle}>
              <Text style={styles.buttonTextStyle}>1D</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.touchableButtonStyle}>
              <Text style={styles.buttonTextStyle}>2D</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.touchableButtonStyle}>
              <Text style={styles.buttonTextStyle}>15D</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    height: 300,
    paddingVertical: 10,
  },
  chart: {
    flex: 1,
    backgroundColor: 'white',
  },
  touchableButtonStyle: {
    flex: 1,
    margin: 5,
    borderRadius: 5,
    backgroundColor: 'skyblue',
  },
  buttonTextStyle: {
    padding: 5,
    textAlign: 'center',
  },
});

export default ChartWrapperCandleStick;
