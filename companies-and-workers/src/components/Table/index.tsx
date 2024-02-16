import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import React from "react";
import Row from "../Row/indext";
import "./styles.scss";
import { IRow } from "../../interfaces";

export default function Table({
  title,
  rows,
  className = "",
  onClick = (e?: any) => {},
}: {
  title: string;
  rows: IRow[];
  className?: string;
  onClick?: () => void;
}) {
  return (
    <div
      className={`table ${className}`}
      onClick={() => {
        onClick();
      }}
    >
      <h2 className="table__title">{title}</h2>
      <div className="table__header">
        <FormControlLabel control={<Checkbox />} label="Выделить всё" />
      </div>
      <div className="table__rows">
        {rows.map((row) => (
          <Row key={row.id} {...row} />
        ))}
      </div>
    </div>
  );
}
