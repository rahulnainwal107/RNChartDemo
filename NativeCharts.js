import React from 'react';
import {View, Text, ScrollView, Button, SafeAreaView} from 'react-native';
import Echarts from 'native-echarts';

const option = {
  title: {
    text: 'ECharts demo',
  },
  tooltip: {},
  legend: {
    data: ['销量'],
  },
  xAxis: {
    data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
  },
  yAxis: {},
  series: [
    {
      name: '销量',
      type: 'bar',
      data: [5, 20, 36, 10, 10, 20],
    },
  ],
};

const NativeCharts = () => {
  return (
    <SafeAreaView>
      <Echarts option={option} height={300} />
    </SafeAreaView>
  );
};

export default NativeCharts;
