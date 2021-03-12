import React from "react";
import Grid from "../Grid/Grid";
import "./Card.css";
import { useGlobalContext } from "../../context/context";
import { formatDateObj } from "../../utils/utils";
import DeleteCardBtn from "./DeleteCardBtn/DeleteCardBtn";
import Notification from "../Notification/Notification";

const Card = ({ id, name, description, startDate, doneTasksOn }) => {
  const { toggleToday } = useGlobalContext();
  const doneToday = doneTasksOn.indexOf(formatDateObj(new Date())) !== -1;
  const [showNotification, setShowNotification] = React.useState(false);

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
};

export default Card;
