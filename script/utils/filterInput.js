/** Search from filters
 ** clearTimeout() is defined on mainSearch.js
 ** inputIngredient(), inputAppliance() and inputUstensil() are called in filterCreate.js
 **/

function updateSearchFromIngredientsFilter() {
  const filterRender = document.querySelectorAll(
    ".filter__ingredients--list li"
  );
  const cards = document.querySelectorAll(".filter__ingredients--items");
  const searchQuery = document.getElementById("ingredients-input").value;

  cards.forEach((card) => {
    if (card.innerText.toLowerCase().includes(searchQuery.toLowerCase())) {
      card.classList.remove("is-hidden");
    } else {
      card.classList.add("is-hidden");
    }
  });
  return filterRender;
}

function inputIngredient() {
  const searchInputIngredient = document.getElementById("ingredients-input");
  searchInputIngredient.addEventListener("keyup", () => {
    clearTimeout(userTimerType);
    userTimerType = setTimeout(updateSearchFromIngredientsFilter, typeInterval);
  });
}

function updateSearchFromAppliancesFilter() {
  const filterRender = document.querySelectorAll(
    ".filter__appliances--list li"
  );
  const cards = document.querySelectorAll(".filter__appliances--items");
  const searchQuery = document.getElementById("appliances-input").value;

  cards.forEach((card) => {
    if (card.innerText.toLowerCase().includes(searchQuery.toLowerCase())) {
      card.classList.remove("is-hidden");
    } else {
      card.classList.add("is-hidden");
    }
  });
  return filterRender;
}

function inputAppliance() {
  const searchInputAppliance = document.getElementById("appliances-input");
  searchInputAppliance.addEventListener("keyup", () => {
    clearTimeout(userTimerType);
    userTimerType = setTimeout(updateSearchFromAppliancesFilter, typeInterval);
  });
}

function updateSearchFromUstensilsFilter() {
  const filterRender = document.querySelectorAll(".filter__ustensils--list li");
  const cards = document.querySelectorAll(".filter__ustensils--items");
  const searchQuery = document.getElementById("ustensils-input").value;

  cards.forEach((card) => {
    if (card.innerText.toLowerCase().includes(searchQuery.toLowerCase())) {
      card.classList.remove("is-hidden");
    } else {
      card.classList.add("is-hidden");
    }
  });
  return filterRender;
}

function inputUstensil() {
  const searchInputUstensil = document.getElementById("ustensils-input");
  searchInputUstensil.addEventListener("keyup", () => {
    clearTimeout(userTimerType);
    userTimerType = setTimeout(updateSearchFromUstensilsFilter, typeInterval);
  });
}
