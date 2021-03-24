import React from "react";
import { useRef } from "react";

import Card from "../Card/Card";
import FormBtn from "../Form/FormBtn/FormBtn";
import Welcome from "../Welcome/Welcome";
import { useGlobalContext } from "../../context/context";

import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import { formatDateObj } from "../../utils/utils";

import "./Home.css";
import HomeSkeleton from "./Skeleton/HomeSkeleton";

let habitCardsContainerRef = null;
let habitArrLen = 0;

const Home = () => {
  const { habits, isUsersFirstTime, toggleToday, loading } = useGlobalContext();
  habitCardsContainerRef = useRef(null);

  if (isUsersFirstTime) {
    return <Welcome />;
  }

  if (loading || habits === undefined) {
    return <HomeSkeleton />;
  }

  habitArrLen += habits.length;

  if (habits.length <= 0 && !isUsersFirstTime) {
    return (
      <main>
        <div className="no-habits-msg-container">
          <img src="no-habits-found.png" alt="no-habits-found" />
          <section>
            <p>No habits tracked yet.</p>
            <p>
              Click <strong>'+'</strong> button to start tracking.
            </p>
          </section>
        </div>
        <div className="add-new-card-container">
          <FormBtn />
        </div>
      </main>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="cards-status-dots-container">
        {habits.map((habit) => {
          const doneToday =
            habit.doneTasksOn.indexOf(formatDateObj(new Date())) !== -1;
          return (
            <FiberManualRecordIcon
              key={habit.id}
              className={`${
                doneToday ? "card-status-dot-done" : "card-status-dot-not-done"
              }`}
            />
          );
        })}
      </div>
      <main>
        <button
          id="scroll-left-btn"
          onClick={() => scroll(habitCardsContainerRef, -255)}
        >
          <ArrowLeftIcon />
        </button>
        <div ref={habitCardsContainerRef} className="habit-cards-container">
          {habits.map((habit) => {
            return (
              <Card markHabitDone={toggleToday} key={habit.id} {...habit} />
            );
          })}
        </div>
        <button
          id="scroll-right-btn"
          onClick={() => scroll(habitCardsContainerRef, 255)}
        >
          <ArrowRightIcon />
        </button>
        <div className="add-new-card-container">
          <FormBtn />
        </div>
      </main>
    </div>
  );
};

const scroll = (habitCardsContainerRef, scrollOffset) => {
  habitCardsContainerRef.current.scrollLeft += scrollOffset;
  return habitCardsContainerRef.current.scrollLeft;
};

export const scrollToEnd = () => {
  setTimeout(() => {
    scroll(habitCardsContainerRef, habitArrLen * 255);
  }, 1000);
};

export default Home;
