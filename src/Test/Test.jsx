import React, { useState, useCallback } from "react";

import "./Test.css";

const initialState = {
  habits: [
    {
      id: "1615649099565",
      name: "Brilliant",
      description: "",
      startDate: "2021-03-13",
      doneTasksOn: ["2021-03-13"],
    },
    {
      id: "1615649107911",
      name: "Workout",
      description: "",
      startDate: "2021-03-13",
      doneTasksOn: ["2021-03-14"],
    },
    {
      id: "1615649401885",
      name: "Book Reading",
      description: "",
      startDate: "2021-03-13",
      doneTasksOn: [],
    },
    {
      id: "1615702630514",
      name: "Brilliant New",
      description: "",
      startDate: "2021-03-14",
      doneTasksOn: ["2021-03-14"],
    },
  ],
  users: [
    { id: 1, name: "Swap", city: "NYC" },
    { id: 2, name: "Nik", city: "NYC" },
    { id: 3, name: "Max", city: "NYC" },
  ],
};

export default function App() {
  //   const [state, setState] = useState(initialState);
  const [users, setUsers] = useState(initialState.users);
  const [habits, setHabits] = useState(initialState.habits);

  function onChange(e, property) {
    const { id, value } = e.target;

    const newUsers = users.map((u) => {
      // if we're looking at the user that was just changed...
      if (u.id == id) {
        return { ...u, name: value }; // Then return an updated user
      } else {
        return u; // otherwise, return the untouched user
      }
    });

    // let matchedUser = users.filter((user) => user.id === id);
    // matchedUser.name = value;

    setUsers(newUsers);
  }

  console.log("New Habits", habits);

  const markHabitDone = useCallback(
    (id, name) => {
      // alert("Marking habit done for id: " + id + " name: " + name);

      // const newHabits = habits.map((habit) => {
      //   if (habit.id === id) {
      //     const newDoneTasksOn = habit.doneTasksOn;
      //     const todaysDateIdx = habit.doneTasksOn.indexOf(
      //       formatDateObj(new Date())
      //     );

      //     if (todaysDateIdx !== -1) {
      //       newDoneTasksOn.splice(todaysDateIdx, 1);
      //     } else {
      //       newDoneTasksOn.push(formatDateObj(new Date()));
      //     }

      //     return { ...habit, doneTasksOn: newDoneTasksOn };
      //   } else {
      //     return habit;
      //   }
      // });

      // New method
      setHabits((prevHabits) => {
        var newHabits = [...prevHabits];

        console.log("New Habits", newHabits);

        let habitIdx = undefined;

        for (let i = 0; i < newHabits.length; i++) {
          if (newHabits[i].id === id) {
            habitIdx = i;
            break;
          }
        }

        console.log("Habit index is: " + habitIdx);

        var habit = { ...habits[habitIdx] };
        habit.doneTasksOn = [];

        console.log(newHabits);

        newHabits[habitIdx] = habit;

        console.log(newHabits);

        return newHabits;
      });
    },
    [habits]
  );

  //   const markHabitDone = (id, name) => {
  //     // alert("Marking habit done for id: " + id + " name: " + name);

  //     // const newHabits = habits.map((habit) => {
  //     //   if (habit.id === id) {
  //     //     const newDoneTasksOn = habit.doneTasksOn;
  //     //     const todaysDateIdx = habit.doneTasksOn.indexOf(
  //     //       formatDateObj(new Date())
  //     //     );

  //     //     if (todaysDateIdx !== -1) {
  //     //       newDoneTasksOn.splice(todaysDateIdx, 1);
  //     //     } else {
  //     //       newDoneTasksOn.push(formatDateObj(new Date()));
  //     //     }

  //     //     return { ...habit, doneTasksOn: newDoneTasksOn };
  //     //   } else {
  //     //     return habit;
  //     //   }
  //     // });

  //     // New method
  //     var newHabits = [...habits];

  //     console.log("New Habits", newHabits);

  //     let habitIdx = undefined;

  //     for (let i = 0; i < newHabits.length; i++) {
  //       if (newHabits[i].id === id) {
  //         habitIdx = i;
  //         break;
  //       }
  //     }

  //     console.log("Habit index is: " + habitIdx);

  //     var habit = { ...habits[habitIdx] };
  //     habit.doneTasksOn = [];
  //     habit.name = "Edited";

  //     console.log(newHabits);

  //     newHabits[habitIdx] = habit;

  //     console.log(newHabits);

  //     setHabits(newHabits);
  //   };

  return (
    <div className="App">
      <ol>
        <li>Open the console</li>
        <li>Edit one of the inputs below.</li>
        <li>
          React.Memo checks if the props passed in areEqual to the previous
          call. So only the changed User component re-renders. 😎
        </li>
      </ol>
      {/* {users.map((u) => (
        <MemoizedUser key={u.id} {...u} onChange={onChange} />
      ))} */}
      <section className="test-habit-cards-container">
        {habits.map((habit) => {
          return (
            <MemoizedCard
              markHabitDone={markHabitDone}
              key={habit.id}
              {...habit}
            />
          );
        })}
      </section>
    </div>
  );
}

const Card = ({
  id,
  name,
  description,
  startDate,
  doneTasksOn,
  markHabitDone,
}) => {
  console.log(`Rendering ${name}`);
  return (
    <section className="test-card">
      <h2>{name}</h2>
      <small>{description}</small>
      <h3>{startDate}</h3>
      <small>{doneTasksOn}</small>
      <div>
        <button onClick={() => markHabitDone(id, name)}>Mark Done</button>
      </div>
    </section>
  );
};

const User = ({ id, name, onChange }) => {
  console.log(`Rendering ${name}`);
  return (
    <input
      type="text"
      value={name}
      id={id}
      onChange={(e) => onChange(e, "name")}
    />
  );
};

// https://reactjs.org/docs/react-api.html#reactmemo
function areEqual(prevProps, nextProps) {
  // Only re-render if the user's properties changed.
  // We don't care if a new onChange is passed
  // This can be done with a shallow object comparison function if you prefer: https://stackoverflow.com/a/22266891/26180

  console.log(" Previous: " + prevProps.name);
  console.log(" Next: " + nextProps.name);

  return prevProps.id === nextProps.id && prevProps.name === nextProps.name;
}

const areCardEqual = (prevProps, nextProps) => {
  const matched =
    prevProps.id === nextProps.id &&
    prevProps.doneTasksOn === nextProps.doneTasksOn;

  //   console.log(prevProps.name + " Previous: " + prevProps.doneTasksOn);
  //   console.log(prevProps.name + " Next: " + nextProps.doneTasksOn);

  if (matched) {
    // console.log("It is a match for: " + prevProps.name);
  } else {
    // console.log("It is NOT amatch for: " + prevProps.name);
  }

  return matched;
};

const MemoizedUser = React.memo(User, areEqual);

const MemoizedCard = React.memo(Card, areCardEqual);
