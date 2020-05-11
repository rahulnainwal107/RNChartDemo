import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Button,
  View,
  processColor,
  SafeAreaView,
} from 'react-native';
import update from 'immutability-helper';

import {LineChart} from 'react-native-charts-wrapper';
import Axios from 'axios';

class DepthCHart1 extends React.Component {
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
      data: {
        values: [
          {x: 8, y: 135},
          {x: 1, y: 0.88},
          {x: 2, y: 0.77},
          {x: 3, y: 105},
          {x: 4, y: 135},
          {x: 5, y: 0.88},
          {x: 6, y: 0.77},
          {x: 7, y: 105},
          {x: 8, y: 135},
          {x: 1, y: 0.88},
          {x: 2, y: 0.77},
          {x: 3, y: 105},
          {x: 4, y: 135},
          {x: 5, y: 0.88},
          {x: 6, y: 0.77},
          {x: 7, y: 105},
          {x: 8, y: 135},
          {x: 1, y: 0.88},
          {x: 2, y: 0.77},
          {x: 3, y: 105},
          {x: 4, y: 135},
          {x: 5, y: 0.88},
          {x: 6, y: 0.77},
          {x: 7, y: 105},
          {x: 8, y: 135},
          {x: 1, y: 0.88},
          {x: 2, y: 0.77},
          {x: 3, y: 105},
          {x: 4, y: 135},
          {x: 5, y: 0.88},
          {x: 6, y: 0.77},
          {x: 7, y: 105},
        ],
        label: 'A',
        config: {
          drawCircles: false,
          drawValues: false,
          colors: [processColor('white')],
          axisDependency: 'RIGHT',
          valueTextColor: processColor('white'),
        },
      },

