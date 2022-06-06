import React, {useState} from 'react';
import {StyleSheet, Text, View, Alert} from 'react-native';
import params from './src/params'
import MineField from './src/components/MineField'
import Header from './src/components/Header'
import { createMinedBoard,   cloneBoard,
  openField,
  hadExplosion,
  wonGame,
  showMines,
  invertFlag,
  flagUsed} from './src/functions';

export default App = () => {

  const cols = params.getColumnsAmount()
  const rows = params.getRowAmount()

  const minesAmount = () =>  Math.ceil(cols * rows * params.difficultLevel)
  const [board, setBoard] = useState({ board: createMinedBoard(rows, cols, minesAmount()), won: false, lost: false});

  const onOpenField = (boardi,row, column) => {
    const board = cloneBoard(boardi)
    openField(board, row, column)
    const lost = hadExplosion(board)
    const won = wonGame(board)

    if (lost) {
      showMines(board)
      Alert.alert('Perdeeeeu!', 'Que pena você perdeu!')
    }

    if (won) {
      Alert.alert('Parabéns', 'Você Venceu!')
    }

    setBoard({ board, lost, won })
  }

  const onSelectField = (boardi,row, column) => {
    const board = cloneBoard(boardi)
    invertFlag(board, row, column)
    const won = wonGame(board)

    if (won) {
      Alert.alert('Parabéns', 'Você Venceu!')
    }

    setBoard({ board, won })
  }


  return (
      <View style={styles.container}>
        <Header flagsLeft={minesAmount() - flagUsed(board.board)}
          onNewGame={() => setBoard({ board: createMinedBoard(rows, cols, this.minesAmount()), won: false, lost: false})} 
          onFlagPress={() => this.setState({ showLevelSelection: true })} />
        <View style={styles.board}>
          <MineField board={board.board} 
            onOpenField={onOpenField}
            onSelectField={onSelectField} />
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  board: {
    alignItems: 'center',
    backgroundColor: '#AAA'
  }
});