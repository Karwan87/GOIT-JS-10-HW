const BASE_URL = 'https://restcountries.com/v3.1/';

function fetchCountries(name) {
  return fetch(
    `${BASE_URL}/name/${name}?fields=name.official,capital,population,flags.svg,languages`,
    { timeout: 10000 }
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
}

export { fetchCountries };
