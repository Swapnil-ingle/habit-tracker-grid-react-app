import React from "react";
import { useGlobalContext } from "../../../../context/context";

import "./Page4.css";

const Page4 = () => {
  const { markAsVisited } = useGlobalContext();

  return (
    <div className="welcome-page">
      <section>
        <h2>How does it work?</h2>
        <p>
          You get an array of empty boxes for each remaining day of the year,
          since when you started a habit.
        </p>
        <p>
          Everyday, for each habit, you start with an empty box and you have to
          mark it as <strong style={{ color: "var(--green)" }}> Done</strong>{" "}
          till the end of the day.
        </p>
        <p>
          If you miss it, that day's box will be marked as{" "}
          <strong style={{ color: "firebrick" }}> Red</strong>.
        </p>
      </section>

      <section className="get-started-btn-container">
        <button onClick={markAsVisited}>
          {/* <Link to="/">Get Started!</Link> */}
          Get Started!
        </button>
      </section>
    </div>
  );
};

export default Page4;
