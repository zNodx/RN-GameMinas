import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Flag = ({bigger}) => {
  return (
    <View style={styles.container}>
      <View style={[styles.flagpole, bigger && styles.flagpoleBigger]}/>
      <View style={[styles.flag, bigger && styles.flagBigger]}/>
      <View style={[styles.base1, bigger && styles.base1Bigger]}/>
      <View style={[styles.base2, bigger && styles.base2Bigger]}/>
    </View>
  )
}

export default Flag

const styles = StyleSheet.create({
  container: {
    marginTop: 2
  },
  flagpole: {
    position: 'absolute',
    width: 2,
    height: 14,
    backgroundColor: '#222',  
    marginLeft: 9
  },
  flag: {
    position: 'absolute',
    width:6,
    height:5,
    backgroundColor: '#F22',
    marginLeft: 3,
  },
  base1: {
    position: 'absolute',
    width: 6,
    height: 2,
    backgroundColor: '#222',
    marginLeft: 7,
    marginTop: 10,
  },
  base2: {
    position: 'absolute',
    width: 10,
    height: 2,
    backgroundColor: '#222',
    marginLeft: 5,
    marginTop: 12,
  },flagpoleBigger :{
    width: 4,
    height: 28,
    marginLeft: 16,
  },
  flagBigger: {
    width: 14,
    height:4,
    marginLeft: 3,
  },
  base1Bigger: {
    height: 4,
    marginTop: 20,
    width: 12,
    marginLeft: 12,
  },
  base2Bigger: {
    height: 4,
    marginTop: 24,
    width: 20,
    marginLeft: 8,
  }
})