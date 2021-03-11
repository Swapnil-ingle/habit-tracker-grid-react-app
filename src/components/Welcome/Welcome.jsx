import React from "react";

import Error from "../Error/Error";
import FormBtn from "../Form/FormBtn/FormBtn";

import "./Welcome.css";

const Welcome = () => {
  return (
    <div className="welcome-container">
      <section>
        <h2>What is Hagrid?</h2>
        <p>
          Hagrid is a simple habit-tracking application that helps you build new
          habits
        </p>
      </section>

      <section>
        <h2>Why most people fail to build a new habit?</h2>
        <p>
          <strong>Good</strong> habits show result in long time and there is no
          immediate feedback, unlike a smoker hitting a puff.
        </p>
        <p>
          According to the book <strong>Atomic Habit</strong>, a simple
          calendar-based habit tracker would help you get started and sustain
          that habit for a long time.
        </p>
      </section>

      <section>
        <h2>It's deceptively powerful</h2>
        <p>It does three things:</p>
        <ol>
          <li>
            It creates a <strong>visual cue</strong> that can{" "}
            <strong>remind you to act</strong>.
          </li>
          <li>
            <strong>It is motivating</strong> to see the progress that you are
            making and you will not want to break your streak.
          </li>
          <li>
            <strong>It feels satisfying</strong> to record your sucess in the
            moment.
          </li>
        </ol>
        <small>
          You can read the full article by James Clear (Author - Atomic Habits){" "}
          <a target="_blank" href="https://jamesclear.com/habit-tracker">
            here
          </a>
        </small>
      </section>

      <section>
        <h2>How does it work?</h2>
        <p>
          Everyday, for each habit, you start with an empty box and you have to
          mark it as "Done" till the end of the day.
        </p>
        <p>If you miss it, that day's box will be marked as 'red'.</p>
      </section>

      <section>
        <h2>Get Started!</h2>
      </section>

      <Error
        severity="warning"
        msg="No habits tracked yet - Click '+' button to start tracking."
      />
      <div className="add-new-card-container">
        <FormBtn />
      </div>
    </div>
  );
};

export default Welcome;
