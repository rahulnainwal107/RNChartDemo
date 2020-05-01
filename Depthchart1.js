import React from 'react';
import {View, Text, SafeAreaView, Platform} from 'react-native';
import {WebView} from 'react-native-webview';

const chart = require('./Chart1.html');
const isAndroid = Platform.OS === 'android' ? true : false;

const Depthchart1 = () => {
  return (
    <SafeAreaView>
      <WebView
        source={isAndroid ? {uri: 'file:///android_asset/chart.html'} : chart}
        //injectedJavaScript={INJECTED_JAVASCRIPT}
        //onMessage={this.onMessage}
      />
    </SafeAreaView>
  );
};

export default Depthchart1;
