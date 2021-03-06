import { formatDateObj } from "../utils/utils";
import { saveToLocalStorage } from "../utils/localStorage";

export const reducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_TODAY":
      const habits = state.habits.filter((item) => item.id === action.payload);
      const currDateFormatted = formatDateObj(new Date());
      const todaysDateIdx = habits[0].doneTasksOn.indexOf(currDateFormatted);
      let newDoneTasksOn = habits[0].doneTasksOn;

      if (todaysDateIdx !== -1) {
        newDoneTasksOn.splice(todaysDateIdx, 1);
      } else {
        newDoneTasksOn.push(currDateFormatted);
      }

      saveToLocalStorage("habits", { ...state });
      return { ...state };
    case "ADD_NEW_HABIT":
      const newHabit = action.payload;
      state.habits.push(newHabit);
      saveToLocalStorage("habits", state);
      return { ...state };
    case "DELETE_HABIT":
      const newHabits = state.habits.filter(
        (item) => item.id !== action.payload
      );
      saveToLocalStorage("habits", { ...state, habits: newHabits });
      return { ...state, habits: newHabits };
    default:
      return { ...state };
  }
};
