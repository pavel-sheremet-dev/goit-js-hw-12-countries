import './sass/main.scss';

import _ from 'lodash';
import getRefs from './js/data/references';
import { onInput } from './js/events/events';

const refs = getRefs();

refs.input.addEventListener('input', _.debounce(onInput, 500));
