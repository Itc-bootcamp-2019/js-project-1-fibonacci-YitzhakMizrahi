const pets = ["cat", "dog", "rat"];
let petsPlural = pets.map(function(el) {
  return el + "s";
});
console.log(petsPlural);
