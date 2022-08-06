import { Button, InputLabel, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "../services/authServices";
import { useGlobalState } from "../context/stateContext";
import { AlertError } from "../components/AlertError";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";

export const SignupForm = () => {
  const [step, setStep] = useState(1);
  const { dispatch } = useGlobalState();
  const navigate = useNavigate();

  const initialFormData = {
    user: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
    address: {
      address: "",
      city: "",
      postcode: "",
      state: "",
    },
  };

  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState();

  const handleNext = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handlePrev = () => {
    setStep((prevStep) => prevStep - 1);
  };

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
    <AnimatePresence>
      <motion.div
        className="form-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: "100%" }}
      >
        {error && <AlertError message={error.message} setError={setError} />}
        {step === 1 ? (
          <UserDetails
            handleFormData={handleFormData}
            formData={formData}
            handleNext={handleNext}
          />
        ) : (
          <UserAddress
            handleSubmit={handleSubmit}
            handleFormData={handleFormData}
            formData={formData}
            handlePrev={handlePrev}
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
};

const UserDetails = ({ handleFormData, formData, handleNext }) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleNext();
      }}
    >
      <Typography className="form-heading" variant="h4">
        Sign Up
      </Typography>

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

      <Button variant="outlined" type="submit" onSubmit={handleNext}>
        Next
      </Button>
    </form>
  );
};

export const UserAddress = ({
  handleSubmit,
  handleFormData,
  formData,
  handlePrev,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <Typography className="form-heading" variant="h4">
        Address
      </Typography>
      <span>So you can become a host! Or not... 😥</span>

      <InputLabel>Address</InputLabel>
      <TextField
        type="text"
        name="address"
        id="address"
        value={formData.address}
        onChange={handleFormData}
      />

      <InputLabel>City</InputLabel>
      <TextField
        type="text"
        name="city"
        id="city"
        value={formData.city}
        onChange={handleFormData}
      />

      <InputLabel>Postcode</InputLabel>
      <TextField
        type="text"
        name="postcode"
        id="postcode"
        value={formData.postcode}
        onChange={handleFormData}
      />

      <InputLabel>State</InputLabel>
      <TextField
        type="text"
        name="state"
        id="state"
        value={formData.state}
        onChange={handleFormData}
      />
      <div style={{ display: "flex" }}>
        <Button
          sx={{ width: "100%", mr: 2 }}
          variant="outlined"
          onClick={handlePrev}
        >
          Prev
        </Button>
        <Button sx={{ width: "100%" }} variant="contained" type="submit">
          Submit
        </Button>
      </div>
    </form>
  );
};
