import { createSlice } from "@reduxjs/toolkit";
import { ICompany, IEmployee } from "../../interfaces";
import companiesInitialValue from "../../db";

export const companies = createSlice({
  name: "companies",
  initialState: companiesInitialValue.companies,
  reducers: {
    setCheckStatusAllCompanies: (
      state: ICompany[],
      { payload: checkStatus }: { payload: boolean }
    ) => {
      state.forEach((company) => (company.isChecked = checkStatus));
    },
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
    setCheckStatusAllWorkersFromCheckedCompanies: (
      state: ICompany[],
      { payload: checkStatus }: { payload: boolean }
    ) => {
      const allCheckedCompanies = state.filter((company) => company.isChecked);
      allCheckedCompanies.forEach((company) => {
        company.staff.forEach((employee) => (employee.isChecked = checkStatus));
      });
    },
  },
});

export const { actions, reducer } = companies;
