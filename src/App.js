import "./App.css";
import { useRef } from "react";
import Card from "./components/Card/Card";
import { useGlobalContext } from "./context/context";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import FormBtn from "./components/Form/FormBtn/FormBtn";
import Welcome from "./components/Welcome/Welcome";
import Error from "./components/Error/Error";

function App() {
  const { habits, isUsersFirstTime } = useGlobalContext();
  const habitCardsContainerRef = useRef(null);

  if (habits.length <= 0 && isUsersFirstTime) {
    return <Welcome />;
  }

  if (habits.length <= 0 && !isUsersFirstTime) {
    return (
      <main>
        <Error
          severity="warning"
          msg="No habits tracked yet - Click '+' button to start tracking."
        />
        <div className="add-new-card-container">
          <FormBtn />
        </div>
      </main>
    );
  }

  return (
    <div className="dashboard-container">
      <main>
        <button
          id="scroll-left-btn"
          onClick={() => scroll(habitCardsContainerRef, -255)}
        >
          <ArrowLeftIcon />
        </button>
        <div ref={habitCardsContainerRef} className="habit-cards-container">
          {habits.map((habit) => {
            return <Card key={habit.id} {...habit} />;
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
}

const scroll = (habitCardsContainerRef, scrollOffset) => {
  habitCardsContainerRef.current.scrollLeft += scrollOffset;
  return habitCardsContainerRef.current.scrollLeft;
};

export default App;
