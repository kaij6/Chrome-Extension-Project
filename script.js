// create empty array to store the ingredients and type of tools we are using
// create button and eventlistener to listen to events, when an event happens, select
// the ingredients and if the user select the same event, unselect the ingredients
const selectedIngredients = [];
const selectedTools = [];

document.querySelectorAll('.ingredient').forEach(button => {
    button.addEventListener('click', () => {
        const ingredient = button.getAttribute('data-name');
        if (!selectedIngredients.includes(ingredient)) {
            selectedIngredients.push(ingredient);
            button.style.backgroundColor = '#888';
        } else {
            selectedIngredients.splice(selectedIngredients.indexOf(ingredient), 1);
            button.style.backgroundColor = '#4caf50';
        }
    });
});

document.querySelectorAll('.tool').forEach(button => {
    button.addEventListener('click', () => {
        const tool = button.getAttribute('data-name');
        if (!selectedTools.includes(tool)) {
            selectedTools.push(tool);
            button.style.backgroundColor = '#888';
        } else {
            selectedTools.splice(selectedTools.indexOf(tool), 1);
            button.style.backgroundColor = '#4caf50';
        }
    });
});

document.getElementById('generateRecipe').addEventListener('click', () => {
    const ingredients = selectedIngredients.join(',');
    const tools = selectedTools.join(',');

    // Example API call to Spoonacular (you need an API key)
    fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&apiKey=d01c7dca1ec14c9eb6be6433865fa052`)
        .then(response => response.json())
        .then(data => {
            displayRecipes(data);
        })
        .catch(error => {
            console.error('Error fetching recipes:', error);
        });
});

function displayRecipes(recipes) {
    const recipeResults = document.getElementById('recipeResults');
    recipeResults.innerHTML = '';

    recipes.forEach(recipe => {
        const recipeElement = document.createElement('div');
        recipeElement.innerHTML = `
            <h3>${recipe.title}</h3>
            <img src="${recipe.image}" alt="${recipe.title}">
        `;
        recipeResults.appendChild(recipeElement);
    });
}
