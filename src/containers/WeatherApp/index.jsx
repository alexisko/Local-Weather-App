import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchCurrentLocation } from '../../actions/locations';

import WeatherAppComponent from '../../components/WeatherApp';

const mapStateToProps = state => {
  return {
    location: state.locations.location
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchCurrentLocation: () => {
      dispatch(fetchCurrentLocation())
    }
  };
};

class WeatherApp extends Component {
  render() {
    const { location } = this.props;
    return (
      <React.Fragment>
        {/* <h1>Weather App</h1>
        {location}<br />
        <button onClick={this.props.fetchCurrentLocation}>Click</button> */}
        <WeatherAppComponent />
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WeatherApp);