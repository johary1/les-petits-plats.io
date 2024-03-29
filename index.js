let recipes;

async function getDataJson() {
  const response = await fetch("data/recipes.json");
  recipes = (await response.json()).recipes;
  init();
}

function displayData(recipes) {
  const recipeSection = document.getElementById("recipes__cards");
  recipeSection.innerHTML = "";
  // getRecipeCard is defined in recipeCards.js
  recipes.forEach((recipe) => {
    const recipeCard = getRecipeCard(recipe);
    recipeSection.appendChild(recipeCard);
  });
}

function init() {
  /* Display all recipes */
  displayData(recipes);
  /* Display all filters */
  filterIngredients();
  filterAppliances();
  filterUstensils();
  /* Display filter's item on click */
  isArrowClicked();
  /* Update filter item content with recipes from search input */
  fillFilters(recipes);
}

getDataJson();
/* Reset search and filters */
document
  .querySelector(".fa-arrow-rotate-right")
  .addEventListener("click", function () {
    window.location.reload();
  });
