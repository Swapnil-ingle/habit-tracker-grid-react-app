import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { useAuthContext } from "../../../context/AuthContext";
import Error from "../../Error/Error";

import "./SignUp.css";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const SignUp = () => {
  const { signup } = useAuthContext();
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState();
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (emailRef.current.value.length <= 0) {
      setError(true);
      setErrorMsg("Email cannot be empty");
      return;
    }

    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      setError(true);
      setErrorMsg("Passwords do not match");
      return;
    }

    setLoading(true);
    signup(emailRef.current.value, passwordRef.current.value)
      .then(function (result) {
        setError(false);
        setLoading(false);
        setErrorMsg("");
        history.push("/login");
        toast.success("Sign up successful!", {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      })
      .catch(function (error) {
        setError(true);
        setErrorMsg("ERROR: " + error.message);
        setLoading(false);
      });
  };

  return (
    <main>
      <div className="sign-up-container">
        <form>
          {error && <Error severity="error" msg={errorMsg} />}
          <div className="form-control">
            <label htmlFor="email">Email</label>
            <input ref={emailRef} type="email" name="email" id="email" />
          </div>
          <div className="form-control">
            <label htmlFor="password">Password</label>
            <input
              ref={passwordRef}
              type="password"
              name="password"
              id="password"
            />
          </div>
          <div className="form-control">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              ref={confirmPasswordRef}
              type="password"
              name="confirmPassword"
              id="confirmPassword"
            />
          </div>
          <div className="form-control">
            <button onClick={handleSubmit} type="submit" disabled={loading}>
              Sign Up
            </button>
          </div>
          <div className="form-control">
            Already have an account? <Link to="/logIn">Log In</Link>
          </div>
        </form>
      </div>
    </main>
  );
};

export default SignUp;
