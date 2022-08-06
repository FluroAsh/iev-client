import React, { useState } from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";

import { capitalize } from "../utils/helpers";

export const AlertError = ({ message, setError, styles }) => {
  const [open, setOpen] = useState(true);

  // Set a 10s second timeout for AlertError
  setTimeout(() => {
    setError(false);
    setOpen(false);
  }, 10000);

  return (
    <Box className="alert-error" style={styles && styles.errorAlert}>
      <Collapse in={open}>
        <Alert
          style={styles && styles.errorAlert.borderRadius}
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
