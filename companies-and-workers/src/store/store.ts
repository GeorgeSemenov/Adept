import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { reducer as companiesReducer } from "./companies/companies";

const reducers = combineReducers({
  companies: companiesReducer,
});

export const store = configureStore({
  reducer: reducers,
});
