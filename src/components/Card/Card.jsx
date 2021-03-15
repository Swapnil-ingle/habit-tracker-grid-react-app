import React from "react";
import Grid from "../Grid/Grid";
import "./Card.css";
import { formatDateObj } from "../../utils/utils";
import DeleteCardBtn from "./DeleteCardBtn/DeleteCardBtn";

const Card = React.memo(
  ({ id, name, description, startDate, doneTasksOn, markHabitDone }) => {
    console.log(`Rendering ${name}`);

    const doneToday = doneTasksOn.indexOf(formatDateObj(new Date())) !== -1;

    return (
      <div className="card">
        <DeleteCardBtn id={id} />
        <div className="card-header">
          <h2>{name}</h2>
          <p>{description}</p>
        </div>
        <Grid startDate={startDate} doneTasksOn={doneTasksOn} />
        <button
          id={`${doneToday ? "undo-btn" : ""}`}
          className="card-submit-btn"
          onClick={() => {
            markHabitDone(id);
          }}
        >
          {`${doneToday ? "Undo" : "Mark Today"}`}
        </button>
      </div>
    );
  }
);

export default Card;
