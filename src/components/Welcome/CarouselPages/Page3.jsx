import React from "react";

const Page3 = () => {
  return (
    <div className="welcome-page">
      <section>
        <h2>It's deceptively powerful</h2>
        <h4>Daily habit-tracking does three things:</h4>
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
          You can read the full article by James Clear (Author: Atomic Habits){" "}
          <a
            target="_blank"
            rel="noreferrer"
            href="https://jamesclear.com/habit-tracker"
          >
            here.
          </a>
        </small>
      </section>
    </div>
  );
};

export default Page3;
