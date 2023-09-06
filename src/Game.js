import React from 'react';
import './Game.css';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: Array(15).fill(null).map(() => Array(15).fill(null)), // 15x15的棋盘，初始时每个格子都为空
      xIsNext: true, // 用来表示轮到谁下棋，true表示轮到X（我们可以假设X是黑子），false表示轮到O（白子）
    };
  }

  // 定义一个函数来处理点击事件
  handleClick(i, j) {
    // 如果当前格子已经有棋子，不做任何操作
    if (this.state.board[i][j]) {
      return;
    }
  
    // 复制当前的棋盘状态
    const board = this.state.board.map(row => row.slice());
  
    // 在当前格子放置新的棋子
    board[i][j] = this.state.xIsNext ? 'X' : 'O';
  
    // 更新棋盘的状态和当前的玩家
    this.setState({
      board: board,
      xIsNext: !this.state.xIsNext,
    });
  }
  
  checkWinner(board) {
    const directions = [
      {x: 0, y: 1}, // horizontal
      {x: 1, y: 0}, // vertical
      {x: 1, y: 1}, // main diagonal
      {x: 1, y: -1}, // secondary diagonal
    ];
  
    for (let i = 0; i < 15; i++) {
      for (let j = 0; j < 15; j++) {
        if (board[i][j]) {
          for (let direction of directions) {
            if (this.checkDirection(board, i, j, direction)) {
              return board[i][j];
            }
          }
        }
      }
    }
  
    return null;
  }
  
  checkDirection(board, startX, startY, direction) {
    const player = board[startX][startY];
    for (let i = 0; i < 5; i++) {
      const x = startX + i * direction.x;
      const y = startY + i * direction.y;
      if (x < 0 || x >= 15 || y < 0 || y >= 15 || board[x][y] !== player) {
        return false;
      }
    }
    return true;
  }

  render() {
    const winner = this.checkWinner(this.state.board);
    let status;
    if (winner) {
      status = 'Winner: ' + (winner === 'X' ? 'Black' : 'White');
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'Black' : 'White');
    }
  
    const board = this.state.board.map((row, i) => {
      return (
        <div key={i}>
          {row.map((cell, j) => {
            return (
              <button
                className={cell}
                key={j}
                onClick={() => winner ? null : this.handleClick(i, j)}
              >
                {cell}
              </button>
            );
          })}
        </div>
      );
    });
  
    return (
      <div className="game">
        <div className='title'><h2>Gomoku</h2></div>
        <div className="status">{status}</div>
        <div>{board}</div>
      
      </div>
    );
  }
}

export default Game;
