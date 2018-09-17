import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './styles.css';

class SearchBar extends Component {
  render() {
    return (
      <div className="search-bar">
        <div className="search-container">
          <input className="search-input" />
          <FontAwesomeIcon 
            className="search-icon"
            color="gray"
            icon="search"
            size="2x"
          />
        </div>
      </div>
    );
  }
}

export default SearchBar;