import React, { useState } from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import { capitalize } from "../utils/helpers";

export const AlertError = ({ message, setError }) => {
  const [open, setOpen] = useState(true);

  setTimeout(() => {
    setError(false);
    setOpen(false);
  }, 10000);

  return (
    <Box>
      <Collapse in={open}>
        <Alert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setError(false);
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {capitalize(message)}
        </Alert>
      </Collapse>
    </Box>
  );
};
