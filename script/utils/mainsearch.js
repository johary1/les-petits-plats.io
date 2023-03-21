const searchBarInput = document.querySelector(".search__input");
const noResultText = document.querySelector(".not-found");

function realtimeSearch() {
  let recipesToDisplay = [];
  const mainInput = searchBarInput.value.trim().toLowerCase();

  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    const regex = new RegExp(mainInput, "i");

    if (
      regex.test(recipe.name.toLowerCase()) ||
      recipe.name.toLowerCase().includes(mainInput)
    ) {
      recipesToDisplay.push(recipe);
    } else if (
      regex.test(recipe.description.toLowerCase()) ||
      recipe.description.toLowerCase().includes(mainInput)
    ) {
      recipesToDisplay.push(recipe);
    } else {
      for (let j = 0; j < recipe.ingredients.length; j++) {
        const ingredient = recipe.ingredients[j].ingredient;
        if (
          regex.test(ingredient.toLowerCase()) ||
          ingredient.toLowerCase().includes(mainInput)
        ) {
          recipesToDisplay.push(recipe);
          break;
        }
      }
    }
  }

  if (recipesToDisplay.length > 0) {
    noResultText.innerHTML = "";
    displayData(recipesToDisplay);
  } else if (mainInput.length >= 3) {
    displayData([]);
    noResultText.innerHTML = "<p>Aucun résultat correspondant ...</p>";
  } else {
    displayData(recipes);
    noResultText.innerHTML = "";
  }
}

/** using a timer to delay the execution of the realtimeSearch()  until the user has finished typing**/
let userTimerType;

const typeInterval = 100;
searchBarInput.addEventListener("keyup", () => {
  clearTimeout(userTimerType);
  userTimerType = setTimeout(() => {
    realtimeSearch();
  }, typeInterval);
});
