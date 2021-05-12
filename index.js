const searchForm = document.querySelector('form');
const searchResultDiv = document.querySelector('.search-result');
const container = document.querySelector('.container');
let searchQuery = '';
const APP_ID = "204a62bc";
const APP_key = "188a26d08f68a0764481eefca088616d";

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  searchQuery = e.target.querySelector('input').value;
  fetchAPI();
})

async function fetchAPI(){
  const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_key}&from=0&to=30`;
  const response = await fetch(baseURL); 
  const data = await response.json();
  generateHTML(data.hits)
  console.log(data);
}

function generateHTML(results){
  container.classList.remove('hidden');
  let generatedHTML= '';
  results.map(result => {
    generatedHTML += `
      <div class="item">
        <img src="${result.recipe.image}" alt="Recipe Image">
        <div class="flex-container">
          <h1 class="title">${result.recipe.label}</h1>
          <a class="view-btn" target="_blank" href="${result.recipe.url}">View Recipe</a>
        </div>
      </div>
    `
  })
  searchResultDiv.innerHTML = generatedHTML;
}
