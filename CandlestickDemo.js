import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryLabel,
  VictoryAxis,
  VictoryCandlestick,
  VictoryZoomContainer,
} from 'victory-native';

const data = [
  {quarter: 1, earnings: 13000},
  {quarter: 2, earnings: 16500},
  {quarter: 3, earnings: 14250},
  {quarter: 4, earnings: 19000},
];

const CandleStickDemo = () => {
  return (
    <View style={styles.container}>
      <VictoryChart
        containerComponent={<VictoryZoomContainer />}
        domainPadding={{x: 100}}
        scale={{x: 'time'}}>
        <VictoryAxis tickFormat={(t) => `${t.getDate()}/${t.getMonth()}`} />
        <VictoryAxis dependentAxis orientation="right" />
        <VictoryCandlestick
          animate={{
            duration: 2000,
            onLoad: {duration: 1000},
          }}
          //containerComponent={<VictoryZoomContainer />}
          candleColors={{positive: '#5f5c5b', negative: '#c43a31'}}
          data={[
            {x: new Date(2016, 6, 1), open: 5, close: 10, high: 15, low: 0},
            {x: new Date(2016, 6, 2), open: 10, close: 15, high: 20, low: 5},
            {x: new Date(2016, 6, 3), open: 15, close: 20, high: 22, low: 10},
            {x: new Date(2016, 6, 4), open: 20, close: 10, high: 25, low: 7},
            {x: new Date(2016, 6, 5), open: 10, close: 8, high: 15, low: 5},
            {x: new Date(2016, 6, 1), open: 5, close: 10, high: 15, low: 0},
            {x: new Date(2016, 6, 2), open: 10, close: 15, high: 20, low: 5},
            {x: new Date(2016, 6, 3), open: 15, close: 20, high: 22, low: 10},
            {x: new Date(2016, 6, 4), open: 20, close: 10, high: 25, low: 7},
            {x: new Date(2016, 6, 5), open: 10, close: 8, high: 15, low: 5},
            {x: new Date(2016, 6, 1), open: 5, close: 10, high: 15, low: 0},
            {x: new Date(2016, 6, 2), open: 10, close: 15, high: 20, low: 5},
            {x: new Date(2016, 6, 3), open: 15, close: 20, high: 22, low: 10},
            {x: new Date(2016, 6, 4), open: 20, close: 10, high: 25, low: 7},
            {x: new Date(2016, 6, 5), open: 10, close: 8, high: 15, low: 5},
          ]}
        />
      </VictoryChart>
    </View>
  );
};

export default CandleStickDemo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
  },
});
