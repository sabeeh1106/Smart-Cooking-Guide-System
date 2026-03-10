async function searchRecipe(){

let query = document.getElementById("searchInput").value;

if(query === ""){
alert("Please enter a recipe name");
return;
}

let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;

let response = await fetch(url);
let data = await response.json();

let recipesDiv = document.getElementById("recipes");
recipesDiv.innerHTML = "";

if(data.meals){

data.meals.forEach(meal => {

recipesDiv.innerHTML += `
<div class="recipe" onclick="openRecipe('${meal.idMeal}')">
<img src="${meal.strMealThumb}">
<h3>${meal.strMeal}</h3>
</div>
`;

});

}else{

recipesDiv.innerHTML = "<p style='text-align:center'>No recipes found</p>";

}

}


async function openRecipe(mealID){

let url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`;

let response = await fetch(url);
let data = await response.json();

let meal = data.meals[0];

document.getElementById("recipeModal").style.display="flex";

document.getElementById("mealTitle").innerText = meal.strMeal;
document.getElementById("mealImg").src = meal.strMealThumb;
document.getElementById("videoLink").href = meal.strYoutube;

let ingredientsList = document.getElementById("ingredients");
ingredientsList.innerHTML="";

for(let i=1;i<=20;i++){

let ingredient = meal[`strIngredient${i}`];
let measure = meal[`strMeasure${i}`];

if(ingredient && ingredient.trim() !== ""){

let li = document.createElement("li");
li.innerText = measure + " " + ingredient;
ingredientsList.appendChild(li);

}

}

}


function closeModal(){
document.getElementById("recipeModal").style.display="none";
}


function quickSearch(food){

let query = food;

if(food === "indian"){
query = "curry";
}

document.getElementById("searchInput").value = query;

searchRecipe();

}