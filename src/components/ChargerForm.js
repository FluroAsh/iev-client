import {
  Button,
  InputLabel,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addCharger } from "../services/chargerServices";
import { useGlobalState } from "../context/stateContext";

// import { reducer } from "../utils/reducer"

export const ChargerForm = () => {
  const { store, dispatch } = useGlobalState();
  const navigate = useNavigate();
  const { loggedInUser } = store;

  console.log("THIS IS STORE", store);

  const initialFormData = {
    name: "",
    instructions: "",
    price: "",

    // TODO: handle status(handle submit)
    status: "pending",
    plugName: "",
    // TODO: need to handle if user not logged in
    // if not logged in, they shouldnt see the form but need to handle
    // incase they use direct link
    username: loggedInUser,
  };
  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if (e.target.value) {
        formData.status = e.target.value;
      }

      const data = new FormData();

      for (const [key, value] of Object.entries(formData)) {
        data.append(key, value);
      }

      const result = await addCharger(data);
      console.log("FORM DATA AFTER SUBMIT", data);

      setFormData(initialFormData);

      navigate("/");

      // if (!result.error) {
      // } else {
      //     setError(result.error);

      // }
    } catch (err) {
      // TODO: handle error
      console.error(err.message);
    }
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

  console.log("FORM DATA ---", formData);

  return (
    <>
      {error && <p>{error}</p>}
      <Typography variant="h4">List Charger</Typography>

      <form onSubmit={handleSubmit}>
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
        <div>
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
        </div>
        <Button>
          <input
            name="image"
            accept="image/*"
            type="file"
            onChange={(e) => handleFile(e.target.files[0])}
          />
        </Button>
        <div>
          
          <Button type="submit" variant="contained">
            Save as draft
          </Button>
          <Button type="submit" value="active" variant="contained">
            List charger
          </Button>
        </div>
      </form>
      {/* TODO: for updating, handle 'disabled' status */}
    </>
  );
};

