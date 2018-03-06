import React, { Component } from 'react';
import '../css/App.css';


class MainMenu extends Component {
  // TODO (Kirill): Add links to the menu
  render() {
    return (
      <div id="mainMenuContainer">
        <a href='http://milamex.com/blogtheriver'>theRIVER</a>
        <a href='http://milamex.com/blogtheriver/blog'>BLOG</a>
        <a href='http://milamex.com/blogtheriver/media'>MEDIA</a>
      </div>
    );
  }
}

export default MainMenu;