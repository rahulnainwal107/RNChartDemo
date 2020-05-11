import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import {
  VictoryBar,
  VictoryAxis,
  VictoryCandlestick,
  VictoryChart,
  VictoryTheme,
  VictoryArea,
  VictoryLine,
} from 'victory-native';
import Menu, {MenuItem, MenuDivider} from 'react-native-material-menu';
import Icons from 'react-native-vector-icons/MaterialIcons';
import IonIcon from 'react-native-vector-icons/Ionicons';

const Multipchart = () => {
  const [state, setState] = useState({data: [], chartType: 'candlestick'});
  const setMenuRef = useRef(null);
  const chartMenuRef = useRef(null);
  useEffect(() => {
    const apiSetup = axios.create({
      baseURL:
        'https://min-api.cryptocompare.com/data/v2/histoday?fsym=BTC&tsym=USD&limit=50',
      timeout: 10000,
    });
    const response = apiSetup
      .get('')
      .then((res) => setState({...state, data: res.data.Data.Data}))
      .catch((error) => console.log(error));
  }, []);

  console.log('State ', state.data);
  const values = () => {
    const ar =
      state &&
      state.data.map((item) => {
        return {x: item.time, y: item.close};
      });
    return ar;
  };
  const showMenu = () => {
    setMenuRef.current.show();
  };
  const hindeMenu = () => {
    setMenuRef.current.hide();
  };
  const changeChart = (chartName) => {
    setState({...state, chartType: chartName});
    chartMenuRef.current.hide();
  };
  const showChartMenu = () => {
    chartMenuRef.current.show();
  };
  const graphType = () => {
    if (state.chartType === 'candlestick') {
      return (
        <View style={styles.container}>
          <VictoryChart scale={{x: 'time'}}>
            <VictoryAxis tickFormat={(t) => `${t.getDate()}/${t.getMonth()}`} />
            <VictoryAxis dependentAxis />
            <VictoryCandlestick
              candleColors={{positive: '#5f5c5b', negative: '#c43a31'}}
              data={state.data.length > 0 ? state.data : null}
            />
          </VictoryChart>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <VictoryChart scale={{x: 'time'}}>
            <VictoryAxis
              tickValues={state.data.map(
                (item) =>
                  new Date(item.time).getFullYear() +
                  '/' +
                  new Date(item.time).getDate(),
              )}
              tickCount={5}

              //scale={{ x: "time" }}
            />
            <VictoryAxis
              dependentAxis
              tickValues={state && state.data.map((item) => item.close)}
              tickCount={5}
              orientation="right"
              //scale={{ y: "time" }}
            />
            <VictoryLine
              style={{
                data: {stroke: '#c43a31'},
                parent: {border: '1px solid #ccc'},
              }}
              data={state.data.length > 0 ? values() : null}
            />
          </VictoryChart>
        </View>
      );
    }
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'black',
            justifyContent: 'space-between',
            height: 50,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Menu
              ref={setMenuRef}
              button={
                <TouchableOpacity
                  onPress={showMenu}
                  style={{
                    marginHorizontal: 20,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Text onPress={showMenu} style={{color: 'white'}}>
                    1 Day
                  </Text>
                  <Icons name="arrow-drop-down" size={25} color="white" />
                </TouchableOpacity>
              }>
              <MenuItem onPress={hindeMenu}>1 Day</MenuItem>
              <MenuItem onPress={hindeMenu}>2 Day</MenuItem>
            </Menu>
            <Menu
              ref={chartMenuRef}
              button={
                <TouchableOpacity
                  onPress={showChartMenu}
                  style={{
                    marginHorizontal: 20,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Text onPress={showChartMenu} style={{color: 'white'}}>
                    💹
                  </Text>
                  <Icons name="arrow-drop-down" size={25} color="white" />
                </TouchableOpacity>
              }>
              <MenuItem onPress={changeChart.bind(this, 'candlestick')}>
                CandleStick
              </MenuItem>
              <MenuItem onPress={changeChart.bind(this, 'LineChart')}>
                Line
              </MenuItem>
            </Menu>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={null}
              style={{
                marginHorizontal: 20,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Icons name="settings" size={25} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={null}
              style={{
                marginHorizontal: 20,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <IonIcon name="ios-expand" size={25} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        {graphType()}
      </View>
    </SafeAreaView>
  );
};

export default Multipchart;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
  },
});
