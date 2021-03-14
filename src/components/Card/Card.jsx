import React from "react";
import Grid from "../Grid/Grid";
import "./Card.css";
import { useGlobalContext } from "../../context/context";
import { formatDateObj } from "../../utils/utils";
import DeleteCardBtn from "./DeleteCardBtn/DeleteCardBtn";
import Notification from "../Notification/Notification";

const Card = React.memo(
  ({ habit }) => {
    const { id, name, description, startDate, doneTasksOn } = habit;
    const { toggleToday } = useGlobalContext();
    const doneToday = doneTasksOn.indexOf(formatDateObj(new Date())) !== -1;
    const [showNotification, setShowNotification] = React.useState(false);

    console.log("Loaded Card: " + name);

    return (
      <div className="card">
        <Notification
          openNotification={showNotification}
          message={`Marked habit as ${doneToday ? "Done" : "Undo"} for today!`}
          severity={`${doneToday ? "success" : "warning"}`}
        />
        <DeleteCardBtn id={id} />
        <div className="card-header">
          <h2>{name}</h2>
          <p>{description}</p>
        </div>
        <Grid startDate={startDate} doneTasksOn={doneTasksOn} />
        <button
          className="card-submit-btn"
          id={`${doneToday ? "undo-btn" : ""}`}
          onClick={() => {
            setShowNotification(true);
            setTimeout(() => {
              setShowNotification(false);
            }, 1000);
            toggleToday(id);
          }}
        >
          {`${doneToday ? "Undo" : "Mark Today"}`}
        </button>
      </div>
    );
  },
  (preprops, nextProps) => {
    console.log(
      preprops.habit.name +
        " - Previous doneTasksOn Len: " +
        preprops.habit.doneTasksOn.length
    );
    console.log(
      nextProps.habit.name +
        " - Next doneTasksOn Len: " +
        nextProps.habit.doneTasksOn.length
    );
    // if (
    //   preprops.habit.doneTasksOn.length === nextProps.habit.doneTasksOn.length
    // ) {
    //   console.log("doneTasksOn Length NOT has changed!");
    //   return false;
    // }

    // console.log("doneTasksOn Length has changed!");
    // return true;
  }
);

export default Card;
