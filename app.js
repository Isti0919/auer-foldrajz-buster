const countries = [
    "Albania",
    "Austria",
    "Belgium",
    "Croatia",
    "Czechia",
    "Denmark",
    "Finland",
    "France",
    "Germany",
    "Greece",
    "Hungary",
    "Iceland",
    "Ireland",
    "Italy",
    "Netherlands",
    "Norway",
    "Poland",
    "Portugal",
    "Romania",
    "Slovakia",
    "Spain",
    "Sweden",
    "Switzerland",
    "Ukraine",
    "United Kingdom"
];

const capitals = [
    "Tirana",
    "Vienna",
    "Brussels",
    "Zagreb",
    "Prague",
    "Copenhagen",
    "Helsinki",
    "Paris",
    "Berlin",
    "Athens",
    "Budapest",
    "Reykjavik",
    "Dublin",
    "Rome",
    "Amsterdam",
    "Oslo",
    "Warsaw",
    "Lisbon",
    "Bucharest",
    "Bratislava",
    "Madrid",
    "Stockholm",
    "Bern",
    "Kyiv",
    "London"
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
const statistics = document.getElementById("stats");
let clength = countries.length;
let blength = buttons.length;
let accOpen = false;
let operation = undefined;
let returnedCountries = undefined;
let write = undefined;
let corrAnswer = undefined;
let points = Number(localStorage.getItem("YourScore") || 0);

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
  continueB.style.display = "none";
  feedback.style.display = "none";
  operation = getRandomPair(clength);
  question.textContent = "Minek a fővárosa " + capitals[operation] + "?";
  corrAnswer = countries[operation];
  buttons[getRandomPair(blength)].textContent = (countries[operation]);
  returnedCountries = filter(countries, countries[operation]);
  returnedCapitals = filter(capitals, capitals[operation]);
  buttons.forEach(writingCapitals);
  greetUpdate()
};

function writingCapitals(button) {
  if (button.textContent.trim() == "") {
    let randomIndex = getRandomPair(returnedCountries.length);
    button.textContent = returnedCountries[randomIndex];
    returnedCountries = filter(returnedCountries, returnedCountries[randomIndex]);
    returnedCapitals = filter(returnedCapitals, returnedCapitals[randomIndex]);
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
      feedback.style.color = "green";
      feedback.textContent = "Correct!";
      button.classList.add("correct");
      feedback.style.display = "block";
      pointsUpdate();
      continueB.style.display = "block";
    } else {
      button.disabled = true;
      points -= 5;
      feedback.style.color = "red";
      feedback.textContent = "Incorrect! Try again!";
      button.classList.add("incorrect");
      feedback.style.display = "block";
      pointsUpdate();
    }
  });
});

function pointsUpdate() {
  localStorage.setItem("YourScore", points);
  counter.textContent = "Points: " + localStorage.getItem("YourScore");
  stats.textContent = "Points: " + localStorage.getItem("YourScore");
};

function greetUpdate() {
  greeting.textContent = "Helló, " + localStorage.getItem("nickname");
};

start();
pointsUpdate();
