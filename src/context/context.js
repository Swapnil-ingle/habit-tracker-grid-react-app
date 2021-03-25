import { useContext, useReducer, useState } from "react";
import React from "react";
import { reducer } from "./reducer";
import { getFromLocalStorage } from "../utils/localStorage";
import { useAuthContext } from "./AuthContext";
import { database } from "../firebase";

const initialState = {
  habits: undefined,
  isUsersFirstTime: getFromLocalStorage("habits")
    ? getFromLocalStorage("habits").isUsersFirstTime
    : true,
};

// Create a context
const AppContext = React.createContext(initialState);

// Wrap a AppProvider
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { currentUser } = useAuthContext();
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    setLoading(true);

    if (currentUser && currentUser.uid) {
      database.habits
        .where("userId", "==", currentUser.uid)
        .get()
        .then((snapshot) => {
          const habits = [];

          snapshot.forEach((doc) => {
            habits.push(doc.data().habit);
          });

          dispatch({ type: "SET_HABITS", payload: habits });
        })
        .catch((error) => {
          console.log("Error while fetching from Firebase: ", error);
        })
        .finally(() => {
          setLoading(false);
        });

      return;
    }

    dispatch({
      type: "SET_HABITS",
      payload: getFromLocalStorage("habits")
        ? getFromLocalStorage("habits").habits
        : [],
    });
    setLoading(false);
  }, [currentUser]);

  const toggleToday = React.useCallback(
    (id) => {
      dispatch({ type: "TOGGLE_TODAY", payload: { id, currentUser } });
    },
    [currentUser]
  );

  const addNewHabit = (habit) => {
    dispatch({ type: "ADD_NEW_HABIT", payload: { habit, currentUser } });
  };

  const deleteHabit = (id) => {
    dispatch({ type: "DELETE_HABIT", payload: { id, currentUser } });
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
        loading,
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
