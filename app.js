const achievements = [
  {
    name: "Welcome to the Hamster Wheel",
    points: 10
},
  {
    name: "Getting the hang of things 'round here?",
    points: 100
},
  {
    name: "You're not giving up that easily, are you?",
    points: 500
},
  {
    name: "Stop no-lifing.",
    points: 1500
}
];
const question = document.getElementById("question");
const miniwrapper = document.querySelector(".mini-wrapper");
const buttons = miniwrapper.querySelectorAll("button");
const account = document.getElementById("account");
const accountTab = document.getElementById("account-tab");
const continueB = document.getElementById("next");
const counter = document.getElementById("pointcount");
const feedback = document.getElementById("answer-feedback");
const logInForm = document.querySelector("form");
const coverBG = document.getElementById("log-in");
const greeting = document.getElementById("greet");
const stats = document.getElementById("stats");
const achievementTab = document.getElementById("achievement-container");
const invidAchievements = achievementTab.querySelectorAll("li");
const achievementies = Array.from(invidAchievements);
const plusanione = document.getElementById("plusone");
let clength = 0;
let blength = buttons.length;
let accOpen = false;
let operation = undefined;
let corrAnswer = undefined;
let points = Number(localStorage.getItem("YourScore") || 0);
let correct = Number(localStorage.getItem("correctSoFar")) || 0;
let incorrect = Number(localStorage.getItem("incorrectSoFar")) || 0;
let countries = [];

function check() {
  fetch("countries.json")
  .then((response) => { return response.json() })
  .then((data) => {
    countries = data;
    return countries
  })
  .then((loadedCountries) => {
    console.log(loadedCountries);
    console.log(clength);
    start();
  })
};




logInForm.addEventListener("submit", (event) => {
  event.preventDefault();
  let username = document.querySelector("#nameInput").value;
  localStorage.setItem("nickname", username);
  coverBG.style.display = "none";
  greetUpdate();
});

account.addEventListener("click", () => {
  if (accOpen) {
    accountTab.style.display = "none";
    accOpen = false;
  } else {
    accountTab.style.display = "flex";
    accountTab.style.flexDirection = "column";
    accOpen = true;
  }
});

function getRandomPair(length) {
  let counter = Math.floor(
    Math.random() * length);
  return counter;
};

function start() {
  if (localStorage.getItem("nickname") !== null) {
    coverBG.style.display = "none";
  }else{};
  buttons.forEach(button => {
    button.textContent = "";
    button.disabled = false;
    button.classList.remove("correct", "incorrect");
  })
  achievementies.forEach((field, index) => {
    field.textContent = achievements[index].name;
  });
  continueB.style.display = "none";
  feedback.style.display = "none";
  clength = countries.length;
  operation = getRandomPair(clength);
  question.textContent = "Minek a fővárosa " + countries[operation].capital + "?";
  corrAnswer = countries[operation].name;
  buttons[getRandomPair(blength)].textContent = (countries[operation].name);
  returnedCountries = filter(countries, countries[operation]);
  buttons.forEach(writingCapitals);
  achievementCheck()
  greetUpdate()
};

function writingCapitals(button) {
  if (button.textContent.trim() == "") {
    let randomIndex = getRandomPair(returnedCountries.length);
    button.textContent = returnedCountries[randomIndex].name;
    returnedCountries = filter(returnedCountries, returnedCountries[randomIndex]);
  } else{}
};

function filter(list, x) {
  let convertedarray = Array.from(list);
  let filtered = convertedarray.filter(number => number != x);
  return filtered;
};

continueB.addEventListener("click", () => {
  start();
});

buttons.forEach(button => {
  button.addEventListener("click", () => {
    if (button.textContent.trim() === corrAnswer) {
      buttons.forEach(button => {
        button.disabled = true;
      })
      points += 10;
      correct += 1;
      localStorage.setItem("correctSoFar", correct);
      feedback.style.color = "green";
      feedback.textContent = "Correct!";
      button.classList.add("correct");
      feedback.style.display = "block";
      pointsUpdate();
      correctAnswer();
      continueB.style.display = "block";
    } else {
      button.disabled = true;
      points -= 5;
      incorrect += 1;
      localStorage.setItem("incorrectSoFar", incorrect);
      feedback.style.color = "red";
      feedback.textContent = "Incorrect! Try again!";
      button.classList.add("incorrect");
      feedback.style.display = "block";
      pointsUpdate();
      incorrectAnswer();
    }
  });
});

function pointsUpdate() {
  localStorage.setItem("YourScore", points);
  counter.textContent = "Points: " + localStorage.getItem("YourScore");
  stats.textContent = "Points: " + localStorage.getItem("YourScore")
    + "\nCorrect: " + correct
    + "\nIncorrect: " + incorrect
  ;
};

function greetUpdate() {
  greeting.textContent = "Helló, " + localStorage.getItem("nickname");
};

function achievementCheck() {
  achievements.forEach((achi, index) => {
    if (localStorage.getItem("achievement" + index) === "unlocked"){
      achievementies[index].style.color = "green";
    } else if (achi.points <= points) {
      alert("Achievement unlocked: " + achi.name);
      achievementies[index].style.color = "green";
      localStorage.setItem("achievement" + index, "unlocked")
    }
  });
};

function correctAnswer() {
  plusanione.style.color = "green";
  plusanione.style.animation = "none";

  setTimeout(function () {
    plusanione.style.display = "block";
    plusanione.style.animation = "effect 2s 1 normal forwards";
  }, 10)
}

function incorrectAnswer() {
  plusanione.style.color = "red";
  plusanione.style.animation = "none";

  setTimeout(function () {
    plusanione.style.display = "block";
    plusanione.style.animation = "effect 2s 1 normal forwards";
  }, 10)
}

check();
pointsUpdate();
