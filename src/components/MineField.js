import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Field from './Field'
const MineField = ({board, onOpenField, onSelectField}) => {
  const rows = board.map((row, r) => {
    const columns = row.map((field, c) =>{
        return <Field key={c} onSelect={e => onSelectField(board,r,c)} onOpen={() => onOpenField(board,r,c)} {...field} />
    })
    return <View style={{flexDirection: 'row'}} key={r}>{columns}</View>
  }) 
  return <View style={styles.container}>{rows}</View>
}

export default MineField

const styles = StyleSheet.create({
  container: {
    margin: 5,
    backgroundColor: '#EEE',
  }
})