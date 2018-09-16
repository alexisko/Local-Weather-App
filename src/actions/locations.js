// ACTION TYPES
export const LOCATION_FETCH = 'LOCATION_FETCH';
export const LOCATION_SET = 'LOCATION_SET';

// ACTIONS
export const fetchCurrentLocation = () => ({
  type: LOCATION_FETCH
});

export const setLocation = location => ({
  type: LOCATION_SET,
  payload: location
});