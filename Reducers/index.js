import { combineReducers } from "redux";

/////////// IMPORT REDUCERS ///////////////
import SettingsReducer from "./SettingsReducer";
import RehydrateReducer from "./RehydrateReducer";
import DatazReducer from "./DatazReducer";

export default combineReducers({
  dataz: DatazReducer,
  settings: SettingsReducer,
  rehydrate: RehydrateReducer
});
