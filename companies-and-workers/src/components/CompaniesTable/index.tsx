import React from "react";
import Table from "../Table";
import { ICompany, ICreateButtonRow, IRow } from "../../interfaces";
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
  } = useActions();
  const rows: (IRow | ICreateButtonRow)[] = companies.map((company) => ({
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
  const createButtonRow: ICreateButtonRow = {
    createButtonText: "просто ты гей, а ещё это кнопка добавления сущности",
  };
  rows.push(createButtonRow);
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
      title="Список компаний"
      rows={rows}
    />
  );
}
