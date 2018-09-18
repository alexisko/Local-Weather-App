import {
  WEATHER_CURRENT_SET,
  WEATHER_THREE_DAY_SET
} from '../actions/weather';

const INITIAL_STATE = {
  current: null,
  threeDay: null
};

const weather = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case WEATHER_CURRENT_SET:
      return { ...state, current: action.payload };
    case WEATHER_THREE_DAY_SET:
      return { ...state, threeDay: action.payload };
    default:
      return state;
  }
}

export default weather;