import React from "react";
import { Alert } from "@material-ui/lab";

const Error = ({ severity, msg }) => {
  return (
    <Alert severity={severity}>
      <strong>{msg}</strong>
    </Alert>
  );
};

export default Error;
