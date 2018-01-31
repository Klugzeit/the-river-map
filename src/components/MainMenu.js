import React, { Component } from 'react';
import '../css/App.css';


class MainMenu extends Component {
  // TODO (Kirill): Add links to the menu
  render() {
    return (
      <div id="mainMenuContainer">
        <a href='#'>The River</a>
        <a href='#'>Blog</a>
        <a href='#'>About</a>
      </div>
    );
  }
}

export default MainMenu;