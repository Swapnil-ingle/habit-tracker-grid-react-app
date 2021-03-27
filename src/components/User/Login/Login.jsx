import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { useAuthContext } from "../../../context/AuthContext";
import Error from "../../Error/Error";

import "./Login.css";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from "../Profile/Profile";

toast.configure();

const Login = () => {
  const { login, currentUser } = useAuthContext();
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState();
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (emailRef.current.value.length <= 0) {
      setError(true);
      setErrorMsg("Email cannot be empty");
      return;
    }

    if (passwordRef.current.value.length <= 0) {
      setError(true);
      setErrorMsg("Password should not be empty");
      return;
    }

    setLoading(true);
    login(emailRef.current.value, passwordRef.current.value)
      .then(function (result) {
        setError(false);
        setErrorMsg("");
        history.push("/");
        toast.dark("Fetching Habits data from your user account!", {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      })
      .catch(function (error) {
        setError(true);
        setErrorMsg("ERROR: " + error.message);
      })
      .finally(function () {
        setLoading(false);
      });
  };

  return (
    <main>
      {currentUser && <Profile />}

      {!currentUser && (
        <>
          <img className="sign-in-img" src="sign-in.svg" alt="sign-in" />
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
                <button onClick={handleSubmit} type="submit" disabled={loading}>
                  Log In
                </button>
              </div>
              <div className="form-control text-center">
                <Link to="forgot-password">Forgot Password?</Link>
              </div>
              <div className="form-control text-center">
                <small>
                  Need an account? {"  "}
                  <Link to="/signUp">Sign Up</Link>
                </small>
              </div>
            </form>
          </div>
        </>
      )}
    </main>
  );
};

export default Login;
