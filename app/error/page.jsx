import * as React from "react";
import Alert from "@mui/material/Alert";
export default function CustomError() {
  return (
    <div className="Error">
      <Alert severity="error">This is an error alert — check it out!</Alert>
    </div>
  );
}
