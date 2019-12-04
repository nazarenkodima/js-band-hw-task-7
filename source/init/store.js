// Core
import { createStore } from 'redux';

// rootReducer
import { rootReducer } from './rootReducer';

// Middleware
import { enhancedStore } from './middleware';

// eslint-disable-next-line import/prefer-default-export
export const store = createStore(rootReducer, enhancedStore);
