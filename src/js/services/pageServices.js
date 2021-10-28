import makeCountryList from '../../templating/countryList.hbs';
import makeCountryCard from '../../templating/counryCard.hbs';
import { onCountryClick } from '../events/events';
import spinner from '../vendors/spinner';
import { showAlert, ALERTS } from '../vendors/alerts';
import getRefs from '../data/references';
import CSS from '../data/css';

const refs = getRefs();

const clearInput = () => (refs.input.value = '');

const showContainer = () => {
  spinner.stop();
  refs.container.classList.remove(CSS.IS_HIDDEN);
};

const hideContainer = () => refs.container.classList.add(CSS.IS_HIDDEN);

const clearContainer = () => {
  hideContainer();
  setTimeout(() => {
    refs.container.innerHTML = '';
  }, CSS.DELAY);
};

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
    return;
  }

  showCountiesList(data);

  const listRef = refs.container.querySelector(CSS.LIST);

  listRef.addEventListener('click', onCountryClick);
};

const showCountryCard = data => {
  clearInput();
  refs.container.innerHTML = makeCountryCard(data);
  const imgRef = refs.container.querySelector(CSS.IMG);
  imgRef.addEventListener('load', showContainer, { once: true });
};

const showCountiesList = data => {
  showContainer();
  refs.container.innerHTML = makeCountryList(data);
};

export { renderCounries, showCountryCard, clearContainer, showCountiesList, clearInput };
