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
    const searchWords = searchInput.split(" ");
    for (const recipe of recipeData.recipes) {
      for (const word of searchWords) {
        if (
          recipe.description.includes(word) ||
          recipe.name.includes(word) ||
          recipe.ustensils.includes(word)
        ) {
          filteredRecipes.push(recipe);
          break;
        }
      }
    }
  } else {
    filteredRecipes = recipeData.recipes;
  }

  let message = document.querySelector(".no-result");
  if (!filteredRecipes.length) {
    message.textContent = "Aucun résulat correspondant !";
  } else {
    message.textContent = "";
    for (const recipe of filteredRecipes) {
      const recipeCard = new RecipeCard(recipe);
      wrapper.appendChild(recipeCard.createRecipeCard());
    }
  }
}

const input = document.querySelector("input");
const form = document.querySelector("form");
input.addEventListener("input", (e) => {
  recipesDisplay(e.target.value);
});
form.addEventListener("submit", (e) => {
  const searchInput = document.querySelector("#searchInput").value;
  console.time("native loop");
  recipesDisplay(searchInput);
  console.timeEnd("native loop");
  e.preventDefault();
});

window.addEventListener("load", () => {
  console.time("native loop loading");
  recipesDisplay();
  console.timeEnd("native loop loading");
});
