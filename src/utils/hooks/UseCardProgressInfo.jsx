import React, { useState } from "react";

import { substractNDaysReturnString, dateDiffInDays } from "../utils";

const useCardProgressInfo = (today, doneTasksOn, startDate) => {
  const [currStreak, setCurrStreak] = useState(0);
  const [numOfDaysDone, setNumOfDaysDone] = useState(0);
  const [numOfDaysMissed, setNumOfDaysMissed] = useState(0);
  const [successPercent, setSuccessPercent] = useState(0);

  const calculateNumOfDaysMissed = React.useCallback(
    (doneTasksOn, today) => {
      const totalDays = dateDiffInDays(
        startDate,
        getLastDoneDate(doneTasksOn, today)
      );

      const numOfDaysTasksDone = doneTasksOn.length;

      return totalDays - numOfDaysTasksDone;
    },
    [startDate]
  );

  const calculateSuccessPercent = React.useCallback(
    (doneTasksOn, today) => {
      const numOfDaysDone = doneTasksOn.length;
      const numOfDaysMissed = calculateNumOfDaysMissed(doneTasksOn, today);
      const totalDays = numOfDaysDone + numOfDaysMissed;
      return totalDays === 0
        ? 0
        : Math.round((numOfDaysDone / totalDays) * 100);
    },
    [calculateNumOfDaysMissed]
  );

  const calculateCurrStreak = React.useCallback((today, doneTasksOn) => {
    let newCurrStreak = 0;

    if (doneTasksOn.length === 0) {
      return;
    }

    let currDate = getLastDoneDate(doneTasksOn, today);

    for (let i = doneTasksOn.length - 1; i >= 0; i--) {
      if (currDate === doneTasksOn[i]) {
        newCurrStreak++;
        currDate = substractNDaysReturnString(currDate, 1);
      } else {
        break;
      }
    }

    return newCurrStreak === 0 ? undefined : newCurrStreak;
  }, []);

  const calculateProgressInfo = React.useCallback(() => {
    setCurrStreak(calculateCurrStreak(today, doneTasksOn));
    setNumOfDaysDone(doneTasksOn.length);
    setNumOfDaysMissed(calculateNumOfDaysMissed(doneTasksOn, today));
    setSuccessPercent(calculateSuccessPercent(doneTasksOn, today));
  }, [
    calculateCurrStreak,
    calculateNumOfDaysMissed,
    calculateSuccessPercent,
    doneTasksOn,
    today,
  ]);

  React.useEffect(() => {
    calculateProgressInfo();
  }, [today, doneTasksOn, startDate, calculateProgressInfo]);

  return { currStreak, numOfDaysDone, numOfDaysMissed, successPercent };
};

function getLastDoneDate(doneTasksOn, today) {
  return doneTasksOn.indexOf(today) !== -1
    ? today
    : substractNDaysReturnString(today, 1);
}

export default useCardProgressInfo;
