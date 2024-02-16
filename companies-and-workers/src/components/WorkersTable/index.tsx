import React from "react";
import Table from "../Table";

export default function WorkersTable({
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
      title="Список сотрудников"
      rows={[
        {
          id: 1,
          isListHead: true,
          properties: [{ value: "Рога и копыта" }],
        },
        {
          id: 2,
          properties: [
            { value: "Вася" },
            { value: "Пупкин" },
            { value: "программатор" },
          ],
        },
        {
          id: 4,
          properties: [
            { value: "Зуб" },
            { value: "Пердолович" },
            { value: "Биг босс" },
          ],
        },
      ]}
    />
  );
}
