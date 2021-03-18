import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { useAuthContext } from "../../context/AuthContext";
import Error from "../Error/Error";

import "./Login.css";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

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
        setErrorMsg("");
        history.push("/");
      })
      .catch(function (error) {
        setError(true);
        setErrorMsg("ERROR: " + error.message);
      })
      .finally(function () {
        setLoading(false);
      });
  };

  const handleLogout = async (e) => {
    e.preventDefault();

    setError(false);
    setErrorMsg("");
    logout()
      .then(function Result(r) {
        history.push("/login");
        toast.success("Logged out!", {
          position: toast.POSITION.BOTTOM_CENTER,
        });
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

const Logout = ({ handleLogout, loading, currentUser }) => {
  return (
    <div className="sign-up-container">
      <form>
        <div className="form-control">
          <h3>Hello '{currentUser.email}'</h3>
        </div>
        <EditProfile />
        <div className="form-control">
          <button onClick={handleLogout} type="submit" disabled={loading}>
            Log Out
          </button>
        </div>
      </form>
    </div>
  );
};

const EditProfile = () => {
  return (
    <div className="form-control text-center">
      <Link to="/update-profile">Update Profile</Link>
    </div>
  );
};

export default Login;
