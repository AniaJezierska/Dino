const compareButton = document.querySelector("#btn");
const imgUrl = "images/";
const endpoint = "./dino.json";
const form = document.querySelector("#dino-compare");

function AnimalSpec(species, height, weight, diet) {
  this.species = species;
  this.height = height;
  this.weight = weight;
  this.diet = diet;
  this.image = `${imgUrl}${species.toLowerCase()}.png`;
}

function Dino(species, height, weight, diet, when, where, fact) {
  Individual.call(this, species, height, weight, diet);
  this.when = when;
  this.where = where;
  this.fact = fact;
}

Dino.prototype = Object.create(AnimalSpec.prototype);
Dino.prototype.constructor = Dino;

function Human(name, height, weight, diet) {
  Individual.call(this, "human", height, weight, diet);
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
