import React from "react";

import "./Page1.css";

const Page1 = () => {
  return (
    <div className="welcome-page">
      <section>
        <img className="welcome-img" src="calendar.png" alt="Calendar" />
      </section>
      <section>
        <h2>What is Hagrid?</h2>
        <p>
          Hagrid is a habit-tracking app that helps you{" "}
          <strong>build and sustain new habits</strong>.
        </p>
      </section>
    </div>
  );
};

export default Page1;
