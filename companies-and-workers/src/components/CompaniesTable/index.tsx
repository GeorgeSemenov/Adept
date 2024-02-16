import React from "react";
import Table from "../Table";

export default function CompaniesTable({
  className = "",
  onClick = () => {},
}: {
  className?: string;
  onClick?: (e?: any) => void;
}) {
  return (
    <Table
      className={className}
      onClick={() => {
        onClick();
      }}
      title="Список компаний"
      rows={[
        {
          id: 2,
          properties: [
            { value: "Рога и копыта" },
            { value: "156 сотрудников" },
            { value: "улица пушкина дом калатушкина" },
          ],
        },
        {
          id: 4,
          properties: [
            { value: "вторая компания" },
            { value: "1 сотрудник" },
            { value: "Где то там" },
          ],
        },
      ]}
    />
  );
}
