// Core
import { applyMiddleware, compose } from 'redux';

// Middleware
import { createLogger } from 'redux-logger';

export const logger = createLogger({
  duration: true,
  collapsed: true,
  color: {
    title: () => '#139BDF',
    prevState: () => '#1C5FAF',
    action: () => '#149945',
    bextState: () => '#A47104',
    error: () => '#ff0005',
  },
});

const devtools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
// eslint-disable-next-line no-undef
const composeEnhancers = __DEV__ && devtools ? devtools : compose;

const middleware = [];

// eslint-disable-next-line no-undef
if (__DEV__) {
  middleware.push(logger);
}

const enhancedStore = composeEnhancers(applyMiddleware(...middleware));

export { enhancedStore };
