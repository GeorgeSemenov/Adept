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
    setNameEmployee,
    setSurnameEmployee,
    setPositionEmployee,
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
          {
            value: employee.name,
            func: (newName: string) => {
              setNameEmployee({
                companyId: employee.companyId,
                employeeId: employee.id,
                newName: newName,
              });
            },
          },
          {
            value: employee.surname,
            func: (newSurname: string) => {
              setSurnameEmployee({
                companyId: employee.companyId,
                employeeId: employee.id,
                newSurname: newSurname,
              });
            },
          },
          {
            value: employee.position,
            func: (newPosition: string) => {
              setPositionEmployee({
                companyId: employee.companyId,
                employeeId: employee.id,
                newPosition: newPosition,
              });
            },
          },
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
