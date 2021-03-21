import { formatDateObj } from "../utils/utils";
import { saveToLocalStorage } from "../utils/localStorage";
import { database } from "../firebase";

export const reducer = (state, action) => {
  let newHabits;

  switch (action.type) {
    case "TOGGLE_TODAY":
      const currDateFormatted = formatDateObj(new Date());
      newHabits = [...state.habits];

      let habitIdx = undefined;

      for (let i = 0; i < newHabits.length; i++) {
        if (newHabits[i].id === action.payload) {
          habitIdx = i;
          break;
        }
      }

      let habit = { ...state.habits[habitIdx] };

      const todaysDateIdx = habit.doneTasksOn.indexOf(currDateFormatted);

      const newDoneTasksOn = [...habit.doneTasksOn];
      if (todaysDateIdx !== -1) {
        newDoneTasksOn.splice(todaysDateIdx, 1);
      } else {
        newDoneTasksOn.push(currDateFormatted);
      }

      habit.doneTasksOn = newDoneTasksOn;
      newHabits[habitIdx] = habit;

      saveToLocalStorage("habits", { ...state, habits: newHabits });
      return { ...state, habits: newHabits };
    case "ADD_NEW_HABIT":
      const newHabit = action.payload.habit;
      const currUser = action.payload.currentUser;
      state.habits.push(newHabit);
      saveToLocalStorage("habits", state);
      saveToFirebase(newHabit, currUser);

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

function saveToFirebase(newHabit, currUser) {
  database.habits.add({
    habit: newHabit,
    userId: currUser ? currUser.uid : "None",
  });
}
