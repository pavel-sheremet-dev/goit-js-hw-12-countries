import makeCountryList from '../../templating/countryList.hbs';
import makeCountryCard from '../../templating/counryCard.hbs';
import { onCountryClick, onCardImageLoad } from '../events/events';
import spinner from '../vendors/spinner';
import getRefs from '../data/references';
import CSS from '../data/css';

const refs = getRefs();

const clearInput = () => {
  refs.input.value = '';
};

const showContainer = () => {
  spinner.stop();
  refs.container.classList.remove(CSS.IS_HIDDEN);
};

const hideContainer = () => {
  refs.container.classList.add(CSS.IS_HIDDEN);
};

const clearContainer = () => {
  hideContainer();
  const promise = new Promise(res => {
    setTimeout(() => {
      refs.container.innerHTML = '';
      res();
    }, CSS.DELAY);
  });
  return promise;
};

// const clearContainer = () => {
//   hideContainer();
//   setTimeout(() => {
//     refs.container.innerHTML = '';
//   }, CSS.DELAY);
// };

const renderCountries = countriesList => {
  if (countriesList.length === 1) {
    const country = countriesList[0];
    renderCountry(country);
    showCountryCard();
    return;
  }
  renderCountriesList(countriesList);
  showContainer();

  const listRef = refs.container.querySelector(CSS.LIST);
  listRef.addEventListener('click', onCountryClick);
};

const renderCountry = country => {
  refs.container.innerHTML = makeCountryCard(country);
};

const renderCountriesList = countriesList => {
  refs.container.innerHTML = makeCountryList(countriesList);
};

const showCountryCard = () => {
  const imgRef = refs.container.querySelector(CSS.IMG);
  imgRef.addEventListener('load', onCardImageLoad, { once: true });
};

const showClearBtn = () => {
  refs.clearBtn.classList.add(CSS.BTN_SHOW);
};

const hideClearBtn = () => {
  refs.clearBtn.classList.remove(CSS.BTN_SHOW);
};

export {
  renderCountries,
  onCardImageLoad,
  clearContainer,
  clearInput,
  showClearBtn,
  hideClearBtn,
  renderCountry,
  showContainer,
  showCountryCard,
};
