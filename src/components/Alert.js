import React, { useEffect } from "react";
import { useSnackbar } from "notistack";

import { useGlobalState } from "../context/stateContext";

export const Alert = ({ message, variant }) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { dispatch } = useGlobalState();

  // clear errorMessage state on render
  useEffect(() => {
    if (variant === "error") {
      dispatch({
        type: "setErrorMessage",
        data: "",
      });
    }

    if (variant === "success") {
      dispatch({
        type: "setSuccessMessage",
        data: "",
      });
    }
  }, [dispatch, variant]);

  const action = (snackbarId) => (
    <button
      style={{
        all: "unset",
        cursor: "pointer",
        color: "#fff",
        marginRight: "5px",
      }}
      onClick={() => {
        closeSnackbar(snackbarId);
      }}
    >
      Dismiss
    </button>
  );

  enqueueSnackbar(message, {
    action,
    variant: variant,
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "center",
    },
    autoHideDuration: 5000,
    // preventDuplicate: true,
  });

  return;
};
