import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import React, { useEffect, useState } from "react";
import Row from "../Row/indext";
import "./styles.scss";
import { IRow } from "../../interfaces";

export default function Table({
  title,
  rows,
  className = "",
  onClick = (e?: any) => {},
  onChange = () => {},
}: {
  title: string;
  rows: IRow[];
  className?: string;
  onClick?: () => void;
  onChange?: (arg?: boolean) => void;
}) {
  const [isChecked, setIsChecked] = useState(false);
  useEffect(() => {
    if (!rows.length) {
      setIsChecked(false);
    } else {
      setIsChecked(isAllRowsChecked(rows));
    }
  }, [rows]);
  return (
    <div
      className={`table ${className}`}
      onClick={() => {
        onClick();
      }}
    >
      <h2 className="table__title">{title}</h2>
      <div className="table__header">
        <FormControlLabel
          control={
            <Checkbox
              checked={isChecked}
              onChange={() => {
                setIsChecked(!isChecked);
                onChange(!isChecked);
              }}
            />
          }
          label="Выделить всё"
        />
      </div>
      <div className="table__rows">
        {rows.map((row) => (
          <Row key={row.id} {...row} />
        ))}
      </div>
    </div>
  );
}

function isAllRowsChecked(rows: IRow[]) {
  let isAllRChecked = true;
  for (const row of rows) {
    if (!row.isChecked) {
      isAllRChecked = false;
      break;
    }
  }
  return isAllRChecked;
}
