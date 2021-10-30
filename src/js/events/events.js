import { fetchCountries, fetchCountrybyAlpha } from '../services/fetchCountries';
import { renderCounries, showCountryCard, clearContainer } from '../services/pageServices';
import spinner from '../vendors/spinner';
import getRefs from '../data/references';
import CSS from '../data/css';

const refs = getRefs();

import { showAlert, showError, ALERTS } from '../vendors/alerts';

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
        return Promise.reject({ title: countryName, message: ALERTS.NOT_FOUND });
      }
      if (data.length > 10) {
        clearContainer();
        spinner.stop();
        showAlert(ALERTS.MATCH_RESULTS, `${data.length} reults`);
        return;
      }
      return renderCounries(data);
    })
    .catch(err => {
      spinner.stop();
      showError(err);
    });
};

const onInputClient = () => clearContainer();

const onCountryClick = e => {
  e.preventDefault();

  if (e.target !== e.currentTarget) {
    spinner.spin(refs.spinner);
    clearContainer();
    const countryCode = e.target.dataset.alpha;

    fetchCountrybyAlpha(countryCode).then(country => {
      setTimeout(() => {
        spinner.stop();
        showCountryCard(country);
      }, CSS.DELAY);
    });
    e.currentTarget.removeEventListener('click', onCountryClick);
  }
};

export { onInputFetch, onInputClient, onCountryClick };
