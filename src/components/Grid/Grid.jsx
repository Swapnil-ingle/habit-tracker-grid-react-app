import React from "react";
import "./Grid.css";
import {
  formatDateObj,
  generateGridDateArray,
  resolveMonthNumeralToSpell,
  resolveDayNumberToDayName,
} from "../../utils/utils";
import GridBox from "./GridBox/GridBox";

const Grid = ({ startDate, doneTasksOn }) => {
  let endDate = new Date(startDate).getFullYear() + "-12-31"; // End of the year
  const gridBoxes = generateGridDateArray(startDate, endDate);

  let gridBoxId = 0;
  let gridBoxColId = 0;
  let gridBoxRowId = 0;

  return (
    <div className="grid scrollbar-hidden">
      {gridBoxes.map((item) => {
        gridBoxId++;
        gridBoxColId = gridBoxColId >= 8 ? 0 : gridBoxColId + 1;

        if (gridBoxId <= 8) {
          return resolveDayLegendDiv(gridBoxId);
        }

        if (gridBoxColId !== 0) {
          let isTaskDone = doneTasksOn.indexOf(item) !== -1;

          if (new Date(item).getTime() < new Date(startDate).getTime()) {
            return (
              <GridBox
                key={gridBoxId}
                id={gridBoxId}
                isEmpty={true}
                isPending={true}
              />
            );
          }

          return (
            <GridBox
              key={gridBoxId}
              id={gridBoxId}
              isTaskDone={isTaskDone}
              isPending={
                new Date(item) > new Date() ||
                item === formatDateObj(new Date())
              }
              toolTipCaption={getToolTipCaption(item)}
            />
          );
        } else {
          gridBoxColId++;
          gridBoxRowId++;

          if (gridBoxRowId % 4 === 0 || gridBoxRowId < 2) {
            return (
              <GridBox
                key={gridBoxId}
                id={gridBoxId}
                isEmpty={true}
                isPending={true}
                caption={resolveMonthNumeralToSpell(
                  new Date(item).getMonth() + 1
                )}
              />
            );
          } else {
            return (
              <GridBox
                key={gridBoxId}
                id={gridBoxId}
                isEmpty={true}
                isPending={true}
              />
            );
          }
        }
      })}
    </div>
  );
};

const getToolTipCaption = (strDate) => {
  const d = new Date(strDate);

  const year = d.getFullYear();
  const mon = resolveMonthNumeralToSpell(d.getMonth() + 1);
  let date = String(d.getDate());
  date = date.length <= 1 ? "0" + date : date;

  const fullDate = date + "-" + mon + "-" + year;

  return fullDate;
};

const resolveDayLegendDiv = (cellNo) => {
  return (
    <div key={cellNo} className="grid-box-empty fixed">
      <small>{resolveDayNumberToDayName(cellNo)}</small>
    </div>
  );
};

export default Grid;
