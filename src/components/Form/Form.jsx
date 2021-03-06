import React, { useState, useEffect } from "react";
import "./Form.css";
import { useGlobalContext } from "../../context/context";
import { formatDateObj } from "../../utils/utils";
import Error from "../Error/Error";

const initialState = {
  id: "",
  name: undefined,
  description: "",
  startDate: formatDateObj(new Date()),
  doneTasksOn: [],
};

const Form = ({ handleClose }) => {
  const { addNewHabit } = useGlobalContext();
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [disableSubmitBtn, setDisableSubmitBtn] = useState(false);

  useEffect(() => {
    if (
      new Date(formData.startDate).getFullYear() !== new Date().getFullYear()
    ) {
      setError(true);
      setErrorMsg("Start date should be of the current year.");
      return;
    }

    if (new Date(formData.startDate) > new Date()) {
      setError(true);
      setErrorMsg("Start date should be current date or a past date.");
      return;
    }

    if (formData.name === undefined) {
      setDisableSubmitBtn(true);
      return;
    }

    if (formData.name !== undefined && formData.name.length <= 0) {
      setError(true);
      setErrorMsg("Name cannot be empty.");
      return;
    }

    setError(false);
    setDisableSubmitBtn(false);
    setErrorMsg("");
  }, [formData.startDate, formData.name]);

  const submitNewHabit = (e) => {
    e.preventDefault();

    if (error || disableSubmitBtn) {
      return;
    }

    addNewHabit({ ...formData, id: new Date().getTime().toString() });
    handleClose();
  };

  return (
    <form>
      <h2>Track a new habit</h2>
      {error && <Error severity="error" msg={errorMsg} />}
      <div className="form-control">
        <label htmlFor="habitName">Name</label>
        <input
          value={formData.name}
          onBlur={(e) => setFormData({ ...formData, name: e.target.value })}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          type="text"
          name="habitName"
          id="habitName"
          placeholder="Workout"
        />
      </div>
      <div className="form-control">
        <label htmlFor="startDate">Start Date</label>
        <input
          type="date"
          name="startDate"
          id="startDate"
          value={formData.startDate}
          onChange={(e) =>
            setFormData({
              ...formData,
              startDate: e.target.value,
            })
          }
        />
      </div>
      <div className="form-control">
        <label htmlFor="desc">Describe your habit</label>
        <textarea
          placeholder="Do atleast 30 mins of exercise daily..."
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          name="desc"
          id="desc"
        />
      </div>
      <div className="submit-form-btn-div">
        <button
          id={`${(error || disableSubmitBtn) && "disabled-btn"}`}
          type="submit"
          onClick={(e) => submitNewHabit(e)}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default Form;
