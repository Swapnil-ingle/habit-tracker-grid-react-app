import { useContext, useReducer } from "react";
import React from "react";
import { reducer } from "./reducer";
import { getFromLocalStorage } from "../utils/localStorage";

const initialState = {
  habits: getFromLocalStorage("habits")
    ? getFromLocalStorage("habits").habits
    : [],
  isUsersFirstTime: getFromLocalStorage("habits")
    ? getFromLocalStorage("habits").isUsersFirstTime
    : true,
};

// Create a context
const AppContext = React.createContext(initialState);

// Wrap a AppProvider
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const toggleToday = (id) => {
    dispatch({ type: "TOGGLE_TODAY", payload: id });
  };

  const addNewHabit = (habit) => {
    dispatch({ type: "ADD_NEW_HABIT", payload: habit });
  };

  const deleteHabit = (id) => {
    dispatch({ type: "DELETE_HABIT", payload: id });
  };

  const markAsVisited = () => {
    dispatch({ type: "MARK_AS_VISITED" });
  };

  const markAsUnvisited = () => {
    dispatch({ type: "MARK_AS_UNVISITED" });
  };

  return (
    <AppContext.Provider
      value={{
        habits: state.habits,
        isUsersFirstTime: state.isUsersFirstTime,
        toggleToday,
        addNewHabit,
        deleteHabit,
        markAsVisited,
        markAsUnvisited,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom Hook
const useGlobalContext = () => {
  return useContext(AppContext);
};

export { useGlobalContext, AppProvider };
