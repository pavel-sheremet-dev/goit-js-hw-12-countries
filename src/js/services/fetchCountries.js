const BASE_API_URL = 'https://restcountries.com/v2/name/';
const BASE_API_URL_ALPHA = 'https://restcountries.com/v2/alpha/';

const fetchCountries = country => {
  const urlParams = new URLSearchParams({
    fields: 'name,flag,capital,population,languages,alpha3Code',
  });
  return fetch(`${BASE_API_URL}${country}?${urlParams}`).then(res => res.json());
};

const fetchCountrybyAlpha = alphaCode => {
  return fetch(`${BASE_API_URL_ALPHA}${alphaCode}`).then(res => res.json());
};

export { fetchCountries, fetchCountrybyAlpha };
