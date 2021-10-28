import './sass/main.scss';

import _ from 'lodash';
import getRefs from './js/data/references';
import { onInputFetch, onInputClient } from './js/events/events';

const refs = getRefs();

refs.input.addEventListener('input', onInputClient);
refs.input.addEventListener('input', _.debounce(onInputFetch, 500));
