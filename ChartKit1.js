import React from 'react';
import {View, Text, Dimensions, SafeAreaView} from 'react-native';
import {LineChart} from 'react-native-chart-kit';

const ChartKit1 = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <LineChart
          data={{
            labels: ['January', 'February', 'March', 'April'],
            datasets: [
              {
                data: [
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                ],
              },
            ],
          }}
          width={Dimensions.get('window').width - 16} // from react-native
          height={220}
          yAxisLabel={'Rs'}
          chartConfig={{
            backgroundColor: 'pink',
            backgroundGradientFrom: 'white',
            backgroundGradientTo: 'white',
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 255) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          bezier
          style={{
            marginVertical: 0,
            borderRadius: 0,
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default ChartKit1;
