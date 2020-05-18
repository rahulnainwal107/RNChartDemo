import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import ChartView from 'react-native-highcharts';
import axios from 'axios';
/**
 * Request data from the server, add it to the graph and set a timeout
 * to request again
 */
function processData(list, type, desc) {
  var res = [];
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
      // var dp = {};
      // dp['value'] = list[i].value;
      // dp[type + 'volume'] = list[i].volume;
      // dp[type + 'totalvolume'] = list[i].totalvolume;
      res.unshift([list[i].value, list[i].totalvolume]);
    }
  } else {
    for (var i = 0; i < list.length; i++) {
      if (i > 0) {
        list[i].totalvolume = list[i - 1].totalvolume + list[i].volume;
      } else {
        list[i].totalvolume = list[i].volume;
      }
      // var dp = {};
      // dp['value'] = list[i].value;
      // dp[type + 'volume'] = list[i].volume;
      // dp[type + 'totalvolume'] = list[i].totalvolume;
      res.push([list[i].value, list[i].totalvolume]);
    }
  }
  return res;
}

const HighChart2 = () => {
  var Highcharts = 'Highcharts';
  const apiBack = axios.create({
    baseURL:
      'https://poloniex.com/public?command=returnOrderBook&currencyPair=BTC_ETH&depth=50',
    //timeout: 1000,
  });

  const [state, setState] = useState({
    chartOptions: {
      chart: {
        type: 'area',
        animation: false, // don't animate in old IE
        marginRight: 10,
        center: [0.0],
        threshold: 0,
        // events: {
        //   load: function () {
        //     // set up the updating of the chart each second
        //     // var series = this.series[0],
        //     //   series1 = this.series[1];
        //     setInterval(function () {
        //       alert('runnning');
        //       var y = Math.random();
        //       series.addPoint(y, true, true);
        //       series1.addPoint(y, true, true);
        //       //   apiBack
        //       //     .get('')
        //       //     .then((res) => res.json())
        //       //     .then((res) => {
        //       //       setState({
        //       //         ...state,
        //       //         chartOptions: {
        //       //           ...state.chartOptions,
        //       //           series: [
        //       //             {data: processData(res.data.bids, 'bids', true)},
        //       //             {data: processData(res.data.asks, 'asks', false)},
        //       //           ],
        //       //         },
        //       //       });
        //       //     });
        //       //   series.redraw();
        //       //   series1.redraw();
        //     }, 5000);
        //   },
        // },
      },
      series: [
        {
          data: [],
        },
        {
          data: [],
        },
      ],
      title: {
        text: 'Live random data',
      },
      xAxis: {
        minPadding: 0,
        maxPadding: 0,
        plotLines: [
          {
            color: '#888',
            //value: state.asks.length && state.asks[0][0],
            width: 1,
            label: {
              text: 'Actual price',
              rotation: 90,
            },
          },
        ],
        title: {
          text: 'Price',
        },
      },
      yAxis: [
        {
          lineWidth: 1,
          gridLineWidth: 1,
          title: null,
          tickWidth: 1,
          tickLength: 5,
          tickPosition: 'inside',
          labels: {
            align: 'left',
            x: 8,
          },
        },
        {
          opposite: true,
          linkedTo: 0,
          lineWidth: 1,
          gridLineWidth: 0,
          title: null,
          tickWidth: 1,
          tickLength: 5,
          tickPosition: 'inside',
          labels: {
            align: 'right',
            x: -8,
          },
        },
      ],
      tooltip: {
        backgroundColor: '#FCFFC5',
        borderColor: 'black',
        borderRadius: 10,
        borderWidth: 3,
        crosshairs: [true, true],
        formatter: function () {
          return (
            '<b>' + this.series.name + '</b><br/>' + this.x + '<br/>' + this.y
          );
        },
      },
      legend: {
        enabled: false,
      },
      plotOptions: {
        area: {
          fillOpacity: 0.2,
          lineWidth: 1,
          step: 'center',
        },
      },
      exporting: {
        enabled: false,
      },
    },
  });

  useEffect(() => {
    apiBack.get('').then((res) =>
      setState({
        ...state,
        chartOptions: {
          ...state.chartOptions,
          series: [
            {data: processData(res.data.bids, 'bids', true)},
            {data: processData(res.data.asks, 'asks', false)},
          ],
        },
      }),
    );
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'green'}}>
      <View style={{flex: 1, backgroundColor: 'black'}}>
        <ChartView
          style={{height: 300, overflow: 'hidden'}}
          config={state.chartOptions}
          //options={state.chartOptions}
          originWhitelist={['']}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          useWebKit={true}
          scalesPageToFit={undefined}></ChartView>
      </View>
    </SafeAreaView>
  );
};

export default HighChart2;
