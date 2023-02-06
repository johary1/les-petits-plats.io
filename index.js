class RecipeCard {
  constructor(recipe) {
    this.recipe = recipe;
  }

  createRecipeCard() {
    const recipeCard = document.createElement("div");
    recipeCard.classList.add("recipeItem");

    const recipeCardWrapper = document.createElement("div");
    recipeCardWrapper.classList.add("recipeCardWrapper");
    recipeCard.appendChild(recipeCardWrapper);

    const recipeName = document.createElement("h2");
    recipeName.classList.add("recipeName");
    recipeName.innerHTML = this.recipe.name;
    recipeCard.appendChild(recipeName);

    const recipeDuration = document.createElement("div");
    recipeDuration.classList.add("recipeTime");
    recipeDuration.innerHTML = `<i class="fa-sharp fa-solid fa-clock"></i> ${this.recipe.time} min`;
    recipeCard.appendChild(recipeDuration);

    const recipeDescription = document.createElement("p");
    recipeDescription.classList.add("block-with-text");
    recipeDescription.innerHTML = this.recipe.description;
    recipeCard.appendChild(recipeDescription);

    const ingredientsListTitle = document.createElement("h3");
    recipeCard.appendChild(ingredientsListTitle);

    const ingredientsList = document.createElement("ul");
    ingredientsList.classList.add("ingredientItem");

    // combine map and foreach
    //console.time("mix method"); //0.01318359375 ms<mix method< 052978515625 ms
    const ingredients = this.recipe.ingredients.map((ingredient) => {
      const ingredientItem = document.createElement("li");
      ingredientItem.innerHTML = `${ingredient.ingredient} :  ${
        ingredient.quantity === null || ingredient.quantity === undefined
          ? " "
          : ingredient.quantity
      } ${
        ingredient.unit === null || ingredient.unit === undefined
          ? " "
          : ingredient.unit
      }`;
      return ingredientItem;
    });

    ingredients.forEach((ingredient) =>
      ingredientsList.appendChild(ingredient)
    );
    // console.timeEnd("mix method");

    recipeCard.appendChild(ingredientsList);
    return recipeCard;
  }
}

function getAllRecipes(recipes) {
  return recipes.map((recipe) => ({
    name: recipe.name,
    time: recipe.time,
    description: recipe.description,
    ingredients: recipe.ingredients,
  }));
}

async function recipesDisplay(searchInput = "") {
  const wrapper = document.querySelector(".recipeContainer");
  wrapper.innerHTML = "";

  const response = await fetch("data/recipes.json");
  const recipeData = await response.json();

  let filteredRecipes = [];
  if (searchInput.length >= 2) {
    filteredRecipes = recipeData.recipes.filter((recipe) => {
      // manage group of keywords for searchInput
      const searchWords = searchInput.split(" ");
      return [recipe.description, recipe.name, recipe.ustensils].some((value) =>
        // return all results with each word in searchInput
        searchWords.some((word) => value.includes(word))
      );
    });
  } else {
    filteredRecipes = getAllRecipes(recipeData.recipes);
  }
  let message = document.querySelector(".no-result");

  // case for no result
  if (!filteredRecipes.length) {
    message.textContent = "Aucun résulat correspondant !";
  } else {
    message.textContent = "";
    filteredRecipes.forEach((recipe) => {
      const recipeCard = new RecipeCard(recipe);
      wrapper.appendChild(recipeCard.createRecipeCard());
    });
  }
}

const input = document.querySelector("input");
const form = document.querySelector("form");
input.addEventListener("input", (e) => {
  recipesDisplay(e.target.value);
});
form.addEventListener("submit", (e) => {
  const searchInput = document.querySelector("#searchInput").value;
  console.time("array method");
  recipesDisplay(searchInput);
  console.timeEnd("array method");
  e.preventDefault();
});

window.addEventListener("load", () => {
  console.time("array method loading");
  recipesDisplay();
  console.timeEnd("array method loading");
});
