import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { useAuthContext } from "../../context/AuthContext";
import Error from "../Error/Error";

import "./Login.css";

const Login = () => {
  const { login, logout, currentUser } = useAuthContext();
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
        setLoading(false);
        setErrorMsg("");
        history.push("/");
      })
      .catch(function (error) {
        setError(true);
        setErrorMsg("ERROR: " + error.message);
        setLoading(false);
      });
  };

  const handleLogout = async (e) => {
    e.preventDefault();

    setError(false);
    setErrorMsg("");
    logout()
      .then(function Result(r) {
        console.log("Logged out!");
        history.push("/login");
      })
      .catch(function Error(e) {
        setError(true);
        setErrorMsg("ERROR: " + e.message);
      });

    setError(false);
    setErrorMsg("");
  };

  return (
    <main>
      <div className="sign-up-container-floating-warning">
        <Error
          severity="info"
          msg={"Note: This feature is under construction!"}
        />
      </div>

      {currentUser && (
        <Logout
          loading={loading}
          handleLogout={handleLogout}
          currentUser={currentUser}
        />
      )}

      {!currentUser && (
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
            <div className="form-control">
              Create a new account : <Link to="/signUp">Sign Up</Link>
            </div>
          </form>
        </div>
      )}
    </main>
  );
};

const Logout = ({ handleLogout, loading, currentUser }) => {
  return (
    <div className="sign-up-container">
      <form>
        <div className="form-control">
          <h3>Hello '{currentUser.email}'</h3>
        </div>
        <div className="form-control">
          <button onClick={handleLogout} type="submit" disabled={loading}>
            Log Out
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
