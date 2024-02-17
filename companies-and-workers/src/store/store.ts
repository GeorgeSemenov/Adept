import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { reducer as checkedCompaniesReducer } from "./checkedCompanies/checkedCompanies";

const reducers = combineReducers({
  checkedCompaines: checkedCompaniesReducer,
});

export const store = configureStore({
  reducer: reducers,
});
