import React, { useState } from "react";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

export const AlertSuccess = ({ message, setError }) => {
  const [open, setOpen] = useState(true);
  setError && setError(false);

  return (
    <Box sx={{ width: "100%" }}>
      <Collapse in={open}>
        <Alert
          severity="success"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {message}
        </Alert>
      </Collapse>
    </Box>
  );
};
