import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import React from "react";
import Row from "../Row/indext";
import "./styles.scss";

export default function Table({ title }: { title: string }) {
  return (
    <div className="table">
      <h2 className="table__title">{title}</h2>
      <div className="table__header">
        <FormControlLabel control={<Checkbox />} label="Выделить всё" />
      </div>
      <div className="table__rows">
        <Row isChecked={true} values={["puk", "kek"]} />
        <Row values={["shmack", "brack"]} />
      </div>
    </div>
  );
}
