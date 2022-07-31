import { Button, InputLabel, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn } from "../services/authServices";
import { useGlobalState } from "../context/stateContext";
import { AlertError } from "../components/AlertError";

const SigninForm = () => {
  const { dispatch } = useGlobalState();
  const navigate = useNavigate();

  const initialFormData = {
    username: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    try {
      if (Object.values(formData).includes("")) {
        throw Error("Fields cannot be empty");
      }

      signIn(formData)
        .then((user) => {
          setError();
          console.log("THIS IS USER", user);
          sessionStorage.setItem("username", user.username);
          sessionStorage.setItem("token", user.jwt);
          sessionStorage.setItem("firstName", user.firstName);
          sessionStorage.setItem("lastName", user.lastName);
          dispatch({
            type: "setLoggedInUser",
            data: user.username,
          });
          dispatch({
            type: "setToken",
            data: user.jwt,
          });
          dispatch({
            type: "setUserDetails",
            data: { firstName: user.firstName, lastName: user.lastName },
          });
          setFormData(initialFormData);
          navigate("/");
        })
        .catch((err) => {
          setError(err);
        });
    } catch (err) {
      setError(err);
    }
  };

  const handleFormData = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  return (
    <>
      {error && <AlertError message={error.message} setError={setError} />}

      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <Typography variant="h4">Sign in</Typography>

          <InputLabel>Username / Email:</InputLabel>
          <TextField
            type="text"
            name="username"
            id="username"
            value={formData.username}
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

          <Button variant="contained" type="submit">
            Login
          </Button>
        </form>
      </div>
    </>
  );
};

export default SigninForm;
