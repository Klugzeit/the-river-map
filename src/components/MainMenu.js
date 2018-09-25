import React, { Component } from 'react';
import '../css/App.css';


class MainMenu extends Component {
  // TODO (Kirill): Add links to the menu
  render() {
    return (
      <div id="mainMenuContainer">
        <a href='http://www.therivermaps.info/'>theRIVER</a>
        <a href='http://www.therivermaps.info/blog'>BLOG</a>
        <a href='http://www.therivermaps.info/media'>MEDIA</a>
      </div>
    );
  }
}

export default MainMenu;