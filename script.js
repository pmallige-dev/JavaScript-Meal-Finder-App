const search = document.getElementById('search'),
    submit = document.getElementById('submit'),
    random = document.getElementById('random'),
    mealsEl = document.getElementById('meals'),
    resultHeading = document.getElementById('result-heading'),
    single_mealEl = document.getElementById('single-meal');

// Search meal and fetch from API
function searchMeal(e) {
    e.preventDefault();

    // CLear single meal
    single_mealEl.innerHTML = '';

    // Get Search Term
    const term = search.value;
    
    // Check for Empty
    if(term.trim()) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                resultHeading.innerHTML = `<h2>Search Results for '${term}' :</h2>`;

                if (data.meals === null) {
                    resultHeading.innerHTML = '<p>There are no search results. Try Again!</p>'
                } else {
                    mealsEl.innerHTML = data.meals.map(meal => `
                        <div class="meal">
                            <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
                            <div class="meal-info" data-mealID="${meal.idMeal}">
                                <h3>${meal.strMeal}</h3>
                            </div>
                        </div>
                    `)
                    .join('');
                }
            });

        //Clear serach Text
        search.value = '';
    } else {
        alert('Please Enter a Search Term')
    }
}

// Event Listeners
submit.addEventListener('submit', searchMeal);