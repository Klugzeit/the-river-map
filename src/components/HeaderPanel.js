import React, { Component } from 'react';
import '../css/App.css';
import FilterButtons from './FilterButtons'


class HeaderPanel extends Component {
  render() {
    return (
      <header className="headerContainer">
        <FilterButtons onFilterChange={this.props.onFilterChange}/>
      </header>
    );
  }
}

export default HeaderPanel;
