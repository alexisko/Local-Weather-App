import {
  call,
  put,
  takeLatest
} from 'redux-saga/effects';
// API CALLS
import { fetchCurrentLocationApi } from '../api/locations';
// ACTION TYPES
import { LOCATION_FETCH } from '../actions/locations';
// ACTIONS
import { setLocation } from '../actions/locations';

function* fetchCurrentLocationCall() {
  try {
    const response = yield call(fetchCurrentLocationApi);
    yield put(setLocation(response.data.city));
    console.log(response);
  } catch(error) {
    console.log(error);
  }
}

export function* watchLocations() {
  yield takeLatest(LOCATION_FETCH, fetchCurrentLocationCall);
}