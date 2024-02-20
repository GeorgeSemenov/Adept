import { createSlice } from "@reduxjs/toolkit";
import { ICompany, IEmployee } from "../../interfaces";
import companiesInitialValue from "../../db";

const defaultFirsId = 1; //С этого значения начинают id для компаний и сотрудников

export const companies = createSlice({
  name: "companies",
  initialState: companiesInitialValue.companies,
  reducers: {
    addCompany: (
      state: ICompany[],
      {
        payload: { name, adress },
      }: { payload: { name: string; adress: string } }
    ) => {
      const lastId = state.length ? state[state.length - 1].id : defaultFirsId;
      const newCompany: ICompany = {
        adress: adress,
        id: lastId + 1,
        name: name,
        staff: [],
      };
      state.push(newCompany);
    },
    setCheckStatusAllCompanies: (
      state: ICompany[],
      { payload: checkStatus }: { payload: boolean }
    ) => {
      state.forEach((company) => (company.isChecked = checkStatus));
    },
    setCompanyName: (
      state: ICompany[],
      {
        payload: { companyId, newCompanyName },
      }: { payload: { companyId: number; newCompanyName: string } }
    ) => {
      findRightCompanyById(state, companyId).name = newCompanyName;
    },
    setCompanyAdres: (
      state: ICompany[],
      {
        payload: { companyId, newCompanyAddress },
      }: { payload: { companyId: number; newCompanyAddress: string } }
    ) => {
      findRightCompanyById(state, companyId).adress = newCompanyAddress;
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
    addEmployee: (
      state: ICompany[],
      {
        payload: { companyId, name, surname, position },
      }: {
        payload: {
          companyId: number;
          name: string;
          surname: string;
          position: string;
        };
      }
    ) => {
      const staff = findRightCompanyById(state, companyId).staff;
      const lastId = staff.length ? staff[staff.length - 1].id : defaultFirsId;
      const newEmployee: IEmployee = {
        companyId: companyId,
        id: lastId + 1,
        name: name,
        surname: surname,
        position: position,
      };
      staff.push(newEmployee);
    },
    setNameEmployee: (
      state: ICompany[],
      {
        payload: { companyId, employeeId, newName },
      }: {
        payload: { companyId: number; employeeId: number; newName: string };
      }
    ) => {
      findRightEmployeeByIds(state, companyId, employeeId).name = newName;
    },
    setSurnameEmployee: (
      state: ICompany[],
      {
        payload: { companyId, employeeId, newSurname },
      }: {
        payload: { companyId: number; employeeId: number; newSurname: string };
      }
    ) => {
      findRightEmployeeByIds(state, companyId, employeeId).surname = newSurname;
    },
    setPositionEmployee: (
      state: ICompany[],
      {
        payload: { companyId, employeeId, newPosition },
      }: {
        payload: { companyId: number; employeeId: number; newPosition: string };
      }
    ) => {
      findRightEmployeeByIds(state, companyId, employeeId).position =
        newPosition;
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

function findRightCompanyById(state: ICompany[], id: number) {
  const companyIndex = state.findIndex((comp) => comp.id === id);
  return state[companyIndex];
}
function findRightEmployeeByIds(
  state: ICompany[],
  companyId: number,
  id: number
) {
  const companyIndex = state.findIndex((comp) => comp.id === companyId);
  const employeeIndex = state[companyIndex].staff.findIndex(
    (empl) => empl.id === id
  );
  return state[companyIndex].staff[employeeIndex];
}
