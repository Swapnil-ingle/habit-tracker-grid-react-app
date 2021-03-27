import React from "react";
import Grid from "../Grid/Grid";
import "./Card.css";
import { formatDateObj } from "../../utils/utils";
import DeleteCardBtn from "./DeleteCardBtn/DeleteCardBtn";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CardProgressInfo from "./CardProgressInfo/CardProgressInfo";

toast.configure();

const Card = React.memo(
  ({ id, name, description, startDate, doneTasksOn, markHabitDone }) => {
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
            if (doneToday) {
              toast.error("Removed habit mark!", {
                position: toast.POSITION.BOTTOM_CENTER,
              });
            } else {
              toast.success("Marked habit as done!", {
                position: toast.POSITION.BOTTOM_CENTER,
              });
            }
          }}
        >
          {`${doneToday ? "Undo" : "Mark Today"}`}
        </button>
        <CardProgressInfo doneTasksOn={doneTasksOn} startDate={startDate} />
      </div>
    );
  }
);

export default Card;
