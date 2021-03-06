import React from "react";
import "./GridBox.css";
import ToolTip from "@material-ui/core/Tooltip";

const GridBox = ({
  id,
  isEmpty,
  isTaskDone,
  caption,
  isPending,
  toolTipCaption,
}) => {
  if (!isEmpty) {
    return (
      <ToolTip key={id} title={toolTipCaption} arrow>
        <div
          className={`grid-box${isEmpty ? "-empty" : ""} ${
            isPending && !isTaskDone ? "" : isTaskDone ? "active" : "missed"
          }`}
        >
          {caption && <small>{caption}</small>}
        </div>
      </ToolTip>
    );
  } else {
    return (
      <div
        className={`grid-box${isEmpty ? "-empty" : ""} ${
          isPending && !isTaskDone ? "" : isTaskDone ? "active" : "missed"
        }`}
      >
        {caption && <small>{caption}</small>}
      </div>
    );
  }
};

export default GridBox;
