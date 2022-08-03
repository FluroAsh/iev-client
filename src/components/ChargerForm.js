import {
  Button,
  InputLabel,
  TextField,
  Typography,
  Container,
  Box,
  Alert,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";

import { addCharger, updateCharger } from "../services/chargerServices";
import { useGlobalState } from "../context/stateContext";

export const ChargerForm = ({ editFormData }) => {
  const { store, dispatch } = useGlobalState();
  const navigate = useNavigate();
  const { loggedInUser, errorMessage } = store;

  console.log("THIS IS STORE", store);

  useEffect(
    () => () =>
      dispatch({
        type: "setErrorMessage",
        data: "",
      }),
    [dispatch]
  );

  let initialFormData;

  if (editFormData) {
    initialFormData = {
      name: editFormData.name,
      instructions: editFormData.instructions,
      price: editFormData.price,

      // TODO: handle status(handle submit)
      status: editFormData.status,
      plugName: editFormData.plugName,
      // TODO: need to handle if user not logged in
      // if not logged in, they shouldnt see the form but need to handle
      // incase they use direct link
      username: loggedInUser,
    };
  } else {
    initialFormData = {
      name: "",
      instructions: "",
      price: "",

      // TODO: handle status(handle submit)
      status: "",
      plugName: "",
      // TODO: need to handle if user not logged in
      // if not logged in, they shouldnt see the form but need to handle
      // incase they use direct link
      username: loggedInUser,
    };
  }

  const [formData, setFormData] = useState(initialFormData);

  console.log("THIS IS EDIT FORM DATA", editFormData);

  async function handleSubmit(e) {
    e.preventDefault();

    const data = new FormData();

    for (const [key, value] of Object.entries(formData)) {
      data.append(key, value);
    }

    let response;
    if (editFormData) {
      response = await updateCharger(data, editFormData.id);
    } else {
      response = await addCharger(data);
    }

    if (response.status === 500) {
      dispatch({
        type: "setErrorMessage",
        data: response.data.message,
      });
      return;
    } else {
      // TODO: handle success message
      navigate(`/chargers/mychargers`);
    }
  }

  const handleFile = (file) => {
    console.log("THIS IS FILE DETAIL", file);
    setFormData({
      ...formData,
      image: file,
    });
  };

  const handleFormData = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleCancel = (e) => {
    navigate("/chargers/mychargers");
  };

  console.log("FORM DATA ---", formData);

  return (
    <AnimatePresence>
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

      <motion.div
        className="form-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <form onSubmit={handleSubmit}>
          <Typography variant="h4">List Charger</Typography>

          <InputLabel>Charger Name:</InputLabel>
          <TextField
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleFormData}
          />

          <InputLabel>Instructions:</InputLabel>
          <TextField
            type="text"
            multiline
            rows={4}
            name="instructions"
            id="instructions"
            value={formData.instructions}
            onChange={handleFormData}
          />

          <InputLabel>Price:</InputLabel>
          <TextField
            type="number"
            name="price"
            id="price"
            value={formData.price}
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

          <input
            style={{ display: "flex", justifyContent: "center" }}
            name="image"
            accept="image/*"
            type="file"
            onChange={(e) => handleFile(e.target.files[0])}
          />

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "5px",
            }}
          >
            <Button
              sx={{ marginRight: "16px" }}
              type="submit"
              id="status"
              value="pending"
              variant="contained"
              onClick={handleFormData}
            >
              Save draft
            </Button>
            {editFormData ? (
              <Button
                type="submit"
                id="status"
                value="active"
                variant="contained"
                onClick={handleFormData}
              >
                Update charger
              </Button>
            ) : (
              <Button
                type="submit"
                id="status"
                value="active"
                variant="contained"
                onClick={handleFormData}
              >
                List charger
              </Button>
            )}
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

      {/* TODO: for updating, handle 'disabled' status */}
    </AnimatePresence>
  );
};
