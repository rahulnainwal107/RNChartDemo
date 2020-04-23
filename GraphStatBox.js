import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const GraphStatBox = ({ total, date }) => {
  return (
    <View style={styles.body}>
      <Text style={styles.date}>{date}</Text>
      <Text style={styles.text}>{`£${total}`}</Text>
      <View style={styles.triangle}/>
      <View style={styles.pin}/>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    width: 160,
    paddingTop: 12,
    paddingBottom: 8,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 8
  },
  text: {
    color: '#000',
    letterSpacing: 1,
    fontWeight: '700',
    fontSize: 32
  },
  date: {
    textTransform: 'uppercase',
    letterSpacing: 1
  },
  triangle: {
    position: 'absolute',
    bottom: -10,
    borderTopWidth: 10,
    borderRightWidth: 6,
    borderBottomWidth: 0,
    borderLeftWidth: 6,
    borderTopColor: '#fff',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
  },
  pin: {
    position: 'absolute',
    bottom: -190,
    height: 180,
    width: 0.5,
    backgroundColor: '#303030'
  }
});

export default GraphStatBox;