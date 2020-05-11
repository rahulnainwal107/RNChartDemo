import React, {useState} from 'react';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import HighchartsReactNative from '@highcharts/highcharts-react-native';

const HeighChart = () => {
  const [state, setState] = useState({
    chartOptions: {
      series: [{type: 'column', data: [1, 3, 2]}],
    },
  });
  const modules = ['highcharts-more', 'solid-gauge'];
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <HighchartsReactNative
          styles={styles.container}
          options={state.chartOptions}
          useCDN={true}
          useSSL={true}
          modules={modules}
        />
      </View>
    </SafeAreaView>
  );
};

export default HeighChart;

const styles = StyleSheet.create({
  container: {
    // height: 200,
    // width: 200,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
