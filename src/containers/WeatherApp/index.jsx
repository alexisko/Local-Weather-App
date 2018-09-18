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
  componentDidMount() {
    this.props.fetchCurrentLocation();
  }

  render() {
    const { location } = this.props;
    return (
      <React.Fragment>
        <WeatherAppComponent />
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WeatherApp);