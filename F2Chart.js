import React from 'react';
import {View, Text, ScrollView, Button, SafeAreaView} from 'react-native';
import Chart from 'react-native-f2chart';

import data from './data.json';

const initScript = (data) => `
(function(){
    chart =  new F2.Chart({
        id: 'chart',
        pixelRatio: window.devicePixelRatio,
    });
    chart.source(${JSON.stringify(data)}, {
    value: {
    tickCount: 5,
    min: 0
    },
    date: {
    type: 'timeCat',
    range: [0, 1],
    tickCount: 3
    }
    });
    chart.tooltip({
    custom: true,
    showXTip: true,
    showYTip: true,
    snap: true,
    onChange: function(obj) {
        window.postMessage(stringify(obj))
    },
    crosshairsType: 'xy',
    crosshairsStyle: {
    lineDash: [2]
    }
    });
    chart.axis('date', {
    label: function label(text, index, total) {
    var textCfg = {};
    if (index === 0) {
        textCfg.textAlign = 'left';
    } else if (index === total - 1) {
        textCfg.textAlign = 'right';
    }
    return textCfg;
    }
    });
    chart.line().position('date*value');
    chart.render();
})();
`;

const F2Chart = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <View>
            <View style={{height: 350}}>
              <Chart initScript={initScript(data)} />
            </View>
          </View>
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default F2Chart;
