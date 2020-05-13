import React from 'react';
import {View, StyleSheet} from 'react-native';
import WebView from 'react-native-webview';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <WebView
          source={require('./DepthChart/index.html')}
          injectedJavaScript="Drawchart();"
          style={{flex: 1}}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
});
