import React from "react";

import ToolTip from "@material-ui/core/Tooltip";
import { formatDateObj } from "../../../utils/utils";
import useCardProgressInfo from "../../../utils/hooks/UseCardProgressInfo";
import "./CardProgressInfo.css";

const CardProgressInfo = ({ doneTasksOn, startDate }) => {
  const today = formatDateObj(new Date());

  const {
    currStreak,
    numOfDaysDone,
    numOfDaysMissed,
    successPercent,
  } = useCardProgressInfo(today, doneTasksOn, startDate);

  return (
    <div className="card-progress-info-container">
      {currStreak && (
        <ToolTip title="Current Streak" arrow>
          <section>
            <span>🔥{currStreak}</span>
          </section>
        </ToolTip>
      )}
      <ToolTip title="Days Marked / Days Missed" arrow>
        <section>
          <span className="light-green-text">{numOfDaysDone}</span>
          <span> / </span>
          <span className="red-text">{numOfDaysMissed}</span>
        </section>
      </ToolTip>
      <ToolTip title="Percent of Days Marked" arrow>
        <section>
          {successPercent > 85 && <span>✨</span>}
          <span
            className={`${
              successPercent > 75
                ? "light-green"
                : successPercent < 40
                ? "red"
                : "yellow"
            }-text`}
          >
            {successPercent}%
          </span>
        </section>
      </ToolTip>
    </div>
  );
};

export default CardProgressInfo;
