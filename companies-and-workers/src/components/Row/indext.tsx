import { IRow, IRowProperty } from "../../interfaces";
import { Checkbox } from "@mui/material";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
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
        {properties.map((prop, key) => (
          <RowProperty {...prop} key={key} />
        ))}
      </div>
    </div>
  );
}

function RowProperty({ value, func, key }: IRowProperty) {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <span key={key} className="table__row-property-container">
      {isEditing ? (
        <EditPropertyForm
          onSubmit={() => {
            setIsEditing(false);
          }}
          defaultValue={value}
        />
      ) : func ? (
        <Button
          key={key}
          variant="outlined"
          onClick={() => {
            setIsEditing(true);
          }}
        >
          {value}
        </Button>
      ) : (
        <span key={key} className="table__row-data-text">
          {value}
        </span>
      )}
    </span>
  );
}

function EditPropertyForm({
  onSubmit,
  defaultValue,
}: {
  onSubmit: () => void;
  defaultValue: string;
}) {
  const [inputValue, setInputValue] = useState(defaultValue);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <TextField id="outlined-basic" value={inputValue} variant="outlined" />
      <Button type="submit" variant="contained">
        Сохранить
      </Button>
    </form>
  );
}
