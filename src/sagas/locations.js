import {
  call,
  put,
  takeLatest
} from 'redux-saga/effects';
// API CALLS
import { fetchCurrentLocationApi } from '../api/locations';
import { 
  fetchCurrentWeatherApi, 
  fetchThreeDayWeatherApi 
} from '../api/weather';
// ACTION TYPES
import { LOCATION_FETCH } from '../actions/locations';
// ACTIONS
import { setLocation } from '../actions/locations';

function* fetchCurrentLocationCall() {
  try {
    const response = yield call(fetchCurrentLocationApi);
    const location = response.data.city;
    yield put(setLocation(location));
    console.log(response);
    if(location) {
      const weather = yield call(fetchCurrentWeatherApi, location);
      const threeDay = yield call(fetchThreeDayWeatherApi, location);
      console.log(weather);
      console.log(threeDay);
    }
  } catch(error) {
    console.log(error);
  }
}

export function* watchLocations() {
  yield takeLatest(LOCATION_FETCH, fetchCurrentLocationCall);
}