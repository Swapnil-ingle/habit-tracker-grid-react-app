import React from "react";
import { Alert } from "@material-ui/lab";

const Error = ({ severity, msg }) => {
  return <Alert severity={severity}>{msg}</Alert>;
};

export default Error;
