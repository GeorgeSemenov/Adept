import React from "react";
import Table from "../Table";
import { ICompany } from "../../interfaces";
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
  const { toggleCheckedCompanies, setCheckStatusAllCompanies } = useActions();
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
      rows={companies.map((company) => ({
        id: `${company.id}`,
        properties: [
          { value: company.name, func: company.changeNameFunc },
          { value: `${company.staff.length} сотрудников` },
          { value: company.adress, func: company.changeAdressFunc },
        ],
        onChange: () => {
          toggleCheckedCompanies(company);
        },
        isChecked: company.isChecked,
      }))}
    />
  );
}
