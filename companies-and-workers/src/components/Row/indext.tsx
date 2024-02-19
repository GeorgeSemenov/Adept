import { IRow } from "../../interfaces";
import { Checkbox } from "@mui/material";
import React from "react";
import "./styles.scss";

export default function Row({
  isChecked = false,
  className = "",
  properties,
  isListHead = false,
  onChange = () => {},
}: IRow) {
  className += isListHead ? "table__row_theme_head-list" : "";
  return (
    <div className={`table__row ${className}`}>
      {!isListHead && (
        <Checkbox
          checked={isChecked}
          className="table__row-checkbox"
          onChange={() => {
            onChange();
          }}
        />
      )}
      <div className="table__row-data">
        {properties.map((prop, key) =>
          prop.func ? (
            <button key={key}>{prop.value + " "}</button>
          ) : (
            <span key={key}>{prop.value + " "}</span>
          )
        )}
      </div>
    </div>
  );
}
