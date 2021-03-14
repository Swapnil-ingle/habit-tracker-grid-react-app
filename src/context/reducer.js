import { formatDateObj } from "../utils/utils";
import { saveToLocalStorage } from "../utils/localStorage";

export const reducer = (state, action) => {
  let newHabits;
  switch (action.type) {
    case "TOGGLE_TODAY":
      // const habits = state.habits.filter((item) => item.id === action.payload);
      // const currDateFormatted = formatDateObj(new Date());
      // const todaysDateIdx = habits[0].doneTasksOn.indexOf(currDateFormatted);
      // let newDoneTasksOn = habits[0].doneTasksOn;

      newHabits = state.habits.map((habit) => {
        if (habit.id === action.payload) {
          const newDoneTasksOn = habit.doneTasksOn;
          const todaysDateIdx = habit.doneTasksOn.indexOf(
            formatDateObj(new Date())
          );

          if (todaysDateIdx !== -1) {
            newDoneTasksOn.splice(todaysDateIdx, 1);
          } else {
            newDoneTasksOn.push(formatDateObj(new Date()));
          }

          return { ...habit, doneTasksOn: newDoneTasksOn };
        } else {
          return habit;
        }
      });

      saveToLocalStorage("habits", { ...state, habits: newHabits });
      return { ...state, habits: newHabits };
    case "ADD_NEW_HABIT":
      const newHabit = action.payload;
      state.habits.push(newHabit);
      saveToLocalStorage("habits", state);
      return { ...state };
    case "DELETE_HABIT":
      newHabits = state.habits.filter((item) => item.id !== action.payload);
      saveToLocalStorage("habits", { ...state, habits: newHabits });
      return { ...state, habits: newHabits };
    case "MARK_AS_VISITED":
      saveToLocalStorage("habits", { ...state, isUsersFirstTime: false });
      return { ...state, isUsersFirstTime: false };
    case "MARK_AS_UNVISITED":
      saveToLocalStorage("habits", { ...state, isUsersFirstTime: true });
      return { ...state, isUsersFirstTime: true };
    default:
      return { ...state };
  }
};
