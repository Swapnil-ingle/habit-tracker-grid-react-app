import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuthContext } from "../../../context/AuthContext";

import "./Profile.css";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const Profile = () => {
  const { logout, currentUser } = useAuthContext();
  const history = useHistory();

  const handleLogout = async (e) => {
    e.preventDefault();

    logout()
      .then(function Result(r) {
        history.push("/login");
        toast.success("Logged out!", {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      })
      .catch(function Error(e) {
        toast.failure("Logged out!", {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      });
  };

  return (
    <div className="sign-up-container profile-container">
      <form>
        <div className="form-control text-center">
          <img src="user-avatar.png" alt="user-avatar" />
          <h3>{currentUser.email}</h3>
        </div>
        <div className="form-control">
          <EditProfile />
          <button onClick={handleLogout} type="submit">
            Log Out
          </button>
        </div>
      </form>
    </div>
  );
};

const EditProfile = () => {
  return (
    <div className="form-control text-center update-profile-btn">
      <Link to="/update-profile">Update Profile</Link>
    </div>
  );
};

export default Profile;
