import React, { useState } from "react";
import "./App.scss";
import CompaniesTable from "./components/CompaniesTable";
import WorkersTable from "./components/WorkersTable";
import { IActiveTables, ICompany } from "./interfaces";
import { useSelector } from "react-redux";

function App() {
  const [activeTables, setActiveTables] = useState<IActiveTables>({});
  const companies = useSelector(
    (state: { companies: ICompany[] }) => state.companies
  );

  return (
    <div className="App">
      <CompaniesTable
        className={activeTables.CompaniesTable ? "active" : ""}
        companies={companies}
        onClick={() => {
          setActiveTables({ CompaniesTable: true });
        }}
      />
      <WorkersTable
        className={activeTables.WorkersTable ? "active" : ""}
        checkedCompanies={companies.filter((company) => company.isChecked)}
        onClick={() => {
          setActiveTables({ WorkersTable: true });
        }}
      />
    </div>
  );
}

export default App;
