import { createSlice } from "@reduxjs/toolkit";
import { ICompany, IEmployee } from "../../interfaces";
import companiesInitialValue from "../../db";

export const companies = createSlice({
  name: "companies",
  initialState: companiesInitialValue.companies,
  reducers: {
    toggleCheckedCompanies: (
      state: ICompany[],
      { payload }: { payload: ICompany }
    ) => {
      const index = state.findIndex((company) => company.id === payload.id);
      state[index].isChecked = !state[index].isChecked;
    },
    toggleCheckedEmployee: (
      state: ICompany[],
      { payload: employee }: { payload: IEmployee }
    ) => {
      const companyIndex = state.findIndex(
        (company) => company.id === employee.companyId
      );
      const employeeIndex = state[companyIndex].staff.findIndex(
        (empl) => empl.id === employee.id
      );
      state[companyIndex].staff[employeeIndex].isChecked =
        !state[companyIndex].staff[employeeIndex].isChecked;
    },
  },
});

export const { actions, reducer } = companies;
