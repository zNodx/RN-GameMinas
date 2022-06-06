import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import params from '../params'
import Mine from './Mine'
import Flag from './Flag'
const Field = ({mined, opened, nearMines, exploded, flagged, onOpen, onSelect}) => {
  const styleField = [styles.field]
  if (opened) styleField.push(styles.opened)
  if (exploded) styleField.push(styles.exploded)
  if (flagged) styleField.push(styles.flagged)
  if (!opened && !exploded) styleField.push(styles.regular)

  let color = null
  if (nearMines > 0) {
    if (nearMines === 1) color = '#2A28D7'
    if (nearMines === 2) color = '#2ED72E'
    if (nearMines >= 3 && nearMines <= 5) color = '#D72E2E'
    if (nearMines >= 6) color = '#D7D72E'
  }
  return (
    <TouchableWithoutFeedback onLongPress={onSelect} onPress={onOpen}>
    <View style={styleField}>
        {!mined && opened && nearMines > 0 && <Text style={[styles.label, {color: color}]}>{nearMines}</Text>  }
        {mined && opened && <Mine />}
        {flagged && !opened && <Flag />}
    </View>
    </TouchableWithoutFeedback>
  )
}

export default Field

const styles = StyleSheet.create({
  field: {
    height: params.blockSize,
    width: params.blockSize,
    borderWidth: params.borderSize,
  },
  regular: {
    backgroundColor: '#999',
    borderBottomColor: '#333',
    borderRightColor: '#333',
    borderLeftColor: '#CCC',
    borderTopColor: '#CCC',
  },
  opened: {
    backgroundColor: '#999',
    borderColor: '#777',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontWeight: 'bold',
    fontSize: params.fontSize,
  },
  exploded: {
    backgroundColor: 'red',
    borderColor: 'orange',
  },
})