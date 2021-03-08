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
            if (!scroll(habitCardsContainerRef, -255)) {
              setisFirstCard(true);
            }
            setisLastCard(false);
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
            console.log(habitCardsContainerRef.current.scrollLeft);
            if (!scroll(habitCardsContainerRef, 255)) {
              setisLastCard(true);
            }
            setisFirstCard(false);
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
  var beforeScrolling = habitCardsContainerRef.current.scrollLeft;
  console.log("Before scrolling: " + habitCardsContainerRef.current.scrollLeft);
  habitCardsContainerRef.current.scrollLeft += scrollOffset;
  console.log("After scrolling: " + habitCardsContainerRef.current.scrollLeft);

  console.log(beforeScrolling, habitCardsContainerRef.current.scrollLeft);

  if (habitCardsContainerRef.current.scrollLeft === beforeScrolling) {
    console.log("Returning False");
    // return false;
    return true;
  }

  return true;
};

export default App;
