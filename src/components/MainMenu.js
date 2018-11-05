import React, { Component } from 'react';
import '../css/App.css';


class MainMenu extends Component {
  // TODO (Kirill): Add links to the menu
  render() {
    return (
      <div id="mainMenuContainer">
        <a href='http://www.therivercommunities.com/'>theRIVER</a>
        <a href='http://www.therivercommunities.com/blog'>BLOG</a>
        <a href='http://www.therivercommunities.com/media'>MEDIA</a>
      </div>
    );
  }
}

export default MainMenu;