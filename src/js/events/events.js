import { fetchCountries, fetchCountrybyAlpha } from '../services/fetchCountries';
import {
  renderCounries,
  showCountryCard,
  clearContainer,
  clearInput,
} from '../services/pageServices';

import { showError, ALERTS } from '../services/alerts';

const inputNormalize = value => value.toLowerCase().split(' ').join('');

const onInput = e => {
  const countryName = e.target.value;

  if (!countryName) {
    clearContainer();
    return;
  }

  const normalizedName = inputNormalize(countryName);

  fetchCountries(normalizedName)
    .then(data => {
      if (data.status) {
        return Promise.reject({ countryName, notFound: ALERTS.NOT_FOUND });
      }
      return renderCounries(data);
    })
    .catch(showError);
};

const onCountryClick = e => {
  e.preventDefault();

  if (e.target !== e.currentTarget) {
    clearInput();
    const countryCode = e.target.dataset.alpha;
    fetchCountrybyAlpha(countryCode).then(showCountryCard);
  }
};

export { onInput, onCountryClick };
