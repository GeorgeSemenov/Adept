import React from "react";
import Table from "../Table";
import { ICompany, IRow } from "../../interfaces";
import { useActions } from "../../hooks/useActions";

export default function WorkersTable({
  checkedCompanies,
  className = "",
  onClick = () => {},
}: {
  checkedCompanies: ICompany[];
  className?: string;
  onClick?: (e?: any) => void;
}) {
  const {
    toggleCheckedEmployee,
    setCheckStatusAllWorkersFromCheckedCompanies,
  } = useActions();
  let rows: IRow[] = [];
  checkedCompanies.forEach((company) => {
    rows.push({
      id: `${company.id}`,
      properties: [
        { value: company.name },
        { value: `${company.staff.length} сотрудников` },
        { value: company.adress },
      ],
      isListHead: true,
      isChecked: true,
    });

    company.staff.forEach((employee) =>
      rows.push({
        id: `${company.id}.${employee.id}`,
        properties: [
          { value: employee.name, func: employee.changeName },
          { value: employee.surname, func: employee.changeSurname },
          { value: employee.position, func: employee.changePosition },
        ],
        isChecked: employee.isChecked,
        onChange: () => {
          toggleCheckedEmployee(employee);
        },
      })
    );
  });
  return (
    <Table
      className={className}
      onClick={() => {
        onClick();
      }}
      onChange={(checkStatus) => {
        if (checkStatus !== undefined) {
          setCheckStatusAllWorkersFromCheckedCompanies(checkStatus);
        }
      }}
      title="Список сотрудников"
      rows={rows}
    />
  );
}
