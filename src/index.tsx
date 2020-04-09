import "src/index.css";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";
import * as React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "src/pages/App";
import globalConfigs from "src/redux/reducers/globalConfigs";

const reducers = combineReducers({
  globalConfigs,
});

const store = createStore(reducers, composeWithDevTools(applyMiddleware()));

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
