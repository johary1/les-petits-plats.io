/** recipesToDisplay is defined in filterTags.js **/
/** filteredRecipesWithTags is defined in tags.js **/
/** fillFilters is defined in filterUpdate.js **/
/** DisplayData is defined in index.js **/

const searchBarInput = document.querySelector(".search__input");
const noResultText = document.querySelector(".not-found");

/** Manage search with filters option1  **/
//4.33ms test filtre ingredient
function realtimeSearch() {
  let tagsUsed = false;
  recipesToDisplay = [];
  let mainInput;

  // Return array with filtered recipes
  if (searchBarInput.value.length > 2) {
    mainInput = searchBarInput.value;

    const regex = new RegExp(`${mainInput.trim().toLowerCase()}`);
    recipesToDisplay = recipes.filter((recipe) => {
      let recipeIsMatching = false;
      if (regex.test(recipe.name)) {
        recipeIsMatching = true;
      } else if (regex.test(recipe.description)) {
        recipeIsMatching = true;
      }
      recipe.ingredients.forEach(({ ingredient }) => {
        if (regex.test(ingredient)) {
          recipeIsMatching = true;
        }
      });
      return recipeIsMatching;
    });

    fillFilters(recipesToDisplay);
  }

  if (
    Array.from(
      document.querySelectorAll(
        ".tag__ingredients--wrapper .tag__ingredient .tag-blue"
      )
    ).length > 0 ||
    Array.from(
      document.querySelectorAll(
        ".tag__appliances--wrapper .tag__appliance .tag-green"
      )
    ).length > 0 ||
    Array.from(
      document.querySelectorAll(
        ".tag__ustensils--wrapper .tag__ustensil .tag-red"
      )
    ).length > 0
  ) {
    tagsUsed = true;
    if (recipesToDisplay.length > 0) {
      recipesToDisplay = filteredRecipesWithTags(recipesToDisplay);
    } else {
      recipesToDisplay = filteredRecipesWithTags(recipes);
    }
  }

  // handle case when there is no result
  if (recipesToDisplay.length > 0) {
    noResultText.innerHTML = "";
    displayData(recipesToDisplay);
  } else {
    displayData(recipesToDisplay);
    noResultText.innerHTML = "<p>Aucun résultat correspondant ...</p>";
  }

  // else
  if (
    (searchBarInput.value === "" || searchBarInput.value.length < 3) &&
    tagsUsed === false
  ) {
    fillFilters(recipes);
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
