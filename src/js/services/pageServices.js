import makeCountryList from '../../templating/countryList.hbs';
import makeCountryCard from '../../templating/counryCard.hbs';
import { onCountryClick } from '../events/events';
import getRefs from '../data/references';
import { showAlert, showError, ALERTS } from '../services/alerts';

const refs = getRefs();

const renderCounries = data => {
  if (data.length > 10) {
    clearContainer();
    showAlert(ALERTS.MATCH_RESULTS, `${data.length} reults`);
    return;
  }

  if (data.length === 1) {
    const countryData = data[0];
    showCountryCard(countryData);
    clearInput();
    return;
  }

  showCountiesList(data);

  const listRef = document.querySelector('.js-country-list');

  listRef.addEventListener('click', onCountryClick, { once: true });
};

const clearContainer = () => {
  refs.container.innerHTML = '';
};

const showCountiesList = data => {
  refs.container.innerHTML = makeCountryList(data);
};

const showCountryCard = data => {
  refs.container.innerHTML = makeCountryCard(data);
};

const clearInput = () => {
  refs.input.value = '';
  refs.input.focus();
};

export { renderCounries, showCountryCard, clearContainer, showCountiesList, clearInput };
