import makeCountryList from '../../templating/countryList.hbs';
import makeCountryCard from '../../templating/counryCard.hbs';
import { onCountryClick } from '../events/events';
import getRefs from '../data/references';
import spinner from '../vendors/spinner';
import { showAlert, ALERTS } from '../vendors/alerts';

const refs = getRefs();

const renderCounries = data => {
  if (data.length > 10) {
    clearContainer();
    spinner.stop();
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
  showContainer();
  setTimeout(() => {
    refs.container.innerHTML = '';
  }, 100);
};

const showCountryCard = data => {
  refs.container.innerHTML = makeCountryCard(data);
  refs.container.querySelector('.js-img').addEventListener(
    'load',
    () => {
      spinner.stop();
      hideContainer();
    },
    { once: true },
  );
};

const showCountiesList = data => {
  refs.container.addEventListener(
    'DOMSubtreeModified',
    () => {
      spinner.stop();
      hideContainer();
    },
    { once: true },
  );
  refs.container.innerHTML = makeCountryList(data);
};

const clearInput = () => {
  refs.input.value = '';
  refs.input.focus();
};

const hideContainer = () => {
  refs.container.classList.remove('is-hidden');
};

const showContainer = () => {
  refs.container.classList.add('is-hidden');
};

export { renderCounries, showCountryCard, clearContainer, showCountiesList, clearInput };
