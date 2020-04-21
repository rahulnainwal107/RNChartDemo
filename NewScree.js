import React from 'react';
import {View, Text, SafeAreaView, Platform} from 'react-native';
import {WebView} from 'react-native-webview';

const file = require('./chart.html');

const isAndroid = Platform.OS === 'android' ? true : false;

export default function NewScree() {
  const INJECTED_JAVASCRIPT = `(function() {
        window.ReactNativeWebView.postMessage(JSON.stringify(window.location));
    })();`;

  return (
    <SafeAreaView style={{flex: 1}}>
      <WebView
        source={isAndroid ? {uri: "file:///android_asset/chart.html"} : file}
        injectedJavaScript={INJECTED_JAVASCRIPT}
        //onMessage={this.onMessage}
      />
    </SafeAreaView>
  );
}
