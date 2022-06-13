import React from "react";
import ReactDOM from "react-dom";
import { configureStore } from "redux";
import { Provider } from "react-redux";
import { MainView } from "./components/main-view/main-view";
import moviesApp from "./reducers/reducers";
import { devToolsEnhancer } from "redux-devtools-extension";

import "./index.scss";
import "react-bootstrap/dist/react-bootstrap.min.js";

const store = configureStore(moviesApp, devToolsEnhancer());

class MyFlixApplication extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <MainView />
        </div>
      </Provider>
    );
  }
}

const container = document.getElementsByClassName("app-container")[0];
ReactDOM.render(React.createElement(MyFlixApplication), container);
