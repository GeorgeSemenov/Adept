import React, { useState } from "react";
import "./App.scss";
import CompaniesTable from "./components/CompaniesTable";
import WorkersTable from "./components/WorkersTable";
import { IActiveTables } from "./interfaces";

function App() {
  const [activeTables, setActiveTables] = useState<IActiveTables>({});
  return (
    <div className="App">
      <CompaniesTable
        className={activeTables.CompaniesTable ? "active" : ""}
        onClick={() => {
          setActiveTables({ CompaniesTable: true });
        }}
      />
      <WorkersTable
        className={activeTables.WorkersTable ? "active" : ""}
        onClick={() => {
          setActiveTables({ WorkersTable: true });
        }}
      />
    </div>
  );
}

export default App;
