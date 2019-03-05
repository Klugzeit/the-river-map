import React, { Component } from 'react';
import '../css/App.css';


class ColorMenu extends Component {
  // TODO (Kirill): Add links to the menu
  render() {
    return (
      <div id="colorMenuContainer">
        <img src="assets/icons/orange.PNG"/>
        <a href='http://www.therivercommunities.com/#community'>RIVER Communities</a>
           <img src="assets/icons/blue.PNG"/>
        <a href='http://www.therivercommunities.com/#connection'>RIVER Connections</a>
         <img src="assets/icons/gray.PNG"/>
        <a href='http://www.therivercommunities.com/#gray_dots'>Starting/ Joining places</a>
      </div>
    );
  }
}

export default ColorMenu;
