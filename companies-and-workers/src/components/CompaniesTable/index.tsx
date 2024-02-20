import React from "react";
import Table from "../Table";
import { ICompany, ICreateRowPanel, IRow } from "../../interfaces";
import { useActions } from "../../hooks/useActions";

export default function CompaniesTable({
  companies,
  className = "",
  onClick = () => {},
}: {
  companies: ICompany[];
  className?: string;
  onClick?: (e?: any) => void;
}) {
  const {
    toggleCheckedCompanies,
    setCheckStatusAllCompanies,
    setCompanyName,
    setCompanyAdres,
    addCompany,
    removeCheckedCompanies,
  } = useActions();
  const rows: (IRow | ICreateRowPanel)[] = companies.map((company) => ({
    id: `${company.id}`,
    properties: [
      {
        value: company.name,
        func: (newName: string) => {
          setCompanyName({
            companyId: company.id,
            newCompanyName: newName,
          });
        },
      },
      { value: `${company.staff.length} сотрудников` },
      {
        value: company.adress,
        func: (newAddress: string) => {
          setCompanyAdres({
            companyId: company.id,
            newCompanyAddress: newAddress,
          });
        },
      },
    ],
    onChange: () => {
      toggleCheckedCompanies(company);
    },
    isChecked: company.isChecked,
  }));
  if (!rows.length) {
    rows.push({
      id: `0`,
      properties: [{ value: "В данном списке пока нет ни одной компании." }],
      isListHead: true,
    });
  }

  const dumpCompany: ICompany = { adress: "", id: 0, name: "", staff: [] }; //Этот объект создан только для того, чтобы извлечь все свойства интерфейса компании в массив
  const { staff, id, ...dumpCompanyWithNeededProperties } = dumpCompany; // Удаляем ненужные поля из объекта, например поля staff и id никак не может быть инициализированно через панель создания строк, поэтому её мы удаляем.
  const propertiesOfCompany = Object.keys(dumpCompanyWithNeededProperties);

  const createRowPanel: ICreateRowPanel = {
    properties: propertiesOfCompany,
    onSubmit: (data) => {
      addCompany(data);
    },
    submitPanelButtonText: "Добавить компанию",
  };
  rows.push(createRowPanel);
  return (
    <Table
      className={className}
      onChange={(checkStatus) => {
        if (checkStatus !== undefined) {
          setCheckStatusAllCompanies(checkStatus);
        }
      }}
      onClick={() => {
        onClick();
      }}
      onRemove={() => {
        removeCheckedCompanies();
      }}
      title="Список компаний"
      rows={rows}
    />
  );
}
