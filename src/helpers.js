import { fetchCountries } from './fetchCountries';
export const fetchLanguagesName = async languageCodes => {
  const languageNames = await Promise.all(
    languageCodes.map(async code => {
      const response = await fetch(
        `https://restcountries.com/v3.1/lang/${code}`
      );
      const [data] = await response.json();
      return data.name.common;
    })
  );
  return languageNames;
};

export const fetchLanguagesCodes = async countryName => {
  const countries = await fetchCountries(countryName);
  if (countries.length === 0) {
    throw new Error('Country not found');
  }
  const languages = countries[0].languages;
  const languageCodes = Object.keys(languages);
  return languageCodes;
};
