import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import React, { useEffect, useState } from "react";
import Row from "../Row/indext";
import "./styles.scss";
import { ICreateRowPanel, IRow, isIRow } from "../../interfaces";
import CreateRowPanel from "../CreateRowPanel";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Table({
  title,
  rows,
  className = "",
  onClick = (e?: any) => {},
  onChange,
  onRemove,
}: {
  title: string;
  rows: (IRow | ICreateRowPanel)[];
  className?: string;
  onRemove: () => void;
  onChange: (arg?: boolean) => void;
  onClick?: () => void;
}) {
  const [isChecked, setIsChecked] = useState(false);
  let [isAllRowsChecked, setIsAllRowsChecked] = useState(false);
  let [isOneRowChecked, setIsOneRowChecked] = useState(false);
  useEffect(() => {
    if (!rows.length) {
      setIsChecked(false);
    } else {
      const dumbObj = isAllOrOneRowsChecked(rows);
      setIsAllRowsChecked(dumbObj.isAllRowsChecked);
      setIsOneRowChecked(dumbObj.isOneRowChecked);
      setIsChecked(isAllRowsChecked);
    }
  }, [rows, isAllRowsChecked]);
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
        <IconButton
          aria-label="delete"
          size="large"
          disabled={!isOneRowChecked}
          color="primary"
          onClick={() => {
            onRemove();
          }}
        >
          <DeleteIcon fontSize="inherit" />
        </IconButton>
      </div>
      <ul className="table__rows">
        {rows.map((row, index) => {
          if (isIRow(row)) {
            return <Row key={index} {...row} />;
          } else {
            return <CreateRowPanel key={index} ruleObj={row} />;
          }
        })}
      </ul>
    </div>
  );
}

function isAllOrOneRowsChecked(rows: (IRow | ICreateRowPanel)[]) {
  let isAllRowsChecked = true;
  let isOneRowChecked = false;
  for (const row of rows) {
    if (!isIRow(row)) {
      continue;
    }
    if (row.isListHead) {
      continue;
    }
    if (!row.isChecked) {
      isAllRowsChecked = false;
    }
    if (row.isChecked) {
      isOneRowChecked = true;
    }
    if (!isAllRowsChecked && isOneRowChecked) {
      break;
    }
  }
  return {
    isAllRowsChecked: isAllRowsChecked,
    isOneRowChecked: isOneRowChecked,
  };
}
