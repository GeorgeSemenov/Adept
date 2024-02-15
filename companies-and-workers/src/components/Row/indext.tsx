import { Checkbox } from "@mui/material";
import React from "react";
import "./styles.scss";

export default function Row({
  isChecked = false,
  values,
}: {
  isChecked?: boolean;
  values: string[];
}) {
  return (
    <div className="table__row">
      <Checkbox checked={isChecked} className="table__row-checkbox" />
      {values.map((value, key) => (
        <span key={key}>{value + " "}</span>
      ))}
    </div>
  );
}
