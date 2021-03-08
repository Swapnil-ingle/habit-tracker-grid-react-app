import "./App.css";
import { useRef, useState } from "react";
import Card from "./components/Card/Card";
import { useGlobalContext } from "./context/context";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import Error from "./components/Error/Error";
import FormBtn from "./components/Form/FormBtn/FormBtn";

function App() {
  const { habits } = useGlobalContext();
  const habitCardsContainerRef = useRef(null);

  const [isFirstCard, setisFirstCard] = useState(true);
  const [isLastCard, setisLastCard] = useState(false);

  if (habits.length <= 0) {
    return (
      <main>
        <Error
          severity="warning"
          msg="No habits tracked yet - Click '+' button to start tracking."
        />
      </main>
    );
  }

  return (
    <div className="dashboard-container">
      <main>
        <button
          disabled={isFirstCard}
          id="scroll-left-btn"
          onClick={() => {
            const beforeScroll = scroll(habitCardsContainerRef, -255);

            setTimeout(() => {
              if (beforeScroll === habitCardsContainerRef.current.scrollLeft) {
                // Scroll did not happen
                setisFirstCard(true);
              } else {
                setisLastCard(false);
              }
            }, 500);
          }}
        >
          <ArrowLeftIcon />
        </button>
        <div ref={habitCardsContainerRef} className="habit-cards-container">
          {habits.map((habit) => {
            return <Card key={habit.id} {...habit} />;
          })}
        </div>
        <button
          disabled={isLastCard}
          id="scroll-right-btn"
          onClick={() => {
            const beforeScroll = scroll(habitCardsContainerRef, 255);

            setTimeout(() => {
              if (beforeScroll === habitCardsContainerRef.current.scrollLeft) {
                // Scroll did not happen
                setisLastCard(true);
              } else {
                setisFirstCard(false);
              }
            }, 500);
          }}
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
