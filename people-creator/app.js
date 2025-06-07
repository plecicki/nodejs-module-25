const fs = require('fs');

const genders = ['M', 'F'];
const maleNames = ['Piotr', 'Mateusz', 'Adrian', 'Wiktor'];
const femaleNames = ['Agata', 'Agnieszka', 'Monika', 'Sonia'];
const lastNames = ['Krzeslo', 'Szafka', 'Witryna', 'Obraz'];

const getRandomChoice = max => Math.floor(Math.random() * max);

const randChoice = arr => arr[getRandomChoice(arr.length)];

const people = [];

for (let i = 0; i < 20; i++) {
  const person = {};
  person.gender = randChoice(genders);
  if (person.gender === 'M') person.firstName = randChoice(maleNames);
  else if (person.gender === 'F') person.firstName = randChoice(femaleNames);
  person.lastName = randChoice(lastNames);
  person.age = 18 + getRandomChoice(60);
  people.push(person);
}

const peopleJSON = JSON.stringify(people);

fs.writeFile('people.json', peopleJSON, (err) => {
  if (err) throw err;
  console.log('The file has been saved!');
});