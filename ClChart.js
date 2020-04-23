import React from 'react';
import {View, Text, ScrollView, Button, SafeAreaView} from 'react-native';
import Echarts from 'native-echarts';

const data = [
  {time: '2019-04-11', value: 80.01},
  {time: '2019-04-12', value: 96.63},
  {time: '2019-04-13', value: 76.64},
  {time: '2019-04-14', value: 81.89},
  {time: '2019-04-15', value: 74.43},
  {time: '2019-04-16', value: 80.01},
  {time: '2019-04-17', value: 96.63},
  {time: '2019-04-18', value: 76.64},
  {time: '2019-04-19', value: 81.89},
  {time: '2019-04-20', value: 74.43},
];

const option = {
  backgroundColor: 'black',
  title: {
    show: true,
    text: 'DOW JONES INDEX',
    textStyle: {
      fontSize: 15,
      align: 'center',
      lineHeight: 40,
      left: '40%',
    },
  },
  tooltip: {
    trigger: 'none',
    axisPointer: {
      animation: false,
      type: 'cross',
      lineStyle: {
        color: '#376df4',
        width: 2,
        opacity: 1,
      },
    },
  },

  toolbox: {
    orient: 'vertical',
    show: true,
    showTitle: true,
  },
  xAxis: [
    {
      type: 'category',
      data: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      axisLine: {lineStyle: {color: 'white'}},
    },
  ],
  yAxis: [
    {
      scale: true,
      axisLine: {
        lineStyle: {color: 'white'},
      },
      splitLine: {show: false},
    },
  ],
  grid: [
    {
      top: 40,
      bottom: 40,
      left: 50,
    },
  ],
  color: ['rgb(249,159,94)', 'rgb(67,205,126)'],
  animation: true,
  series: [
    {
      type: 'candlestick',
      name: 'Daily',
      data: [
        [11, 67, 60, 7, 6],
        [12, 6, 16, 23, 1],
        [4, 6, 16, 23, 1],
        [23, 6, 16, 23, 1],
        [23, 6, 16, 23, 1],
        [23, 6, 16, 23, 1],
        [12, 44, 55, 66, 2],
        [1, 55, 67, 45, 6],
        [45, 6, 16, 23, 1],
        [4, 6, 16, 23, 1],
        [23, 6, 16, 23, 1],
        [23, 6, 16, 23, 1],
        [23, 6, 16, 23, 1],
      ],
      itemStyle: {
        normal: {
          color: '#FD1050',
          color0: '#0CF49B',
          borderColor: '#FD1050',
          borderColor0: '#0CF49B',
        },
      },
    },
  ],
};

const NativeCharts1 = () => {
  return (
    <SafeAreaView>
      <View style={{flex: 1}}>
        <Echarts
          option={option}
          height={200}
          width={'100%'}
          //handleMessage={this.handleMessage}
        />
      </View>
    </SafeAreaView>
  );
};

export default NativeCharts1;
