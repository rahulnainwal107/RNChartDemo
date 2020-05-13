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

const HeighChart1 = () => {
  var Highcharts = 'Highcharts';
  const [state, setState] = useState({bids: [], asks: []});
  const apiBack = axios.create({
    baseURL:
      'https://poloniex.com/public?command=returnOrderBook&currencyPair=BTC_ETH&depth=50',
    timeout: 1000,
  });
  useEffect(() => {
    apiBack
      .get('')
      .then((res) =>
        setState({...state, bids: res.data.bids, asks: res.data.asks}),
      );
  }, []);

  var conf = {
    chart: {
      type: 'area',
      animation: Highcharts.svg, // don't animate in old IE
      marginRight: 10,
      // events: {
      //   load: function () {
      //     // set up the updating of the chart each second
      //     var series = this.series[0];
      //     setInterval(function () {
      //       var x = new Date().getTime(), // current time
      //         y = Math.random();
      //       series.addPoint([x, y], true, true);
      //     }, 1000);
      //   },
      // },
    },
    title: {
      text: 'Live random data',
    },
    xAxis: {
      minPadding: 0,
      maxPadding: 0,
      plotLines: [
        {
          color: '#888',
          value: state.asks.length && state.asks[0][0],
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
    series: [
      {
        name: 'Bids',
        // data: [
        //   [0.1435, 242.521842],
        //   [0.1436, 206.49862099999999],
        //   [0.1437, 205.823735],
        //   [0.1438, 197.33275],
        //   [0.1439, 153.677454],
        //   [0.144, 146.007722],
        //   [0.1442, 82.55212900000001],
        //   [0.1443, 59.152814000000006],
        //   [0.1444, 57.942260000000005],
        //   [0.1445, 57.483850000000004],
        //   [0.1446, 52.39210800000001],
        //   [0.1447, 51.867208000000005],
        //   [0.1448, 44.104697],
        //   [0.1449, 40.131217],
        //   [0.145, 31.878217],
        //   [0.1451, 22.794916999999998],
        //   [0.1453, 12.345828999999998],
        //   [0.1454, 10.035642],
        //   [0.148, 9.326642],
        //   [0.1522, 3.76317],
        //   [0.1522, 3.76317],
        // ],
        data: processData(state.bids, 'bids', true),
        color: '#03a7a8',
      },
      {
        name: 'Asks',
        // data: [
        //   [0.1524, 0.948665],
        //   [0.1539, 35.510715],
        //   [0.154, 39.883437],
        //   [0.1541, 40.499661],
        //   [0.1545, 43.262994000000006],
        //   [0.1547, 60.14799400000001],
        //   [0.1553, 60.30799400000001],
        //   [0.1558, 60.55018100000001],
        //   [0.1564, 68.381696],
        //   [0.1567, 69.46518400000001],
        //   [0.1569, 69.621464],
        //   [0.157, 70.398015],
        //   [0.1574, 70.400197],
        //   [0.1575, 73.199217],
        //   [0.158, 77.700017],
        //   [0.1583, 79.449017],
        //   [0.1588, 79.584064],
        //   [0.159, 80.584064],
        //   [0.16, 81.58156],
        //   [0.1608, 83.38156],
        // ],
        data: processData(state.asks, 'asks', false),
        color: '#fc5857',
      },
    ],
  };

  const options = {
    global: {
      useUTC: false,
    },
    lang: {
      decimalPoint: ',',
      thousandsSep: '.',
    },
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'green'}}>
      <View style={{flex: 1, backgroundColor: 'black'}}>
        <ChartView
          style={{height: 300, overflow: 'hidden'}}
          config={conf}
          options={options}
          originWhitelist={['']}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          useWebKit={true}
          scalesPageToFit={undefined}></ChartView>
      </View>
    </SafeAreaView>
  );
};

export default HeighChart1;
