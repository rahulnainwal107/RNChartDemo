import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import styled from 'styled-components';
import {ClipPath, Defs, LinearGradient, Rect, Stop} from 'react-native-svg';
import {AreaChart, Path, XAxis, YAxis} from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import * as scale from 'd3-scale';
import {asks, bids} from './DepthChartData';

const axisData = [
  50,
  10,
  40,
  95,
  -4,
  -24,
  85,
  91,
  35,
  53,
  -53,
  24,
  50,
  -20,
  -80,
];

const contentInset = {top: 20, bottom: 20};

function DepthChart() {
  if (asks.length === 0 || bids.length === 0) return <Text>No data</Text>;

  const data = [...bids, ...asks];
  const indexToBidClipFrom = bids[bids.length - 1].price;
  const idnexToAskClipFrom = asks[0].price;

  const AskGradient = () => (
    <Defs key={'defs'}>
      <LinearGradient
        id={'ask-gradient'}
        x1={'0%'}
        y={'0%'}
        x2={'0%'}
        y2={'100%'}>
        <Stop offset={'0%'} stopColor={'rgb(255, 104, 51)'} stopOpacity={0.8} />
        <Stop
          offset={'100%'}
          stopColor={'rgb(255, 104, 51)'}
          stopOpacity={0.2}
        />
      </LinearGradient>
    </Defs>
  );

  const BidGradient = () => (
    <Defs key={'defs'}>
      <LinearGradient
        id={'bid-gradient'}
        x1={'0%'}
        y={'0%'}
        x2={'0%'}
        y2={'100%'}>
        <Stop offset={'0%'} stopColor={'rgb(51, 255, 60)'} stopOpacity={0.8} />
        <Stop
          offset={'100%'}
          stopColor={'rgb(51, 255, 60)'}
          stopOpacity={0.2}
        />
      </LinearGradient>
    </Defs>
  );

  const Clips = ({x, width}) => (
    <Defs key={'clips'}>
      <ClipPath id={'clip-path-bid'} key={'0'}>
        <Rect x={0} y={'0'} width={x(indexToBidClipFrom)} height={'100%'} />
      </ClipPath>
      <ClipPath id="clip-path-ask" key={'1'}>
        <Rect
          x={x(idnexToAskClipFrom)}
          y={'0'}
          width={width - x(idnexToAskClipFrom)}
          height={'100%'}
        />
      </ClipPath>
    </Defs>
  );

  const BidLine = ({line}) => (
    <Path
      key={'line'}
      d={line}
      stroke={'#00c38c'}
      fill={'none'}
      clipPath={'url(#clip-path-bid)'}
    />
  );

  const AskLine = (paths) => {
    return (
      <Path
        key={'line'}
        stroke={'#f94d5c'}
        d={paths.line}
        fill={'none'}
        clipPath={'url(#clip-path-ask)'}
      />
    );
  };

  return (
    <Container>
      <Indicators />
      <DepthChartWrapper>
        <AreaChart
          style={{flex: 1}}
          data={data}
          contentInset={{top: 30, bottom: 30}}
          svg={{
            fill: 'url(#bid-gradient)',
            clipPath: 'url(#clip-path-bid)',
          }}
          curve={shape.curveStep}
          yAccessor={({item}) => item.total}
          xAccessor={({item}) => item.price}
          xScale={scale.scaleLinear}>
          <BidGradient />
          <Clips />
        </AreaChart>

        <AreaChart
          style={StyleSheet.absoluteFill}
          data={data}
          contentInset={{top: 30, bottom: 30}}
          svg={{
            fill: 'url(#ask-gradient)',
            clipPath: 'url(#clip-path-ask)',
          }}
          curve={shape.curveStep}
          yAccessor={({item}) => item.total}
          xAccessor={({item}) => item.price}
          xScale={scale.scaleLinear}>
          <AskGradient />
          <Clips />
          <BidLine />
          <AskLine />
        </AreaChart>
      </DepthChartWrapper>
      <PriceIndicators
        bidPrice={bids[bids.length - 1].price}
        askPrice={asks[0].price}
      />
    </Container>
  );
}

export default DepthChart;

function Indicators() {
  return (
    <Centered>
      <Indicator>
        <BidSquare />
        <IndicatorText>Bid</IndicatorText>
      </Indicator>
      <Indicator>
        <AskSquare />
        <IndicatorText>Ask</IndicatorText>
      </Indicator>
    </Centered>
  );
}

function PriceIndicators({bidPrice, askPrice}) {
  return (
    <PriceWrapper>
      <Centered>
        {bidPrice === askPrice ? (
          <IndicatorText>{bidPrice}</IndicatorText>
        ) : (
          <IndicatorText>
            {bidPrice}&#32;&#32;&#32;&#32;{askPrice}
          </IndicatorText>
        )}
      </Centered>
    </PriceWrapper>
  );
}

const Container = styled(View)`
  padding: 0 5px 0 10px;
  justify-content: flex-end;
`;

const DepthChartWrapper = styled(View)`
  height: 220px;
`;

const PriceWrapper = styled(View)`
  left: 10px;
  right: 5px;
  position: absolute;
  bottom: 5px;
`;

const Centered = styled(View)`
  flex-direction: row;
  justify-content: center;
`;

const Indicator = styled(View)`
  flex-direction: row;
  padding: 0 5px;
`;

const BidSquare = styled(View)`
  width: 12px;
  height: 12px;
  margin-right: 5px;
  background-color: #00c38c;
`;

const AskSquare = styled(BidSquare)`
  background-color: #f94d5c;
`;

const IndicatorText = styled(Text)`
  font-size: 12px;
  color: #394362;
`;
