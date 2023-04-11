import React from "react";
import { Alert } from "@mui/material";
import "./Error.css";

const Error = (props: any) => {
  const handle = () => {
    props.onChange(false);
  };
  return (
    <div className="error-component">
      <Alert variant="outlined" severity="error" onClose={handle}>
        {props.message}
      </Alert>
    </div>
  );
};

export default Error;
