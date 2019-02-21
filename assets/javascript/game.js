// All game information safely contained within this object.
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
    './assets/images/mario.jpg',
    './assets/images/sonic.jpg',
    './assets/images/cloud.png',
    './assets/images/megaman.png',
    './assets/images/link.png',
    './assets/images/kirby.png',
    './assets/images/spyro.png',
    './assets/images/yoshi.png',
    './assets/images/samus.jpg',
    './assets/images/scorpion.png',
    './assets/images/crash.png',
    './assets/images/gameover.png'
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

var mushroomImg = './assets/images/mushroom.png'

var gameInfoDiv = document.getElementById('game-title')
var wordToGuessDiv = document.getElementById("word-to-guess")
var guessesDiv = document.getElementById("guesses")
var lettersGuessedDiv = document.getElementById("letters-guessed")
var winsDiv = document.getElementById("wins")
var imgDiv = document.getElementById("img-div")

document.onkeyup = (event) => {
  // Adjust to lowercase in the event of capslock or something
  var key = event.key.toLowerCase()
  // Check if the key being pressed by the user is a-z and not longer then 1 character
  // since backspace and enter are all lettersseems to pass this test
  if(key.match(/[a-z]$/g) && key.length === 1){
    //check if game round has started or needs to be started
    if(gameObj.gameStarted){
      // Logic for actually playing the game
      // check if the key pressed has already been guessed or not
      if(gameObj.wrongGuesses.indexOf(key) === -1 && gameObj.progress.indexOf(key) === -1){
        // Check if the users guess is in the current word being guessed
        // If it is, put it in each position within progress it needs to be
        if(gameObj.currentWord.indexOf(key) !== -1){
          for(i=0;i<gameObj.currentWord.length;i++){
            if(gameObj.currentWord[i] === key){
              // If the first letter of the word (name), capitalize it!
              // Otherwise, simply add the lowercase letter as needed.
              if(i===0){
                gameObj.progress[i] = key.toUpperCase()
              } else {
                gameObj.progress[i] = key;
              }
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
          // Remove mushrooms img elements as user guesses wrong (1 as to not remove the "Guesses Remaining" text)
          guessesDiv.removeChild(guessesDiv.childNodes[1])
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
      guessesDiv.innerHTML = ''
      // Create and add img elements of mario mushrooms for each guess remaining.
      for(i=0;i<gameObj.guesses;i++){
        var newImg = document.createElement('img')
        newImg.setAttribute('src', mushroomImg)
        // Add "Guesses Remaining: " to the top of the mushrooms to clarify what they are there for.
        // Could probably just rewrite some HTML/CSS to make this work, but decided I wanted to do this instead.
        if(i===0){
          var paragraph = document.createElement('p')
          paragraph.innerText = "Guesses Remaining:"
          paragraph.style.width = "100%"
          guessesDiv.appendChild(paragraph)
        }
        guessesDiv.appendChild(newImg)
      }
      gameObj.currentWord.map((v, i)=>{
        gameObj.progress.push('_')
      })
      document.getElementById('right-side').style.display = "block"
      updatePage()
    }
  // For when the user doesn't push an appropriate letter key for a guess.
  } else {
    console.log('Please choose a letter. :(')
  }
}
// Function for updating the contents of the page.
function updatePage(){
  if(gameObj.gameStarted){
    gameInfoDiv.innerText = "The game has started!"
    imgDiv.style.display = "block"
    imgDiv.src = './assets/images/questionblock.jpg'
  } else {
    gameInfoDiv.innerHTML = "You win!<br>Press any key to play again!"
  }
  wordToGuessDiv.innerText = gameObj.progress.join(' ')
  var guessImgs = []
  lettersGuessedDiv.innerText = gameObj.wrongGuesses.join(' ')
  winsDiv.innerText = `Wins: ${gameObj.wins} / ${gameObj.gamesCompleted}`
}
