import React, { Component } from 'react';
import '../css/App.css';


class MainMenu extends Component {
  // TODO (Kirill): Add links to the menu
  render() {
    return (
      <div id="mainMenuContainer">
        <a href='theRiver.html'>theRIVER</a>
        <a href='http://milamex.com/blogtheriver/'>Blog</a>
        <a href='http://www.therivercommunities.com/#history-page'>About</a>
      </div>
    );
  }
}

export default MainMenu;