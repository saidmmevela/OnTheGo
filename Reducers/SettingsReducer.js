import {
  SKIP_WALKTHROUGH,
  CHANGE_CONNECTION_STATUS,
  LOGGED_IN,
  LOGGED_OUT,
  RESET_DATA
} from "../actions/types";

const initialState = {
  walkthrough: false,
  isConnected: true,
  userLoggedIn: false,
  user: {}
};

const applySetUserType = (state, action) => ({
  ...state,
  userLoggedIn: action.payload
});

export default (state = initialState, action) => {
  switch (action.type) {
    case SKIP_WALKTHROUGH:
      return {
        ...state,
        walkthrough: action.skip
      };
      break;

    case CHANGE_CONNECTION_STATUS:
      return {
        ...state,
        isConnected: action.isConnected
      };
      break;

    case LOGGED_IN:
      return {
        ...state,
        userLoggedIn:true,
        user: action.payload
      };
      break;

    case LOGGED_OUT:
      return {
        ...state,
        userLoggedIn: action.payload
      };
      break;

    case RESET_DATA:
      return {
        ...state,
        ...initialState
      };

    default:
      return state;
  }
};
