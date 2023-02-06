const result = document.getElementById("result");
const form = document.querySelector("form");
const input = document.querySelector("input");

let recipes = [];
async function fetchRecipes(search) {
  let url = "data/recipes.json";
  // generate the Response object
  await fetch(`${url}?s=${search}`)
    .then((res) => res.json())
    .then((data) => (recipes = data.recipes));
  console.log(recipes);
}
console.log("start filter");
console.log(fetchRecipes(search));
console.log("end filter");

function recipesDisplay() {
  for (var i = 0; i < recipes.length; i++) {
    if (recipes === null) {
      result.innerHTML = "<h2>Aucun résultat</h2>";
    } else {
      result.innerHTML = recipes
        .map((recipe) => {
          for (var i = 0; i < recipe.ingredients.length; i++) {
            var ingredient = recipe.ingredients[i];
            var ingredientString = ingredient.ingredient;
            if (ingredient.quantity) {
              ingredientString += " : " + ingredient.quantity;
            }
            if (ingredient.unit) {
              ingredientString += " " + ingredient.unit;
            }
            console.log(ingredientString);
          }
          return `
          <li class="card">
          <img src="./assets/images/image.jpg" alt="photo" width="250" height="150">
          <h2>${recipe.name} - ${recipe.time}</h2>
          <p>${recipe.description}</p>
          <ul>${ingredientString}</ul>
          
          
          </li>
          `;
        })
        .join("");
    }
  }
}
input.addEventListener("input", (e) => {
  fetchRecipes(e.target.value);
});
form.addEventListener("submit", (e) => {
  e.preventDefault();
  recipesDisplay();
  fetchRecipes(e.target.value);
});
