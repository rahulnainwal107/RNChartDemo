import React, {Component} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';

import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryAxis,
  VictoryCandlestick,
} from 'victory-native';

const data = [
  {quarter: 1, earnings: 13000},
  {quarter: 2, earnings: 16500},
  {quarter: 3, earnings: 14250},
  {quarter: 4, earnings: 19000},
];

const sampleDataDates = [
  {x: new Date(2016, 6, 1), open: 5, close: 10, high: 15, low: 0},
  {x: new Date(2016, 6, 2), open: 10, close: 15, high: 20, low: 5},
  {x: new Date(2016, 6, 3), open: 15, close: 20, high: 22, low: 10},
  {x: new Date(2016, 6, 4), open: 20, close: 10, high: 25, low: 7},
  {x: new Date(2016, 6, 5), open: 10, close: 8, high: 15, low: 5},
];

class VictoryNativeChart extends Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <VictoryChart
          width={350}
          height={200}
          marginBottom={10}
          theme={VictoryTheme.material}>
          <VictoryBar data={data} x="quarter" y="earnings" />
        </VictoryChart>

        <VictoryChart
          theme={VictoryTheme.material}
          domainPadding={{x: 25}}
          scale={{x: 'time'}}
          height={200}
          width={350}>
          <VictoryAxis tickFormat={(t) => `${t.getDate()}/${t.getMonth()}`} />
          <VictoryAxis dependentAxis />
          <VictoryCandlestick
            candleColors={{positive: '#5f5c5b', negative: '#c43a31'}}
            data={sampleDataDates}
          />
        </VictoryChart>
      </ScrollView>
    );
  }
}

export default VictoryNativeChart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5fcff',
  },
});
