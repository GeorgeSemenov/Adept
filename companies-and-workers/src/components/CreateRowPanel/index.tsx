import React, { useState } from "react";
import { ICreateRowPanel } from "../../interfaces";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import "./styles.scss";

export default function CreateRowPanel({
  className = "",
  ruleObj,
}: {
  className?: string;
  ruleObj: ICreateRowPanel;
}) {
  const [isCreatePanelOpen, setIsCreatePanelOpen] = useState<boolean>(false);
  className = "table__create-row-panel " + className;
  return (
    <li className={className}>
      {isCreatePanelOpen ? (
        <CreateRowForm
          properties={ruleObj.properties}
          submitButtonText={ruleObj.submitPanelButtonText}
          setIsCreatePanelOpen={(isOpen: boolean) => {
            setIsCreatePanelOpen(isOpen);
          }}
          onSubmit={ruleObj.onSubmit}
        />
      ) : (
        <Button
          variant="contained"
          onClick={() => {
            setIsCreatePanelOpen(true);
          }}
        >{`+`}</Button>
      )}
    </li>
  );
}

function CreateRowForm({
  properties,
  onSubmit,
  submitButtonText,
  setIsCreatePanelOpen,
}: {
  properties: string[];
  onSubmit: (arg?: any) => void;
  submitButtonText: string;
  setIsCreatePanelOpen: (arg: boolean) => void;
}) {
  const [formInfoObj, setFormInfoObj] = useState<any>({});
  const [isFormInfoObjHaveEmptyFields, setIsFormInfoObjHaveEmptyFields] =
    useState<boolean>(false);
  return (
    <form
      onSubmit={() => {
        setIsFormInfoObjHaveEmptyFields(false);
        for (const field of formInfoObj) {
          if (!field.trim()) {
            setIsFormInfoObjHaveEmptyFields(true);
          }
        }
        if (!isFormInfoObjHaveEmptyFields) {
          onSubmit(formInfoObj);
          setIsCreatePanelOpen(false);
        }
      }}
    >
      <div className="table__create-row-panel-inputs-wrapper">
        {properties.map((prop, index) => (
          <PropertyField
            key={index}
            value={formInfoObj[prop]}
            placeholder={prop}
            onChange={(inputVal) => {
              const newFormInfoObj = { ...formInfoObj };
              newFormInfoObj[prop] = inputVal;
              setFormInfoObj({ ...newFormInfoObj });
            }}
          />
        ))}
      </div>
      {isFormInfoObjHaveEmptyFields && (
        <span className="table__create-row-panel-error-message">
          Все поля обязательны для заполнения
        </span>
      )}
      <Button type="submit">{submitButtonText}</Button>
    </form>
  );
}

function PropertyField({
  onChange,
  placeholder,
  value,
}: {
  onChange: (inputVal: string) => void;
  value: string;
  placeholder: string;
}) {
  return (
    <TextField
      className="table__create-row-panel-input"
      placeholder={placeholder}
      id="outlined-basic"
      value={value}
      variant="outlined"
      onChange={(e) => {
        onChange(e.target.value);
      }}
    />
  );
}
