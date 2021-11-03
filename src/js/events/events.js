import { fetchCountries, fetchCountrybyAlpha } from '../services/fetchCountries';
import {
  renderCountries,
  renderCountry,
  showCountryCard,
  showContainer,
  clearContainer,
  clearInput,
  showClearBtn,
  hideClearBtn,
} from '../services/pageServices';
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
      renderCountries(data);
    })
    .catch(err => {
      spinner.stop();
      showError(err);
    });
};

const onInputClient = () => {
  if (!refs.container.classList.contains(CSS.IS_HIDDEN)) {
    hideClearBtn();
    setTimeout(clearContainer, CSS.DELAY);
  }
};

const onCountryClick = e => {
  e.preventDefault();

  if (e.target.tagName === 'A') {
    spinner.spin(refs.spinner);
    const countryCode = e.target.dataset.alpha;

    Promise.all([fetchCountrybyAlpha(countryCode), clearContainer()]).then(result => {
      const country = result[0];
      renderCountry(country);
      showCountryCard();
    });

    // clearContainer()
    // fetchCountrybyAlpha(countryCode).then(country => {
    //   // setTimeout(() => {
    //   //   renderCountry(country);
    //   //   showCountryCard();
    //   // }, CSS.DELAY);
    // });

    e.currentTarget.removeEventListener('click', onCountryClick);
  }
};

const onBtnClick = e => {
  refs.input.focus();
  hideClearBtn();
  setTimeout(clearContainer, CSS.DELAY);
  clearInput();
  e.target.removeEventListener('click', onBtnClick);
};

const onCardImageLoad = () => {
  setTimeout(showClearBtn, CSS.DELAY);
  showContainer();
  refs.clearBtn.addEventListener('click', onBtnClick);
};

export { onInputFetch, onInputClient, onCountryClick, onBtnClick, onCardImageLoad };
