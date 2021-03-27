import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";

import { useAuthContext } from "../../../context/AuthContext";
import Error from "../../Error/Error";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const ForgotPassword = () => {
  const { resetPassword } = useAuthContext();
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState();
  const [loading, setLoading] = useState(false);

  const emailRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);

    if (emailRef.current.value.length <= 0) {
      setError(true);
      setErrorMsg("Email cannot be empty");
      return;
    }

    setLoading(true);
    resetPassword(emailRef.current.value)
      .then(function (result) {
        setLoading(false);
        setErrorMsg("");
        toast.success("Reset password link has been sent to your email!", {
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
          <h1 className="text-center">Password Reset</h1>
          {error && <Error severity="error" msg={errorMsg} />}
          <div className="form-control">
            <label htmlFor="email">Email</label>
            <input ref={emailRef} type="email" name="email" id="email" />
          </div>
          <div className="form-control">
            <button onClick={handleSubmit} type="submit" disabled={loading}>
              Reset Password
            </button>
          </div>
          <div className="form-control text-center">
            <Link to="login">Log In</Link>
          </div>
          <div className="form-control text-center">
            <small>
              Need an account? {"  "}
              <Link to="/signUp">Sign Up</Link>
            </small>
          </div>
        </form>
      </div>
    </main>
  );
};

export default ForgotPassword;
