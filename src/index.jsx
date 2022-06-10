import React from 'react';
import ReactDOM from 'react-dom';
import { MainView } from './components/main-view/main-view';




import './index.scss';
import "react-bootstrap/dist/react-bootstrap.min.js";

class MyFlixApplication extends React.Component {
  render() {
    return (
      <div>
        <MainView />
      </div>
    
    );
  }
}

const container = document.getElementsByClassName('app-container')[0];
ReactDOM.render(React.createElement(MyFlixApplication), container);