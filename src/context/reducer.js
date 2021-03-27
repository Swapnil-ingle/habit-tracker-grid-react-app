import { formatDateObj } from "../utils/utils";
import { saveToLocalStorage } from "../utils/localStorage";
import { database } from "../firebase";

export const reducer = (state, action) => {
  let newHabits;
  let currUser;

  switch (action.type) {
    case "TOGGLE_TODAY":
      const currDateFormatted = formatDateObj(new Date());
      newHabits = [...state.habits];
      currUser = action.payload.currentUser;

      let habitIdx = undefined;

      for (let i = 0; i < newHabits.length; i++) {
        if (newHabits[i].id === action.payload.id) {
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

      if (currUser) {
        updateHabitInFirebase(action.payload.id, habit.doneTasksOn);
      } else {
        saveToLocalStorage("habits", { ...state, habits: newHabits });
      }

      return { ...state, habits: newHabits };
    case "ADD_NEW_HABIT":
      const newHabit = action.payload.habit;
      currUser = action.payload.currentUser;
      state.habits.push(newHabit);
      if (currUser) {
        saveToFirebaseIfUserLoggedIn(newHabit, currUser);
      } else {
        saveToLocalStorage("habits", state);
      }

      return { ...state };
    case "DELETE_HABIT":
      newHabits = state.habits.filter((item) => item.id !== action.payload.id);
      currUser = action.payload.currentUser;

      if (currUser) {
        deleteHabitInFirebase(action.payload.id);
      } else {
        saveToLocalStorage("habits", { ...state, habits: newHabits });
      }

      return { ...state, habits: newHabits };
    case "MARK_AS_VISITED":
      saveToLocalStorage("habits", { ...state, isUsersFirstTime: false });
      return { ...state, isUsersFirstTime: false };
    case "MARK_AS_UNVISITED":
      saveToLocalStorage("habits", { ...state, isUsersFirstTime: true });
      return { ...state, isUsersFirstTime: true };
    case "SET_HABITS":
      return { ...state, habits: action.payload };
    default:
      return { ...state };
  }
};

function deleteHabitInFirebase(habitId) {
  database.habits
    .doc(habitId)
    .delete()
    .then(() => {
      console.log("Deleted habit in Firebase");
    })
    .catch((e) => {
      console.log("Error deleting habit in Firebase: ", e);
    });
}

function updateHabitInFirebase(habitId, newDoneTasksOnArr) {
  console.log("Saving update to firebase");

  database.habits
    .doc(habitId)
    .update({
      "habit.doneTasksOn": newDoneTasksOnArr,
    })
    .then(() => {
      console.log("Updated in FireBase");
    })
    .catch((e) => {
      console.log("Error while updating in FireBase", e);
    });
}

function saveToFirebaseIfUserLoggedIn(newHabit, currUser) {
  if (!currUser || !currUser.uid) {
    return;
  }

  database.habits.doc(newHabit.id).set({
    habit: newHabit,
    userId: currUser ? currUser.uid : "None",
  });
}
