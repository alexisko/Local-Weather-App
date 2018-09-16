import { all } from 'redux-saga/effects';
import { watchLocations } from './locations';

export default function* rootSaga() {
  yield all([
    watchLocations()
  ]);
}