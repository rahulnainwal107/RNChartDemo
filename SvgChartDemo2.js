import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  View,
} from 'react-native';
import {LineChart} from 'react-native-svg-charts';
import GraphStatBox from './GraphStatBox';
import LinearGradient from 'react-native-linear-gradient';
import {DATA} from './Data';
import * as shape from 'd3-shape';

class SvgChartDemo2 extends React.Component {
  _scrollRef;

  constructor() {
    super();

    this.state = {
      data: [],
      dataPointsOnScreen: 6,
      pinIndex: 0,
      pinPosition: 0,
      incrementWidth: 0,
    };
  }

  componentWillMount() {
    const {dataPointsOnScreen} = this.state;
    const width =
      (DATA.length / dataPointsOnScreen) * Dimensions.get('window').width;
    this.setState({incrementWidth: width / DATA.length});
  }

  _onScrollEnd = (event) => {
    const {pinIndex, incrementWidth} = this.state;
    let arr = [];
    const currentPos = event.nativeEvent.contentOffset.x;
    const previousIndex = pinIndex;
    const nextIndex = pinIndex + 1;
    arr.push(previousIndex * incrementWidth);
    arr.push(nextIndex * incrementWidth);

    const closest = arr.reduce((prev, curr) => {
      return Math.abs(curr - currentPos) < Math.abs(prev - currentPos)
        ? curr
        : prev;
    });

    console.log(this._scrollRef);

    this._scrollRef && this._scrollRef.scrollTo({x: closest, duration: 300});
  };

  _updateDataPointOnGraph = (event) => {
    const {pinIndex, incrementWidth} = this.state;

    if (event.nativeEvent.contentOffset.x > incrementWidth * (pinIndex + 1)) {
      this.setState({pinIndex: this.state.pinIndex + 1});
    } else if (event.nativeEvent.contentOffset.x < incrementWidth * pinIndex) {
      this.setState({pinIndex: this.state.pinIndex - 1});
    }
  };

  render() {
    const {pinIndex, dataPointsOnScreen} = this.state;
    const width =
      (DATA.length / dataPointsOnScreen) * Dimensions.get('window').width;

    return (
      <SafeAreaView style={styles.container}>
        <LinearGradient
          style={styles.gradient}
          colors={['#a9f3ff', '#ffb2f6', '#ffd0bd']}
          start={{x: 0, y: 1}}
          end={{x: 1, y: 0}}
        />
        <View style={styles.body}>
          <View style={styles.stats}>
            <GraphStatBox
              total={DATA[pinIndex + 5].value}
              date={DATA[pinIndex + 5].date}
            />
          </View>
          <ScrollView
            bounce={false}
            ref={(ref) => (this._scrollRef = ref)}
            style={styles.scrollView}
            scrollEventThrottle={16}
            horizontal={true}
            onScroll={this._updateDataPointOnGraph}
            onScrollEndDrag={this._onScrollEnd}
            showsHorizontalScrollIndicator={false}>
            <LineChart
              curve={shape.curveCatmullRomOpen}
              style={{height: 140, width: width}}
              data={DATA}
              yAccessor={({item}) => item.value}
              svg={{stroke: '#000', strokeWidth: 2}}
              contentInset={{
                top: 30,
                left: 0,
                right: 0,
                bottom: 10,
              }}></LineChart>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 40,
  },
  stats: {
    alignItems: 'center',
    marginBottom: 40,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.5,
  },
  scrollView: {
    marginLeft: -Dimensions.get('window').width / 2 + 44,
  },
});

export default SvgChartDemo2;
