const compareButton = document.querySelector("#btn");
const imgUrl = "images/";
const endpoint = "./dino.json";
const form = document.querySelector("#dino-compare");

function capitalize(word) {
  return `${word[0].toUpperCase()}${word.slice(1)}`;
}

function randomItemArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function AnimalSpec(species, height, weight, diet) {
  this.species = species;
  this.height = height;
  this.weight = weight;
  this.diet = diet;
  this.image = `${imgUrl}${species.toLowerCase()}.png`;
}

function Dino(species, height, weight, diet, when, where, fact) {
  AnimalSpec.call(this, species, height, weight, diet);
  this.when = when;
  this.where = where;
  this.fact = fact;
}

Dino.prototype = Object.create(AnimalSpec.prototype);
Dino.prototype.constructor = Dino;

function Human(name, height, weight, diet) {
  AnimalSpec.call(this, "human", height, weight, diet);
  this.name = name;
  this.diet = diet;
}

Human.prototype = Object.create(AnimalSpec.prototype);
Human.prototype.constructor = Human;

// Create Dino Compare Method 1 - Diet
const compareDiet = function (humanDiet, dino) {
  return dino.diet === humanDiet
    ? `Wow!!! You and ${dino.species} has the same diet!`
    : `You have so different diet! ${dino.species} is ${dino.diet}`;
};

// Create Dino Compare Method 2 - Height
const compareHeight = function (humanHeight, dino) {
  let diffHeight = dino.height - humanHeight;

  return dino.height > humanHeight
    ? `The ${dino.species} is ${diffHeight} inches taller than you!`
    : dino.height < humanHeight
    ? `Wow!!! You're ${Math.abs(diffHeight)} inches taller than the ${
        dino.species
      }!`
    : `Amazing!!! You're as tall as ${dino.species}`;
};

// Create Dino Compare Method 3 - Weight
const compareWeight = function (humanWeight, dino) {
  let diffWeight = dino.weight - humanWeight;
  return dino.weight > humanWeight
    ? `The ${dino.species} is ${diffWeight} lbs heavier than you!`
    : dino.weight < humanWeight
    ? `Wow!!! You're ${Math.abs(diffWeight)} lbs heavier than the ${
        dino.species
      }!`
    : `Amazing!!! You're as heavy as ${dino.species}`;
};

const factWhere = function (dino) {
  return `The ${dino.species} lived in ${dino.where}`;
};

const factWhen = function (dino) {
  return `The ${dino.species} lived in the ${dino.when}`;
};

const getRandomFact = function (human, dino) {
  const factDino = dino.fact;
  const factHeight = compareHeight(human.height, dino);
  const factDiet = compareDiet(human.diet, dino);
  const factWeight = compareWeight(human.weight, dino);
  const factHabitat = factWhere(dino);
  const factPeriod = factWhen(dino);

  const facts = [
    factDino,
    factHeight,
    factDiet,
    factWeight,
    factHabitat,
    factPeriod,
  ];
  return facts;
};

function handleError(err) {
  console.log("Oh no!!");
  console.log(err);
}

async function fetchData() {
  const response = await fetch(endpoint);
  const data = await response.json();
  return data;
}

async function handleClick() {
  const humanObject = () => {
    return (function () {
      const name =
        document.querySelector('[name="name"]').value || "Your name here!";
      const heightFeet =
        parseInt(document.querySelector('[name="feet"]').value) || 0;
      const heightInches =
        parseInt(document.querySelector('[name="inches"]').value) || 0;
      const height = heightFeet * 12 + heightInches;
      const weight = document.querySelector('[name="weight"]').value;
      const diet = document.querySelector('[name="diet"]').value.toLowerCase();

      const myHuman = new Human(name, height, weight, diet);
      return myHuman;
    })();
  };

  const allData = await fetchData().catch(handleError);

  const allDinos = allData.Dinos.map((dino) => {
    const fact =
      dino.species == "Pigeon"
        ? dino.fact
        : randomItemArray(getRandomFact(humanObject(), dino));
    return new Dino(
      dino.species,
      dino.height,
      dino.weight,
      dino.diet,
      dino.when,
      dino.where,
      fact
    );
  });

  const generateTiles = function (human, dinos) {
    let tiles = [];
    tiles = dinos;
    tiles.splice(4, 0, human);

    let tilesHTML = [];
    const mainGrid = document.querySelector("#grid");

    tiles.map((tile) => {
      if (tile.species == "human") {
        tilesHTML = `
        <div class="grid-item">
          <h3>${capitalize(tile.name)}</h3>
          <img src="${tile.image}" alt="image of ${tile.species}">
        </div>
      `;
      } else if (tile.species == "Pigeon") {
        tilesHTML = `
        <div class="grid-item">
          <h3>${tile.species}</h3>
          <img src="${tile.image}" alt="image of ${tile.species}">
          <p>${tile.fact}</p>
        </div>
      `;
      } else {
        tilesHTML = `
        <div class="grid-item">
          <h3>${tile.species}</h3>
          <img src="${tile.image}" alt="image of ${tile.species}">
          <p>${tile.fact}</p>
        </div>
      `;
      }

      const myFragment = document
        .createRange()
        .createContextualFragment(tilesHTML);
      mainGrid.insertAdjacentHTML("beforeend", tilesHTML);
    });
  };

  generateTiles(humanObject(), allDinos);
  form.classList.add("hidden");
}

compareButton.addEventListener("click", handleClick);
