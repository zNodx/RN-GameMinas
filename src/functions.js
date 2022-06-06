const createBoard = (rows, columns) => {
  return Array(rows).fill(0).map((_,row) =>{
    return Array(columns).fill(0).map((_,column) => {
      return {
        row,
        column,
        opened: false,
        flagged: false,
        mined: false,
        exploded: false,
        nearMines: 0,
      }
    })
  })
}

const spreadMines = (board, minesAmount) => {
  const rows = board.length
  const columns = board[0].length
  let minesPlanted = 0
  while (minesPlanted < minesAmount) {
    const rowSelected = parseInt(Math.random() * rows, 10)
    const columnSelected = parseInt(Math.random() * columns, 10) 
    if(!board[rowSelected][columnSelected].mined) {
      board[rowSelected][columnSelected].mined = true
      minesPlanted++
    }
  }
}

export const createMinedBoard = (rows, columns, minesAmount) => {
  const board = createBoard(rows, columns)
  spreadMines(board, minesAmount)
  return board
}

const cloneBoard = board => {
  return board.map(rows =>{
    return rows.map(field =>{
      return {...field}
    })
  })
} 

const getNeighbours = (board, row, column) => {
  const neighbors = []
  const rows = [row - 1, row, row + 1]
  const columns = [column - 1, column, column + 1]
  rows.forEach(r => {
    columns.forEach(c =>{
      const different = r !== row || c !== column
      const validRow = r >= 0 && r < board.length
      const validColumn = c >= 0 && c < board[0].length
      if (different && validRow && validColumn) {
        neighbors.push(board[r][c])
      }
    })
  })
  return neighbors
}

const safeNeighbours = (board, row, column) => {
  const safes = (result, neighbor) => result && !neighbor.mined
  return getNeighbours(board, row, column).reduce(safes, true)
}

const openField = (board, row, column) => {
  const field = board[row][column]
  if (!field.opened) {
    field.opened = true
    if (field.mined) {
      field.exploded = true
    } else if (safeNeighbours(board, row, column)) {
      console.log('safe');
      getNeighbours(board, row, column).forEach(n => openField(board, n.row, n.column))
    }else{
      const neighbors = getNeighbours(board, row, column)
      field.nearMines = neighbors.filter(n => n.mined).length
    }
  }
}

const fields = board => [].concat(...board)

const hadExplosion = board => fields(board).filter(field => field.exploded).length > 0

const pendding = field => (field.mined && !field.flagged) || (!field.mined && !field.opened)

const wonGame = board => fields(board).filter(pendding).length === 0

const showMines = board => fields(board).filter(field => field.mined).forEach(field => field.opened = true)

const invertFlag = (board, row, column) => {
  console.log('invertFlag');
  const field = board[row][column]
  field.flagged = !field.flagged
}

const flagUsed = board => fields(board).filter(field => field.flagged).length

export { 
  cloneBoard,
  openField,
  hadExplosion,
  wonGame,
  showMines,
  invertFlag,
  flagUsed
}