import { createSlice } from "@reduxjs/toolkit";
import { ICompany } from "../../interfaces";

export const checkedCompanies = createSlice({
  name: "checkedCompanies",
  initialState: [],
  reducers: {
    toggleCheckedCompanies: (state: ICompany[], { payload }) => {
      const index = state.findIndex((company) => company.id === payload.id);
      if (~index) {
        state.splice(index, 1);
      } else {
        state.push(payload);
      }
    },
  },
});

export const { actions, reducer } = checkedCompanies;
