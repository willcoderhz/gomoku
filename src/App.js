import React from 'react';
import Game from './Game'; // 假设你的 Game 组件在 'Game.js' 文件中
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <Game />
      </div>
    );
  }
}

export default App;