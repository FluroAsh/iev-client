import { Button, InputLabel, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "../services/authServices";
import { useGlobalState } from "../context/stateContext";
import { AlertError } from "../components/AlertError";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";

export const SignupForm = () => {
  const { dispatch } = useGlobalState();
  const navigate = useNavigate();

  const initialFormData = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if (Object.values(formData).includes("")) {
        throw Error("Fields cannot be empty");
      }

      await signUp(formData);
      sessionStorage.setItem("username", formData.username);
      sessionStorage.setItem("token", formData.jwt);

      dispatch({
        type: "setLoggedInUser",
        data: formData.username,
      });

      dispatch({
        type: "setToken",
        data: formData.jwt,
      });

      setFormData(initialFormData);
      navigate("/");

      // signUp(formData)
      //   .then((user) => {
      //     sessionStorage.setItem("username", user.username);
      //     sessionStorage.setItem("token", user.jwt);
      //     dispatch({
      //       type: "setLoggedInUser",
      //       data: user.username,
      //     });
      //     dispatch({
      //       type: "setToken",
      //       data: user.jwt,
      //     });
      //     setFormData(initialFormData);
      //     navigate("/");
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //     setError(err);
      //   });
    } catch (err) {
      setError(err);
    }
  }

  const handleFormData = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <>
      <AnimatePresence>
        <motion.div
          className="form-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: "100%" }}
        >
          {error && <AlertError message={error.message} setError={setError} />}
          <form onSubmit={handleSubmit}>
            <Typography variant="h4">Sign Up</Typography>

            <InputLabel>First Name:</InputLabel>
            <TextField
              type="text"
              name="firstName"
              id="firstName"
              value={formData.firstName}
              onChange={handleFormData}
            />

            <InputLabel>Last Name:</InputLabel>
            <TextField
              type="text"
              name="lastName"
              id="lastName"
              value={formData.lastName}
              onChange={handleFormData}
            />

            <InputLabel>Username:</InputLabel>
            <TextField
              type="text"
              name="username"
              id="username"
              value={formData.username}
              onChange={handleFormData}
            />

            <InputLabel>Email:</InputLabel>
            <TextField
              type="text"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleFormData}
            />

            <InputLabel htmlFor="password">Password:</InputLabel>
            <TextField
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleFormData}
            />

            <InputLabel htmlFor="password">Password confirmation:</InputLabel>
            <TextField
              type="password"
              name="password_confirmation"
              id="password_confirmation"
              value={formData.password_confirmation}
              onChange={handleFormData}
            />

            <Button variant="contained" type="submit">
              Sign up
            </Button>
          </form>
        </motion.div>
      </AnimatePresence>
    </>
  );
};
