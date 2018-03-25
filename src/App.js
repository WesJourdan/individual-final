import React, { Component } from 'react';
import Paddle from './components/paddle'
import Ball from './components/ball'
import Scoreboard from './components/scoreboard'
const Loop = require('./scripts/loop');

let gameState = {
  ball: {
    x: Math.floor(Math.random() * 10) + 5,
    y: Math.floor(Math.random() * 10) + 5,
    vx: 10 * (Math.random() < 0.5 ? 1 : -1),
    vy: 10 * (Math.random() < 0.5 ? 1 : -1)
  },
  score: {
    left: 0,
    right: 0
  },
  paddle: {
    left: {
      x: 0.25,
      y: 5
    },
    right: {
      x: 29 - 0.25,
      y: 5
    }
  }
  
}


class App extends Component {

  constructor(props) {
    super(props);

  }

  render() {
    const style = {
      width: '30em',
      height: '20em',
      backgroundColor: 'black'
    }

    return (
      <div style={style}>
        < Scoreboard position={'left'} score={gameState.score.left} />
        < Scoreboard position={'right'} score={gameState.score.right} />
        < Paddle paddle={gameState.paddle.left} />
        < Paddle paddle={gameState.paddle.right} />
        < Ball ball={gameState.ball} />      
      </div>
    );
  }

  componentDidMount () {
    
    Loop((tick) => {
      gameState.ball.x += gameState.ball.vx * tick
      gameState.ball.y += gameState.ball.vy * tick
      this.forceUpdate()

      // reverse velocity on collision with sides.
      if (gameState.ball.x > 28.9 && gameState.ball.vx > 0) {
        gameState.ball.vx *= -1
        gameState.score.left++
        console.log(gameState.ball.y)
      }
      if (gameState.ball.x < 0.1 && gameState.ball.vx < 0) {
        gameState.ball.vx *= -1
        gameState.score.right++
        console.log(gameState.score)
      }
      if (gameState.ball.y > 19 && gameState.ball.vy > 0) {
        gameState.ball.vy *= -1
      }
      if (gameState.ball.y < 0.1 && gameState.ball.vy < 0) {
        gameState.ball.vy *= -1
      }

      //collision for paddles
      if (gameState.ball.x > 28.9 - 1
        && gameState.ball.vx > 0
        && gameState.ball.y < gameState.paddle.right.y + 4
        && gameState.ball.y >= gameState.paddle.right.y - 1) {
        gameState.ball.vx *= -1
      }
      if (gameState.ball.x < 0.1 + 1
        && gameState.ball.vx < 0
        && gameState.ball.y < gameState.paddle.left.y + 4
        && gameState.ball.y >= gameState.paddle.left.y - 1) {
        gameState.ball.vx *= -1
      }

    });
  }
}

export default App;
