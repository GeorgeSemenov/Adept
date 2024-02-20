import React from "react";
import Table from "../Table";
import { ICompany, ICreateRowPanel, IEmployee, IRow } from "../../interfaces";
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
    addEmployee,
  } = useActions();
  let rows: (IRow | ICreateRowPanel)[] = [];
  checkedCompanies.forEach((company: ICompany) => {
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

    company.staff.forEach((employee: IEmployee) => {
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
      });
    });
    //Этот объект создан только для того, чтобы извлечь все свойства интерфейса сотрудника в массив
    const dumpEmployee: IEmployee = {
      companyId: 0,
      id: 0,
      name: "",
      surname: "",
      position: "",
    };
    // Удаляем ненужные поля из объекта, например поле companyId никак не может быть инициализированно через панель создания строк(т.к. пользователь не знает этого значения), поэтому её мы удаляем.
    const { companyId, id, ...dumpEmployeeWithNeededProperties } = dumpEmployee;
    const employeeProperties = Object.keys(dumpEmployeeWithNeededProperties);

    const createRowButton: ICreateRowPanel = {
      properties: employeeProperties,
      onSubmit: (data) => {
        addEmployee({ companyId: company.id, ...data });
      },
      submitPanelButtonText: "Создать сотрудника",
    };
    rows.push(createRowButton);
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
