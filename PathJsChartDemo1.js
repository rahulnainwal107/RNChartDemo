import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';

import data from './data.json';

const PathJsChartDemo1 = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        <View>
          <View
            style={{
              flexDirection: 'row',
              height: 50,
              alignItems: 'center',
              justifyContent: 'space-between',
              marginHorizontal: 20,
            }}>
            <Button title="10m" onPress={() => this.changeData(40)} />
            <Button title="30m" onPress={() => this.changeData(30)} />
            <Button title="1H" onPress={() => this.changeData(20)} />
            <Button title="8H" onPress={() => this.changeData(10)} />
            <Button title="1D" onPress={() => this.changeData(0)} />
          </View>
          <View style={{height: 350}}>
            <Chart initScript={initScript(data)} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PathJsChartDemo1;
