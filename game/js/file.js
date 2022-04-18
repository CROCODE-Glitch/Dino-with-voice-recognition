let container = document.querySelector("#container");
let dino = document.querySelector("#dino");
let block = document.querySelector("#block");
let road = document.querySelector("#road");
let cloud = document.querySelector("#cloud");
let score = document.querySelector("#score");
let gameOver = document.querySelector("#gameOver");
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.continuous = true;

//declaring variable for score
let interval = null;
let playerScore = 0;

window.onload = () => {

    autoJarvis();
    readOut("Ready to play Sir");


 // auto friday

 function autoJarvis() {
    setTimeout(() => {
    recognition.start();
    }, 1000);
};

}




//start Game



//function for score
let scoreCounter = () => {
    playerScore++;
    score.innerHTML = `Score <b>${playerScore}</b>`;
}

var synth = window.speechSynthesis;

recognition.onstart = function(){
    console.log("Speech Recognition started!");
};


recognition.onresult = function (event) {
    let current = event.resultIndex;
    let transcript = event.results[current][0].transcript;
    transcript = transcript.toLowerCase();
    console.log(transcript);

    // close voice recognition
    if (transcript.includes("stop")) {
        readOut("Okay Sir");
        gameOver.style.display = "block";
        block.classList.remove("blockActive");
        road.firstElementChild.style.animation = "none";
        cloud.firstElementChild.style.animation = "none";
        clearInterval(interval);
        playerScore = 0;
      }

      if(transcript.match("close")){
        readOut("Closing the voice recognition");
        stopingR = true;
        recognition.stop();
      }

if(transcript.match("up")){
    if(dino.classList != "dinoActive"){
      readOut('Going Up')
      dino.classList.add("dinoActive");

      //  remove class after 0.5 seconds
      setTimeout(() => {
          dino.classList.remove("dinoActive");
      }, 500);
    }
  } 

  var start;

  if(transcript.match("start")){
      readOut('Starting the game')
      gameOver.style.display = "none";
      block.classList.add("blockActive");
      road.firstElementChild.style.animation = "roadAnimate 1.5s linear infinite";
      cloud.firstElementChild.style.animation = "cloudAnimate 50s linear infinite";
      //score
      let playerScore = 0;
      interval = setInterval(scoreCounter, 200);
    }
  }


function readOut(message) {
  const speech = new SpeechSynthesisUtterance();
  speech.text = message;
  speech.volume = 1;
  speech.rate = 1;
  speech.pitch = 1;
  window.speechSynthesis.speak(speech);
  console.log("Speaking out");
  
}



recognition.onend = function () {
  if (stopingR === false) {
    setTimeout(() => {
      recognition.start();
    }, 500);
  } else if (stopingR === true) {
    recognition.stop();
  }
};



window.addEventListener("keydown", (start) => {
  //    console.log(start);
  if (start.code == "Space") {
      gameOver.style.display = "none";
      block.classList.add("blockActive");
      road.firstElementChild.style.animation = "roadAnimate 1.5s linear infinite";
      cloud.firstElementChild.style.animation = "cloudAnimate 50s linear infinite";

      //score
      let playerScore = 0;
      interval = setInterval(scoreCounter, 200);
  }
});

