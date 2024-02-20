import { IRow, IRowProperty } from "../../interfaces";
import { Checkbox } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
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
          onSubmit={(inputValue) => {
            setIsEditing(false);
            if (func) {
              func(inputValue);
            }
          }}
          defaultValue={value}
        />
      ) : func ? (
        <Button
          className="table__row-property-name-button"
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
  onSubmit: (inputValue: string) => void;
  defaultValue: string;
}) {
  const [inputValue, setInputValue] = useState(defaultValue);
  const [isInputEmpty, setIsInputEmpty] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  return (
    <form
      className="table__row-property-edit-form"
      onSubmit={(e) => {
        e.preventDefault();
        if (!inputValue.trim()) {
          setIsInputEmpty(true);
        } else {
          onSubmit(inputValue);
        }
      }}
    >
      <TextField
        inputRef={inputRef}
        id="outlined-basic"
        value={inputValue}
        variant="outlined"
        className="table__row-property-edit-form-input"
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
      />
      {isInputEmpty && (
        <span className="table__row-property-edit-form-error">
          Поле ввода не может быть пустым
        </span>
      )}
      <Button type="submit" variant="contained">
        Сохранить
      </Button>
    </form>
  );
}
