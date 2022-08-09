import { Button, InputLabel, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn } from "../services/authServices";
import { useGlobalState } from "../context/stateContext";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";

export const SigninForm = () => {
  const { dispatch } = useGlobalState();
  const navigate = useNavigate();

  const initialFormData = {
    username: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialFormData);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (Object.values(formData).includes("")) {
        throw Error("Fields cannot be empty");
      }

      const response = await signIn(formData);
      sessionStorage.setItem("username", response.username);
      sessionStorage.setItem("token", response.jwt);
      sessionStorage.setItem("firstName", response.firstName);
      sessionStorage.setItem("lastName", response.lastName);

      dispatch({
        type: "setLoggedInUser",
        data: response.username,
      });

      dispatch({
        type: "setToken",
        data: response.jwt,
      });

      dispatch({
        type: "setUserDetails",
        data: { firstName: response.firstName, lastName: response.lastName },
      });

      setFormData(initialFormData);
      navigate("/chargers");
    } catch (err) {
      dispatch({
        type: "setErrorMessage",
        data: err.message,
      });
    }
  };

  const handleFormData = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  return (
    <AnimatePresence>
      <motion.div
        className="form-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <form onSubmit={handleSubmit}>
          <Typography variant="h4">Sign in</Typography>

          <InputLabel>Username / Email:</InputLabel>
          <TextField
            type="text"
            name="username"
            id="username"
            autoComplete="off"
            value={formData.username}
            onChange={handleFormData}
          />

          <InputLabel htmlFor="password">Password:</InputLabel>
          <TextField
            type="password"
            name="password"
            id="password"
            autoComplete="off"
            value={formData.password}
            onChange={handleFormData}
          />

          <Button variant="contained" type="submit">
            Login
          </Button>
        </form>
      </motion.div>
    </AnimatePresence>
  );
};
