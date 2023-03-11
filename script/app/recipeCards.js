/** Function to display the content of ingredients for our cards. **/
/* getIngredients is used on our factory getRecipeCard() */

function getIngredients(ingredients) {
  const column = document.createElement("div");
  column.classList.add("ingredients__detailled--bloc");

  let ingredientName;

  for (const ingredient of ingredients) {
    ingredientName = document.createElement("p");
    ingredientName.setAttribute("data-ingredient", ingredient.ingredient);
    if (ingredient.unit === "" || ingredient.unit == null) {
      if (ingredient.quantity) {
        ingredientName.innerHTML = `<strong>${ingredient.ingredient} :</strong> ${ingredient.quantity}`;
      } else {
        ingredientName.innerHTML = `<strong>${ingredient.ingredient}`;
      }
    } else {
      ingredientName.innerHTML = `<strong>${ingredient.ingredient} : </strong> ${ingredient.quantity} ${ingredient.unit}`;
    }
    column.appendChild(ingredientName);
  }
  return column;
}

/** Factory which allows us to generate our Recipes cards. **/
/* getRecipeCard is used in index.js */

function getRecipeCard(data) {
  const {
    id,
    name,
    servings,
    ingredients,
    time,
    description,
    appliance,
    ustensils,
  } = data;

  const article = document.createElement("article");
  article.setAttribute("id", id);
  article.setAttribute("servings", servings);

  const blankImage = document.createElement("div");
  blankImage.classList.add("blank-space");

  const cardHeader = document.createElement("header");

  const recipeName = document.createElement("h2");
  recipeName.textContent = name;
  recipeName.className = "title";

  const spanIcon = document.createElement("span");
  spanIcon.className = "duration-icon";

  const timeIcon = document.createElement("i");
  timeIcon.className = "fa-regular fa-clock";

  const recipeDuration = document.createElement("h3");
  recipeDuration.textContent = `${time} min`;
  recipeDuration.className = "durée";

  const cardInfo = document.createElement("div");
  cardInfo.classList.add("informations");
  cardInfo.setAttribute("appliance", appliance);
  cardInfo.setAttribute("ustensils", ustensils);

  const recipeIngredients = getIngredients(ingredients);

  const recipeDescription = document.createElement("p");
  recipeDescription.textContent = description;
  recipeDescription.className = "description";

  const hidden = document.createElement("div");
  /* hack for adding link to article */
  hidden.classList.add("is-hidden");
  const link = document.createElement("a");
  link.setAttribute("href", "#");
  const span = document.createElement("span");
  link.appendChild(span);

  /* Append section */
  article.appendChild(blankImage);
  article.appendChild(cardHeader);
  cardHeader.appendChild(recipeName);
  cardHeader.appendChild(spanIcon);
  spanIcon.appendChild(timeIcon);
  cardHeader.appendChild(recipeDuration);
  article.appendChild(cardInfo);
  cardInfo.appendChild(recipeIngredients);
  cardInfo.appendChild(recipeDescription);
  article.appendChild(hidden);
  article.appendChild(link);

  return article;
}
