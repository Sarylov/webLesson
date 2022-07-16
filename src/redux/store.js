import { combineReducers, createStore } from "redux";
import contentReducer from "./reducers/contentReducer";
import menuReducer from "./reducers/menuReducer";

let reducers = combineReducers({
  menu: menuReducer,
  content: contentReducer,
});

let store = createStore(reducers);

export default store;
