import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = [thunk];

export default function configureStore() {
  const store = createStore(
    rootReducer,
    /* preloadedState, */ composeEnhancers(applyMiddleware(...middleware))
  );
  return store;
}
