'use strict'

const store = require('../scripts/store.js')
const api = require('./api.js')

const players = [
  {
    loggedIn: false,
    isTurn: false
  },
  {
    loggedIn: false,
    isTurn: false
  }
]

const createPlayer = function () {
  if (players[0].email === undefined) {
    players[0].email = store.user.email
    // document.querySelector('.lfg').textContent = 'Need Another Player'
    if (players[0].loggedIn === false) {
      players[0].loggedIn = true
    }
  } else if (players[1].email === undefined) {
    players[1].email = store.user.email
    if (players[1].loggedIn === false) {
      players[1].loggedIn = true
    }
    if (players[0].isTurn === false) {
      players[0].isTurn = true
    }
  }
}

let id = 0

const gameboard = ['', '', '', '', '', '', '', '', '']

const playHere = function () {
  id = this.id
  console.log('id is now ' + id)
  if (players[0].loggedIn === true && players[0].isTurn === true) {
    console.log("player_x's turn")
    if (isValidMove(id) === true) {
      gameboard[this.id] = 'x'
      document.getElementById(id).textContent = 'X'
      winLose()
    }
  } else {
    $('#info').append("Can't play yet. Make sure you are logged in and have started a game.")
    setTimeout(clearText, 2000)
  }
}

const isValidMove = function (id) {
  if (gameboard[id] === '') {
    console.log('valid move')
    return true
  } else if (gameboard[id] !== '') {
    console.log('not a valid move')
    return false
  }
}

const winLose = function () {
  if (gameboard[0] !== '' && gameboard[0] === gameboard[1] && gameboard[0] === gameboard[2]) {
    endGame()
    $('#info').append('Congratulations on completing the game.')
    setTimeout(clearText, 2000)
  } else if (gameboard[0] !== '' && gameboard[0] === gameboard[3] && gameboard[0] === gameboard[6]) {
    endGame()
    $('#info').append('Congratulations on completing the game.')
    setTimeout(clearText, 2000)
  } else if (gameboard[0] !== '' && gameboard[0] === gameboard[4] && gameboard[0] === gameboard[8]) {
    endGame()
    $('#info').append('Congratulations on completing the game.')
    setTimeout(clearText, 2000)
  } else if (gameboard[1] !== '' && gameboard[1] === gameboard[4] && gameboard[1] === gameboard[7]) {
    endGame()
    $('#info').append('Congratulations on completing the game.')
    setTimeout(clearText, 2000)
  } else if (gameboard[2] !== '' && gameboard[2] === gameboard[4] && gameboard[2] === gameboard[6]) {
    endGame()
    $('#info').append('Congratulations on completing the game.')
    setTimeout(clearText, 2000)
  } else if (gameboard[2] !== '' && gameboard[2] === gameboard[5] && gameboard[2] === gameboard[8]) {
    endGame()
    $('#info').append('Congratulations on completing the game.')
    setTimeout(clearText, 2000)
  } else if (gameboard[3] !== '' && gameboard[3] === gameboard[4] && gameboard[3] === gameboard[5]) {
    endGame()
    $('#info').append('Congratulations on completing the game.')
    setTimeout(clearText, 2000)
  } else if (gameboard[6] !== '' && gameboard[6] === gameboard[7] && gameboard[6] === gameboard[8]) {
    endGame()
    $('#info').append('Congratulations on completing the game.')
    setTimeout(clearText, 2000)
  } else {
    console.log('no winner yet')
    checkTie()
  }
}

const checkTie = function () {
  if (gameboard.every(i => i !== '')) {
    $('#info').append('No! You tied! Everybody loses :(')
    setTimeout(clearText, 2000)
    endGame()
  } else {
    nextTurn()
  }
}

const nextTurn = function () {
  if (players[0].isTurn === true) {
    const index = id
    const value = 'x'
    const gameOver = false
    console.log('index = ' + index + ', value = ' + value + ', gameOver = ' + gameOver)
    console.log('gameplay-events thinks token is ' + store.user.token)
    api.updateGame(index, value, gameOver)
  } else if (players[1].isTurn === true) {
    const index = id
    const value = 'o'
    const gameOver = false
    console.log('index = ' + index + ', value = ' + value + ', gameOver = ' + gameOver)
    console.log('gameplay-events thinks token is ' + store.user.token)
    api.updateGame(index, value, gameOver)
  }
  if (players[0].isTurn === true) {
    players[0].isTurn = false
    players[1].isTurn = true
    console.log('player x turn is ' + players[0].isTurn)
    console.log('player o turn is ' + players[1].isTurn)
  } else if (players[0].isTurn === false) {
    players[0].isTurn = true
    players[1].isTurn = false
    console.log('player x turn is ' + players[0].isTurn)
    console.log('player o turn is ' + players[1].isTurn)
  }
}

const endGame = function () {
  console.log('endGame function')
  document.getElementById('game-over').value = 'true'
  players[0].isTurn = false
  players[1].isTurn = false
  console.log('player x turn = ' + players[0].isTurn)
  console.log('player o turn = ' + players[1].isTurn)
  if (players[0].isTurn === true) {
    const index = gameboard[id]
    const value = 'x'
    const gameOver = false
    api.updateGame(index, value, gameOver)
  } else if (players[1].isTurn === true) {
    const index = gameboard[id]
    const value = 'o'
    const gameOver = false
    api.updateGame(index, value, gameOver)
  }
}

const clearBoard = function () {
  for (let i = 0; i < gameboard.length; i++) {
    gameboard[i] = ''
    document.getElementById(i).textContent = ''
  }
}

const clearText = function () {
  console.log('clear text function')
  document.getElementById('info').textContent = ''
}

module.exports = {
  playHere,
  createPlayer,
  players,
  clearBoard,
  endGame
}
