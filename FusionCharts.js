import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, SafeAreaView} from 'react-native';
import FusionCharts from 'react-native-fusioncharts';
export default class PlainColumn2D extends Component {
  constructor(props) {
    super(props);
    //STEP 2 - Chart Data
    const chartData = [
      {label: 'Venezuela', value: '290'},
      {label: 'Saudi', value: '260'},
      {label: 'Canada', value: '180'},
      {label: 'Iran', value: '140'},
      {label: 'Russia', value: '115'},
      {label: 'UAE', value: '100'},
      {label: 'US', value: '30'},
      {label: 'China', value: '30'},
    ];
    //STEP 3 - Chart Configurations
    const chartConfig = {
      type: 'column2d',
      width: '100%',
      height: '400',
      dataFormat: 'json',
      dataSource: {
        chart: {
          caption: 'Countries With Most Oil Reserves [2017-18]',
          subCaption: 'In MMbbl = One Million barrels',
          xAxisName: 'Country',
          yAxisName: 'Reserves (MMbbl)',
          numberSuffix: 'K',
          theme: 'fusion',
        },
        data: chartData,
      },
    };
    this.state = chartConfig;
    this.libraryPath = Platform.select({
      // Specify fusioncharts.html file location
      android: {
        uri: 'file:///android_asset/fusioncharts.html',
      },
      ios: require('./assets/fusioncharts.html'),
    });
  }
  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          <Text style={styles.header}>A Column 2D Chart</Text>
          <View style={styles.chartContainer}>
            <FusionCharts
              type={this.state.type}
              width={this.state.width}
              height={this.state.height}
              dataFormat={this.state.dataFormat}
              dataSource={this.state.dataSource}
              libraryPath={this.libraryPath} // set the libraryPath property
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    padding: 10,
  },

  header: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    paddingBottom: 10,
  },

  chartContainer: {
    height: 400,
    borderColor: '#000',
    borderWidth: 1,
  },
});
