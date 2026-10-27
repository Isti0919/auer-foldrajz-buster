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
const cont = document.getElementById("next");
let clength = countries.length;
let blength = buttons.length;
let lenght = undefined;
let accOpen = false;
let operation = undefined;
let returnedCountries = undefined;
let returnedCapitals = undefined;
let write = undefined;
let corrAnswer = undefined;

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
  operation = getRandomPair(clength);
  question.textContent = "Minek a fővárosa " + capitals[operation] + "?";
  corrAnswer = countries[operation];
  buttons[getRandomPair(blength)].textContent = (countries[operation]);
  returnedCountries = filter(countries, countries[operation]);
  returnedCapitals = filter(capitals, capitals[operation]);
  buttons.forEach(writingCapitals);
};

function writingCapitals(button) {
  if (button.textContent.trim() == "") {
    operation = getRandomPair(returnedCountries.length);
    button.textContent = returnedCountries[operation];
    returnedCountries = filter(returnedCountries, returnedCountries[operation]);
    returnedCapitals = filter(returnedCapitals, returnedCapitals[operation]);
  } else{}
};

function filter(list, x) {
  let convertedarray = Array.from(list);
  let filtered = convertedarray.filter(number => number != x);
  return filtered;
};

next.addEventListener("click", () => {
  start();
});

buttons.forEach(button => {
  button.addEventListener("click", () => {
    if (button.textContent.trim() === corrAnswer) {
      alert("Correct!")
    } else {
      alert("False!")
    }
  });
});
start();
