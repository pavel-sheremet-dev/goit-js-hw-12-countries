import './sass/main.scss';

import debounce from 'lodash.debounce';
import getRefs from './js/data/references';
import { onInputFetch, onInputClient } from './js/events/events';

const refs = getRefs();

refs.input.addEventListener('input', onInputClient);
refs.input.addEventListener('input', debounce(onInputFetch, 500));
