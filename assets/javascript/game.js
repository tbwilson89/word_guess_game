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
  //Check if the key being pressed by the user is a-z and not an F key, since F5 seems to pass this test
  if(key.match(/[a-z]/i) && key.length === 1){
    //check if game round has started or needs to be started
    if(gameObj.gameStarted){
      //Logic for actually playing the game
      //check if the key pressed has already been guessed or not
      if(gameObj.wrongGuesses.indexOf(key) === -1 && gameObj.progress.indexOf(key) === -1){
        // Check if the users guess is in the current word being guessed
        // If it is, put it in each position within progress it needs to be
        if(gameObj.currentWord.indexOf(key) !== -1){
          for(i=0;i<gameObj.currentWord.length;i++){
            if(gameObj.currentWord[i] === key){
              gameObj.progress[i] = key;
            }
          }
          // Check if any more letters need to be guessed or if word is completed
          // If completed, add to wins, play victory music and show image as well as adjust everything else as necessary.
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
          // If not a correct guess, add letter to wrong guesses, reduce guesses remaining
        } else {
          console.log(`It's not in the word...`)
          gameObj.wrongGuesses.push(key)
          gameObj.guesses--
          // Check if user is out of guesses
          // Play losing music and adjust things as necessary to prepare for restarting the game
          if(gameObj.guesses === 0){
            var audio = new Audio(gameObj.musicArr[1])
            audio.play()
            gameObj.gamesCompleted++
            gameObj.gameStarted = !gameObj.gameStarted
            imgDiv.src = gameObj.imgArr[gameObj.imgArr.length - 1]
            imgDiv.style.display = "block"
          }
        }
      // For when a user pushes a key they already guessed.
      } else {
        console.log(`Please make a guess that you haven't already made`)
      }
      // Update the content of the page after all chagnes have been made based on the users guess.
      updatePage()
    } else {
      //Logic for initial setup of the game and when starting a new round.
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
  // For when the user doesn't push an appropriate letter key for a guess.
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
