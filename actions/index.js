import {
  SKIP_WALKTHROUGH,
  CHANGE_CONNECTION_STATUS,
  LOGGED_IN,
  LOGGED_OUT,
  RESET_DATA,
} from './types';

/////////////////////////////////////
/////////  ACTION TRIGGERS  /////////
/////////////////////////////////////

export const isConnected = (data) => {
  return {
    type: LOGGED_IN,
    payload:data,
  };
};

export const resetData = () => {
  return {
    type: RESET_DATA,
  };
};
