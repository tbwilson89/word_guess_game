var gameObj = {
  wordArr: [
    "mario",
    "sonic",
    "cloud",
    "megaman",
    "link",
    "kirby",
    "spyro",
    "yoshi",
    "samus",
    "scorpion",
    "crash"
  ],
  imgArr: [
    'https://i.pinimg.com/originals/a7/87/88/a78788d285a647701307d615d5d2a08b.jpg',
    'https://i.pinimg.com/originals/d0/9c/eb/d09cebb232577543a684bee4ae350878.jpg',
    'https://www.ssbwiki.com/images/thumb/5/57/Cloud_SSB4.png/1200px-Cloud_SSB4.png',
    'https://vignette.wikia.nocookie.net/robotsupremacy/images/f/fe/Mega_Man_-_Version_11.png/revision/latest?cb=20190204130552',
    'https://vignette.wikia.nocookie.net/theunitedorganizationtoonsheroes/images/6/68/Link-0.png/revision/latest?cb=20171009143548',
    'https://kirby.nintendo.com/assets/img/intro/kirby-star2.png',
    'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/intermediary/f/520452d2-1c61-4216-a3d6-7ba0c59ab7f7/dcsrwby-c792ce2e-47ab-4cab-a455-31075aa4039e.png',
    'https://vignette.wikia.nocookie.net/yoshi/images/8/8d/Yoshi_SSBU.png/revision/latest?cb=20180628045711',
    'https://images-na.ssl-images-amazon.com/images/I/61VDJIPbIfL._SY879_.jpg',
    'https://www.clipartmax.com/png/middle/184-1844225_scorpion-clipart-mortal-kombat-ultimate-mortal-kombat-3-scorpion.png',
    'https://www.seekpng.com/png/detail/139-1390532_crash-bandicoot-crash-bandicoot-png.png',
    'https://www.mtlblog.com/u/2018/11/21/49e6e237049def5606f47f353fa7f72679148a2c.jpg_1200x630.jpg',
    'https://vignette.wikia.nocookie.net/game-over-dex/images/f/f4/Super_Mario_World_%28Unl%29-0.png/revision/latest?cb=20130519202011'
  ],
  musicArr: [
    './assets/sounds/mario_world_st_clear.mp3',
    './assets/sounds/mario_snes-game_over.mp3'
  ],
  gameStarted: false,
  wins: 0,
  gamesCompleted: 0,
  currentWord: '',
  guesses: 0,
  wrongGuesses: [],
  progress: [],
}

var gameInfoDiv = document.getElementById('game-info')
var wordToGuessDiv = document.getElementById("word-to-guess")
var guessesDiv = document.getElementById("guesses")
var lettersGuessedDiv = document.getElementById("letters-guessed")
var winsDiv = document.getElementById("wins")
var imgDiv = document.getElementById("img-div")

document.onkeyup = (event) => {
  var key = event.key.toLowerCase()
  if(key.match(/[a-z]/i) && key.length === 1){
    if(gameObj.gameStarted){
      if(gameObj.wrongGuesses.indexOf(key) === -1 && gameObj.progress.indexOf(key) === -1){
        if(gameObj.currentWord.indexOf(key) !== -1){
          for(i=0;i<gameObj.currentWord.length;i++){
            if(gameObj.currentWord[i] === key){
              gameObj.progress[i] = key;
            }
          }
          if(gameObj.progress.indexOf('_') === -1){
            console.log('You win!')
            var audio = new Audio(gameObj.musicArr[0])
            audio.play()
            gameObj.wins++
            gameObj.gamesCompleted++
            gameObj.gameStarted = !gameObj.gameStarted;
            imgDiv.src = gameObj.imgArr[gameObj.wordArr.indexOf(gameObj.currentWord.join(''))]
            imgDiv.style.display = "block"
          }
        } else {
          console.log(`It's not in the word...`)
          gameObj.wrongGuesses.push(key)
          gameObj.guesses--
          if(gameObj.guesses === 0){
            var audio = new Audio(gameObj.musicArr[1])
            audio.play()
            gameObj.gamesCompleted++
            gameObj.gameStarted = !gameObj.gameStarted
            imgDiv.src = gameObj.imgArr[gameObj.imgArr.length - 1]
            imgDiv.style.display = "block"
          }
        }
      } else {
        console.log(`Please make a guess that you haven't already made`)
      }
      updatePage()
    } else {
      gameObj.gameStarted = !gameObj.gameStarted
      gameObj.currentWord = gameObj.wordArr[Math.floor(Math.random() * gameObj.wordArr.length)].split('')
      gameObj.guesses = 12
      gameObj.wrongGuesses = []
      gameObj.progress = []
      gameObj.currentWord.map((v, i)=>{
        gameObj.progress.push('_')
      })
      imgDiv.style.display = "none"
      updatePage()
    }
  } else {
    console.log('Please choose a letter. :(')
  }
}

function updatePage(){
  if(gameObj.gameStarted){
    gameInfoDiv.innerText = "The game has started!"
  } else {
    gameInfoDiv.innerText = "You win! Press any key to play again!"
  }
  wordToGuessDiv.innerText = gameObj.progress.join(' ')
  guessesDiv.innerText = gameObj.guesses
  lettersGuessedDiv.innerText = gameObj.wrongGuesses.join(' ')
  winsDiv.innerText = `Wins: ${gameObj.wins} / ${gameObj.gamesCompleted}`
}