      marker: {
        enabled: true,
        digits: 2,
        backgroundTint: processColor('white'),
        markerColor: processColor('black'),
        textColor: processColor('white'),
      },
      //   xAxis: {
      //     granularityEnabled: true,
      //     granularity: 1,
      //   },
      xAxis: {
        granularity: 1,
        granularityEnabled: true,
        drawLabels: true,
        drawGridLines: false,
        position: 'BOTTOM',
        Offset: 5,
        axisMinValue: 0,
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
        textColor: processColor('red'),
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
      yAxis: {
        left: {
          enabled: true,
          valueFormatter: '#',
          drawGridLines: false,
          textColor: processColor('red'),
          textSize: 12,
          axisLineColor: processColor('grey'),
          axisLineWidth: 1,
          axisMinValue: 0,
          position: 'INSIDE_CHART',
          //   axisMinimum: 0,
          // granularityEnabled: true,
          // granularity: 10,
          //axisMaximum: 12000,
          //   limitLines: [
          //     {
          //       limit: 200.4,
          //       lineColor: processColor('red'),
          //       lineDashPhase: 2,
          //       lineDashLengths: [10, 20],
          //     },
          //     {
          //       limit: 120.47,
          //       lineColor: processColor('red'),
          //       lineDashPhase: 2,
          //       lineDashLengths: [10, 20],
          //     },
          //   ],
        },
        right: {
          enabled: true,
          drawGridLines: false,
          valueFormatter: '#',
          textColor: processColor('red'),
          textSize: 12,
          axisLineColor: processColor('grey'),
          axisLineWidth: 1,
          axisMinValue: 0,
          position: 'INSIDE_CHART',
          //axisMinimum: 0,
          // granularityEnabled: true,
          // granularity: 10,
          //   limitLines: [
          //     {
          //       limit: 200.4,
          //       lineColor: processColor('red'),
          //       lineDashPhase: 2,
          //       lineDashLengths: [10, 20],
          //     },
          //     {
          //       limit: 120.47,
          //       lineColor: processColor('red'),
          //       lineDashPhase: 2,
          //       lineDashLengths: [10, 20],
          //     },
          //   ],
        },
      },
      zoomXValue: {
        $set: 1,
      },
      visibleRange: {x: {min: 0, max: 25}},
    };
  }

  getData(data) {
    // Function to process (sort and calculate cummulative volume)
    function processData(list, type, desc) {
      // Convert to data points
      for (var i = 0; i < list.length; i++) {
        list[i] = {
          value: Number(list[i][0]),
          volume: Number(list[i][1]),
        };
      }

      // Sort list just in case
      list.sort(function (a, b) {
        if (a.value > b.value) {
          return 1;
        } else if (a.value < b.value) {
          return -1;
        } else {
          return 0;
        }
      });

      // Calculate cummulative volume
      if (desc) {
        for (var i = list.length - 1; i >= 0; i--) {
          if (i < list.length - 1) {
            list[i].totalvolume = list[i + 1].totalvolume + list[i].volume;
          } else {
            list[i].totalvolume = list[i].volume;
          }
          let dp = {};
          dp['value'] = list[i].value;
          dp[type + 'volume'] = list[i].volume;
          dp[type + 'totalvolume'] = list[i].totalvolume;
          res.unshift(dp);
        }
      } else {
        for (var i = 0; i < list.length; i++) {
          if (i > 0) {
            list[i].totalvolume = list[i - 1].totalvolume + list[i].volume;
          } else {
            list[i].totalvolume = list[i].volume;
          }
          let dp = {};
          dp['value'] = list[i].value;
          dp[type + 'volume'] = list[i].volume;
          dp[type + 'totalvolume'] = list[i].totalvolume;
          res.push(dp);
        }
      }
    }

    // Init
    let res = [];
    processData(data.bids, 'bids', true);
    processData(data.asks, 'asks', false);
    console.log('Reesss ', res);
    return res;
  }

  componentDidMount() {
    const makeApiRequest = Axios.create({
      baseURL:
        'https://poloniex.com/public?command=returnOrderBook&currencyPair=BTC_ETH&depth=50',
      timeout: 1000,
    });
    const response = makeApiRequest
      .get('')
      .then((res) => res.status === 200 && this.getData(res.data));
    this.setState(
      update(this.state, {
        data: {
          $set: {
            dataSets: [
              {
                values: [
                  {x: 1, y: 0.88},
                  {x: 2, y: 0.77},
                  {x: 3, y: 105},
                  {x: 4, y: 135},
                  {x: 5, y: 40},
                  {x: 6, y: 85},
                  {x: 7, y: 105},
                  {x: 8, y: 135},
                  {x: 9, y: 140},
                  {x: 10, y: 145},
                  {x: 12, y: 150},
                  {x: 13, y: 155},
                  {x: 14, y: 160},
                  {x: 15, y: 165},
                  {x: 16, y: 170},
                  {x: 17, y: 175},
                  {x: 18, y: 180},
                  {x: 19, y: 185},
                  {x: 20, y: 135},
                  {x: 21, y: 40},
                  {x: 22, y: 85},
                  {x: 23, y: 105},
                  {x: 24, y: 135},
                  {x: 25, y: 140},
                  {x: 26, y: 145},
                ],
                label: 'A',
                config: {
                  drawCircles: false,
                  drawValues: false,
                  colors: [processColor('black')],
                  axisDependency: 'RIGHT',
                  valueTextColor: processColor('white'),
                },
              },
            ],
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
    return (
      <SafeAreaView>
        <View style={{flex: 1}}>
          <View style={styles.container}>
            <LineChart
              style={styles.chart}
              data={this.state.data}
              chartDescription={{text: ''}}
              legend={this.state.legend}
              marker={this.state.marker}
              xAxis={this.state.xAxis}
              yAxis={this.state.yAxis}
              drawGridBackground={false}
              //borderColor={processColor('red')}
              //borderWidth={1}
              drawBorders={false}
              autoScaleMinMaxEnabled={true}
              maxVisibleValueCount={10}
              touchEnabled={true}
              dragEnabled={true}
              scaleEnabled={true}
              scaleXEnabled={true}
              scaleYEnabled={false}
              pinchZoom={true}
              doubleTapToZoomEnabled={false}
              highlightPerTapEnabled={true}
              highlightPerDragEnabled={false}
              visibleRange={this.state.visibleRange}
              dragDecelerationEnabled={true}
              dragDecelerationFrictionCoef={0.99}
              ref="chart"
              zoom={{
                scaleX: 0,
                scaleY: 0,
                xValue: 400,
                yValue: 0,
                axisDependency: 'RIGHT',
              }}
              keepPositionOnRotation={false}
              onSelect={this.handleSelect.bind(this)}
              onChange={(event) => console.log(event.nativeEvent)}
            />
            <LineChart
              style={styles.chart}
              data={this.state.data}
              chartDescription={{text: ''}}
              legend={this.state.legend}
              marker={this.state.marker}
              xAxis={this.state.xAxis}
              yAxis={this.state.yAxis}
              drawGridBackground={false}
              //borderColor={processColor('red')}
              //borderWidth={1}
              drawBorders={false}
              autoScaleMinMaxEnabled={true}
              maxVisibleValueCount={10}
              touchEnabled={true}
              dragEnabled={true}
              scaleEnabled={true}
              scaleXEnabled={true}
              scaleYEnabled={false}
              pinchZoom={true}
              doubleTapToZoomEnabled={false}
              highlightPerTapEnabled={true}
              highlightPerDragEnabled={false}
              visibleRange={this.state.visibleRange}
              dragDecelerationEnabled={true}
              dragDecelerationFrictionCoef={0.99}
              ref="chart"
              zoom={{
                scaleX: 0,
                scaleY: 0,
                xValue: 400,
                yValue: 0,
                axisDependency: 'RIGHT',
              }}
              keepPositionOnRotation={false}
              onSelect={this.handleSelect.bind(this)}
              onChange={(event) => console.log(event.nativeEvent)}
            />
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
    flexDirection: 'row',
  },
  chart: {
    flex: 1,
  },
});

export default DepthCHart1;
