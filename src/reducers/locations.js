import {
  LOCATION_FETCH,
  LOCATION_SET
} from '../actions/locations';

const INITIAL_STATE = {
  location: null,
  fetchingLocation: false
};

const locations = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case LOCATION_FETCH:
      return { ...state, fetchingLocation: true };
    case LOCATION_SET:
      return { ...state, location: action.payload };
    default:
      return state;
  }
}

export default locations;