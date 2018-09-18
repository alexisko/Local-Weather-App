// ACTION TYPES
export const WEATHER_CURRENT_SET = 'WEATHER_CURRENT_SET';
export const WEATHER_THREE_DAY_SET = 'WEATHER_THREE_DAY_SET';

// ACTIONS
export const setCurrentWeather = weather => ({
  type: WEATHER_CURRENT_SET,
  payload: weather
});

export const setThreeDayWeahter = weather => ({
  type: WEATHER_THREE_DAY_SET,
  payload: weather
});