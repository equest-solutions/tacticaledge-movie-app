
import { createStore, combineReducers } from "redux";
import userDataReducer from "../reducers/userDataReducer";

const rootReducer = combineReducers({
  data: userDataReducer
});
const store = createStore(rootReducer);

export default store;