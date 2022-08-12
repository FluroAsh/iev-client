import { useEffect } from "react";
import { useSnackbar } from "notistack";

import { useGlobalState } from "../context/stateContext";

export const Alert = ({ message, variant }) => {
  const { enqueueSnackbar } = useSnackbar();
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

  enqueueSnackbar(message, {
    variant,
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "center",
    },
    autoHideDuration: 5000,
    preventDuplicate: true,
  });
};
