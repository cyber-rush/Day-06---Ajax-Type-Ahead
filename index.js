const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');
let cities = [];

// Fetch data from the provided API
fetch('https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json')
    .then(response => response.json())
    .then(data => cities.push(...data));

function findMatches(wordToMatch, cities) {
    const lowerCaseWordToMatch = wordToMatch.toLowerCase();
    return cities.filter(place => {
        const lowerCaseCity = place.city.toLowerCase();
        const lowerCaseState = place.state.toLowerCase();
        return lowerCaseCity.includes(lowerCaseWordToMatch) || lowerCaseState.includes(lowerCaseWordToMatch);
    });
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function displayMatches() {
    const matchArray = findMatches(this.value, cities);
    const html = matchArray.map(place => {
        const regex = new RegExp(this.value, 'gi');
        const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
        const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`);
        return `
        <li>
          <span class="name">${cityName}, ${stateName}</span>
          <span class="population">${numberWithCommas(place.population)}</span>
        </li>
      `;
    }).join('');
    suggestions.innerHTML = html;
}

// Event listener for input
searchInput.addEventListener('input', displayMatches);

// Event listener for keyup
searchInput.addEventListener('keyup', displayMatches);