const compareButton = document.querySelector("#btn");
const imgUrl = "images/";
const endpoint = "./dino.json";

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
