import {
  Button,
  InputLabel,
  TextField,
  Typography,
  Box,
  Alert,
} from "@mui/material";
import { useState } from "react";
import { StateContext } from "../context/stateContext";
import { AlertSuccess } from "../components/AlertSuccess";

import { useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { addVehicle } from "../services/vehicleServices";
import { useGlobalState } from "../context/stateContext";

export const AddVehicle = ({ editFormData }) => {
  const { store, dispatch } = useGlobalState();
  const [success, setSuccess] = useState(undefined);
  const navigate = useNavigate();
  const { loggedInUser, errorMessage, successMessage } = store;

  const initialFormData = {
    make: "",
    model: "",
    variant: "",
    plugName: "",
    username: loggedInUser,
  };

  const [formData, setFormData] = useState(initialFormData);

  async function handleSubmit(e) {
    e.preventDefault();

    console.log("THIS IS data sent", formData);
    const response = await addVehicle(formData);

    if (response.status === 500) {
      dispatch({
        type: "setErrorMessage",
        data: response.message,
      });
      return;
    } else {
      // TODO: handle success message
      //   dispatch({
      //     type: "setSuccessMessage",
      //     data: response.message,
      //   });
      setSuccess(response.message);
      navigate(`/`);
    }
  }

  const handleFormData = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleCancel = (e) => {
    navigate("/chargers/mychargers");
  };

  return (
    <StateContext.Provider value={{ store, dispatch }}>
      <AnimatePresence>
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

        {success && <AlertSuccess message={success} setSuccess={setSuccess} />}

        {/* {successMessage && <Alert severity="success">{successMessage}</Alert>} */}

        <motion.div
          className="form-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <form onSubmit={handleSubmit}>
            <Typography variant="h4">Add Vehicle</Typography>

            <InputLabel>Vehicle Make:</InputLabel>
            <TextField
              type="text"
              name="make"
              id="make"
              value={formData.make}
              onChange={handleFormData}
            />

            <InputLabel>Model</InputLabel>
            <TextField
              type="text"
              multiline
              name="model"
              id="model"
              value={formData.model}
              onChange={handleFormData}
            />

            <InputLabel>Variant</InputLabel>
            <TextField
              type="text"
              name="variant"
              id="variant"
              value={formData.variant}
              onChange={handleFormData}
            />

            <InputLabel id="demo-simple-select-label">Plug Name</InputLabel>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                marginBottom: "16px",
              }}
            >
              <select
                name="plugName"
                id="plugName"
                value={formData.plugName}
                onChange={handleFormData}
              >
                <option defaultValue=""></option>
                <option type="text" value="typeOne">
                  Type 2 (Mennekes)
                </option>
                <option type="text" value="typeTwo">
                  Combined Charging System (CCS)
                </option>
                <option type="text" value="typeThree">
                  Charge de Move (CHAdeMO)
                </option>
              </select>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "5px",
              }}
            >
              <Button
                type="submit"
                //   id="status"
                //   value="active"
                variant="contained"
                onClick={handleFormData}
              >
                Add Vehicle
              </Button>

              <Button
                variant="contained"
                sx={{ marginLeft: "16px" }}
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </Box>
          </form>
        </motion.div>
      </AnimatePresence>
    </StateContext.Provider>
  );
};
