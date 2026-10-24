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
let clength = countries.length;
let blength = buttons.length;
let lenght = undefined;
let accOpen = false;

account.addEventListener("click", () => {
  if (accOpen) {
    accountTab.style.display = "none";
    accOpen = false;
  } else {
    accountTab.style.display = "flex";
    accOpen = true;
  }
});

function getRandomPair(length) {
  let counter = Math.floor(
    Math.random() * length);
  return counter;
};

function start() {
  let currentquestion = getRandomPair(clength);
  question.textContent = "Minek a fővárosa " + capitals[currentquestion] + "?";
  buttons[getRandomPair(blength)].textContent = (countries[currentquestion]);
  buttons.forEach(writingCapitals);
};

function writingCapitals(button) {
  if (button.textContent.trim() == "") {
    button.textContent = countries[getRandomPair(clength)];
  } else{}
};

start();
