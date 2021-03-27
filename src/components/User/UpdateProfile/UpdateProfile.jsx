import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { useAuthContext } from "../../../context/AuthContext";
import Error from "../../Error/Error";

const UpdateProfile = () => {
  const { currentUser, updateEmail, updatePassword } = useAuthContext();
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState();
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);
    setErrorMsg("");
    setError(false);

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

    const promises = [];

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value));
    }

    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        history.push("/");
      })
      .catch((error) => {
        setError(true);
        setErrorMsg("ERROR: " + error.message);
      })
      .finally(() => {
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
            <input
              ref={emailRef}
              type="email"
              name="email"
              id="email"
              defaultValue={currentUser.email}
            />
          </div>
          <div className="form-control">
            <label htmlFor="password">Password</label>
            <input
              ref={passwordRef}
              type="password"
              name="password"
              id="password"
              placeholder="Leave blank to keep the same"
            />
          </div>
          <div className="form-control">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              ref={confirmPasswordRef}
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Leave blank to keep the same"
            />
          </div>
          <div className="form-control">
            <button onClick={handleSubmit} type="submit" disabled={loading}>
              Update
            </button>
          </div>
          <div className="form-control text-center">
            <Link to="/">Cancel</Link>
          </div>
        </form>
      </div>
    </main>
  );
};

export default UpdateProfile;
