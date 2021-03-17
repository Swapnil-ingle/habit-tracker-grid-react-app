import React from "react";
import { Alert } from "@material-ui/lab";

const Error = ({ severity, msg }) => {
  return (
    <Alert severity={severity}>
      <strong>{msg}</strong>
    </Alert>
  );
};

export const Info = ({ msg }) => {
  return <Error severity="info" msg={msg} />;
};

export const Success = ({ msg }) => {
  return <Error severity="success" msg={msg} />;
};

export default Error;
