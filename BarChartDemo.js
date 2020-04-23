import React from 'react';
import {AppRegistry, StyleSheet, Text, View, processColor} from 'react-native';

import {BarChart} from 'react-native-charts-wrapper';

export default class BarChartDemo extends React.Component {
  constructor() {
    super();
  }
  render() {
    const data = {
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
        dataSets: [
          {
            values: [
              {y: 100},
              {y: 105},
              {y: 102},
              {y: 110},
              {y: 114},
              {y: 109},
              {y: 105},
              {y: 99},
              {y: 105},
              {y: 110},
              {y: 115},
              {y: 120},
            ],
            label: 'Bar dataSet',
            config: {
              color: processColor('#F6AD5F'),
              barShadowColor: processColor('#EF8413'),
              highlightAlpha: 90,
              highlightColor: processColor('#ff3333'),
              valueTextSize: 8,
            },
          },
        ],
        config: {
          barWidth: 0.5,
        },
      },
      highlights: [{x: 3}, {x: 8}, {x: 12}],
      xAxis: {
        valueFormatter: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
        granularityEnabled: true,
        granularity: 1,
        position: 'BOTTOM',
        drawGridLines: false,
      },
      yAxis: {
        left: {
          granularityEnabled: false,
          granularity: 100,
        },
        right: {
          enabled: false,
        },
        drawGridLines: true,
      },
    };
    // const handleSelect = (event) => {
    //     let entry = event.nativeEvent
    //     if (entry == null) {
    //         this.setState({ ...this.state, selectedEntry: null })
    //     } else {
    //         this.setState({ ...this.state, selectedEntry: JSON.stringify(entry) })
    //     }

    //     console.log(event.nativeEvent)
    // }
    return (
      <View style={{flex: 1}}>
        <View style={{height: 300}}>
          <BarChart
            style={{flex: 1}}
            data={data.data}
            xAxis={data.xAxis}
            yAxis={data.yAxis}
            animation={{durationX: 2000}}
            legend={data.legend}
            //gridBackgroundColor={processColor('#ffffff')}
            visibleRange={{x: {min: 0, max: 6}}}
            drawBarShadow={false}
            drawValueAboveBar={true}
            drawHighlightArrow={true}
            //onSelect={handleSelect.bind(this)}
            highlights={data.highlights}
            chartDescription={{text: ''}}
            //onChange={(event) => console.log(event.nativeEvent)}
          />
        </View>
      </View>
    );
  }
}
