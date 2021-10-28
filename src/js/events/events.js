import { fetchCountries, fetchCountrybyAlpha } from '../services/fetchCountries';
import {
  renderCounries,
  showCountryCard,
  clearContainer,
  clearInput,
} from '../services/pageServices';
import getRefs from '../data/references';
import spinner from '../vendors/spinner';

const refs = getRefs();

import { showError, ALERTS } from '../vendors/alerts';

const inputNormalize = value => value.toLowerCase().split(' ').join('');

const onInputFetch = e => {
  const countryName = e.target.value;

  if (!countryName) {
    return;
  }

  spinner.spin(refs.spinner);

  const normalizedName = inputNormalize(countryName);

  fetchCountries(normalizedName)
    .then(data => {
      if (data.status) {
        return Promise.reject({ countryName, notFound: ALERTS.NOT_FOUND });
      }
      return renderCounries(data);
    })
    .catch(err => {
      spinner.stop();
      showError(err);
    });
};

const onInputClient = e => {
  clearContainer();
};

const onCountryClick = e => {
  e.preventDefault();

  if (e.target !== e.currentTarget) {
    clearInput();
    const countryCode = e.target.dataset.alpha;
    fetchCountrybyAlpha(countryCode).then(showCountryCard);
  }
};

export { onInputFetch, onInputClient, onCountryClick };
