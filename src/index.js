import './css/styles.css';
import { debounce } from 'lodash';
import { fetchCountries } from './fetchCountries.js';
import Notiflix from 'notiflix';

const searchBox = document.getElementById('search-box');
const countryList = document.getElementById('country-list');
const countryInfo = document.getElementById('country-info');

const MIN_SEARCH_LENGTH = 2;
const MAX_SEARCH_LENGTH = 20;
const DEBOUNCE_DELAY = 300;

const renderCountryList = countries => {
  const countriesHTML = countries
    .map(
      country => `
      <div>
        <img src="${country.flags.svg}" alt="${country.name.common}" width="70" height="50">
        <span>${country.name.common}</span>

      </div>
    `
    )
    .join('');
  countryList.innerHTML = countriesHTML;
  countryInfo.innerHTML = '';
};

const renderCountryInfo = country => {
  const countryHTML = `
    <div>
      <img src="${country.flags.svg}" alt="${
    country.name.official
  }" width="150" height="100">
      <h2>${country.name.common}</h2>
        <p><strong>Capital:</strong> ${country.capital}</p>
      <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
      <p><strong>Languages:</strong> ${country.languages}</p>
    </div>
  `;

  countryInfo.innerHTML = countryHTML;
  countryList.innerHTML = '';
};

const handleSearch = debounce(async () => {
  const searchQuery = searchBox.value.trim();

  if (searchQuery.length < MIN_SEARCH_LENGTH) {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
    return;
  }

  try {
    const countries = await fetchCountries(searchQuery);

    if (countries.length > 10) {
      Notiflix.Notify.warning(
        'Too many matches found. Please enter a more specific name.'
      );
      countryList.innerHTML = '';
      countryInfo.innerHTML = '';
      return;
    }

    if (countries.length === 1) {
      renderCountryInfo(countries[0]);
    } else {
      renderCountryList(countries);
    }
  } catch (error) {
    Notiflix.Notify.failure('Oops, there is no country with that name.');
    console.error(error);
  }
}, DEBOUNCE_DELAY);

searchBox.addEventListener('input', handleSearch);
