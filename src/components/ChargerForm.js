import {
  Button,
  InputLabel,
  TextField,
  Typography,
  // Select,
  // MenuItem,
  // FormControl,
  Container,
  Box,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addCharger, updateCharger } from "../services/chargerServices";
import { useGlobalState } from "../context/stateContext";

// import { reducer } from "../utils/reducer"

export const ChargerForm = ({ editFormData }) => {
  const { store, dispatch } = useGlobalState();
  const navigate = useNavigate();
  const { loggedInUser, errorMessage, successMessage } = store;

  console.log("THIS IS STORE", store);

  const initialFormData = {
    name: editFormData.name || "",
    instructions: editFormData.instructions || "",
    price: editFormData.price || "",

    // TODO: handle status(handle submit)
    status: editFormData.status || "",
    plugName: editFormData.plugName || "",
    // TODO: need to handle if user not logged in
    // if not logged in, they shouldnt see the form but need to handle
    // incase they use direct link
    username: loggedInUser,
  };
  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();

    // try {
    // if (e.target.value) {
    //   formData.status = e.target.value;
    // }

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
      setFormData({});
      dispatch({
        type: "setSuccessMessage",
        data: response.data.message,
      });
      // TODO: handle success message
      navigate(`/charger/${response.data.id}`);
    }

    console.log("charger after created", response);

    // navigate(`/charger/${result.}`);

    // if (!result.error) {
    // } else {
    //     setError(result.error);

    // }
    // } catch (err) {
    //   // TODO: handle error
    //   console.error(err.message);
    // }
  }

  const handleFile = (file) => {
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
    <Container
      sx={{
        display: "inline-flex",
        justifyContent: "space-around",
        alignItems: "center",
        flexWrap: "wrap",
        margin: "16px",
      }}
    >
      {errorMessage && <p>{errorMessage}</p>}

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
        <Box sx={{ marginBottom: "16px" }}>
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
          name="image"
          accept="image/*"
          type="file"
          onChange={(e) => handleFile(e.target.files[0])}
        />
        <Box sx={{ marginTop: "16px", marginRight: "16px" }}>
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

      {/* TODO: for updating, handle 'disabled' status */}
    </Container>
  );
};
