// Create empty arrays to store the selected ingredients and tools
const selectedIngredients = [];
const selectedTools = [];

// Add event listeners to each ingredient button to handle selection and deselection
document.querySelectorAll('.ingredient').forEach(button => {
    button.addEventListener('click', () => {
        // Get the name of the ingredient from the data-name attribute
        const ingredient = button.getAttribute('data-name');
        // Check if the ingredient is already selected
        if (!selectedIngredients.includes(ingredient)) {
            // If not, add it to the selectedIngredients array
            selectedIngredients.push(ingredient);
            // Change the button color to indicate selection
            button.style.backgroundColor = '#888';
        } else {
            // If it is already selected, remove it from the array
            selectedIngredients.splice(selectedIngredients.indexOf(ingredient), 1);
            // Change the button color back to indicate deselection
            button.style.backgroundColor = '#4caf50';
        }
    });
});

// Add event listeners to each tool button to handle selection and deselection
document.querySelectorAll('.tool').forEach(button => {
    button.addEventListener('click', () => {
        // Get the name of the tool from the data-name attribute
        const tool = button.getAttribute('data-name');
        // Check if the tool is already selected
        if (!selectedTools.includes(tool)) {
            // If not, add it to the selectedTools array
            selectedTools.push(tool);
            // Change the button color to indicate selection
            button.style.backgroundColor = '#888';
        } else {
            // If it is already selected, remove it from the array
            selectedTools.splice(selectedTools.indexOf(tool), 1);
            // Change the button color back to indicate deselection
            button.style.backgroundColor = '#4caf50';
        }
    });
});

// Define the displayRecipes function before using it
function displayRecipes(recipes) {
    // Get the container element where the recipes will be displayed
    const recipeResults = document.getElementById('recipeResults');
    // Clear any existing content in the container
    recipeResults.innerHTML = '';

    // Iterate over each recipe in the array
    recipes.forEach(recipeData => {
        const recipe = recipeData.recipe;
        // Create a new div element to hold the recipe details
        const recipeElement = document.createElement('div');
        // Set the inner HTML of the div to display the recipe title and image
        recipeElement.innerHTML = `
            <h3>${recipe.label}</h3>
            <img src="${recipe.image}" alt="${recipe.label}">
        `;
        // Append the new div to the recipeResults container
        recipeResults.appendChild(recipeElement);
    });
}

// Add an event listener to the "Generate Recipe" button to fetch recipes
document.getElementById('generateRecipe').addEventListener('click', () => {
    // Join the selected ingredients into a comma-separated string
    const ingredients = selectedIngredients.join(',');

    // Example API call to Edamam (using application ID and key)
    const appId = '2de13cab';
    const appKey = 'fdcde1101f736c957dcb280478a4ea7f';
    fetch(`https://api.edamam.com/search?q=${ingredients}&app_id=${appId}&app_key=${appKey}`)
        .then(response => {
            console.log('Response:', response); // Log the response
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return response.json();
        }) // Convert the response to JSON
        .then(data => {
            console.log('Data:', data); // Log the data to inspect it
            if (Array.isArray(data.hits)) {
                // Pass the received recipes data to the displayRecipes function
                displayRecipes(data.hits);
            } else {
                console.error('Unexpected response format:', data);
            }
        })
        .catch(error => {
            console.error('Error fetching recipes:', error); // Log any errors
        });
});
