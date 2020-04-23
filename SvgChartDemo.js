import React from 'react';
import {View, SafeAreaView} from 'react-native';
import {
  AreaChart,
  Grid,
  YAxis,
  XAxis,
  LineChart,
} from 'react-native-svg-charts';
import * as shape from 'd3-shape';

class SvgChartDemo extends React.PureComponent {
  render() {
    const data = [
      50,
      10,
      40,
      95,
      -4,
      -24,
      85,
      91,
      35,
      53,
      -53,
      24,
      50,
      -20,
      -80,
    ];

    const contentInset = {top: 20, bottom: 20};

    return (
      <SafeAreaView>
        <View style={{height: 200, flexDirection: 'row'}}>
          <YAxis
            data={data}
            contentInset={contentInset}
            svg={{
              fill: 'grey',
              fontSize: 10,
            }}
            numberOfTicks={10}
            formatLabel={(value) => `${value}ºC`}
            style={{position: 'absolute', bottom: 5, left: 0, top: 0}}
          />
          <XAxis
            data={data}
            contentInset={contentInset}
            svg={{
              fill: 'grey',
              fontSize: 10,
            }}
            numberOfTicks={10}
            formatLabel={(value) => `${value}ºC`}
            style={{position: 'absolute', bottom: 0, left: 5, right: 0}}
          />
          <LineChart
            style={{flex: 1, marginLeft: 16}}
            data={data}
            svg={{stroke: 'rgb(134, 65, 244)'}}
            contentInset={contentInset}>
            <Grid />
          </LineChart>
        </View>
      </SafeAreaView>
    );
  }
}

export default SvgChartDemo;
