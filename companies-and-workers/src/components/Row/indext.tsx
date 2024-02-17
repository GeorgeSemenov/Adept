import { IRow } from "../../interfaces";
import { Checkbox } from "@mui/material";
import React from "react";
import "./styles.scss";
import { useDispatch, useSelector } from "react-redux";

export default function Row({
  isChecked = false,
  className = "",
  properties,
  isListHead = false,
}: IRow) {
  className += isListHead ? "table__row_theme_head-list" : "";
  const dispatch = useDispatch();
  return (
    <div className={`table__row ${className}`}>
      {!isListHead && (
        <Checkbox
          checked={isChecked}
          className="table__row-checkbox"
          onChange={() => {
            dispatch(actions.toggle);
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
