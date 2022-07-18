import { Button, InputLabel, TextField, Typography } from "@mui/material"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { signUp } from "../services/authServices"
import { useGlobalState } from "../utils/stateContext"
// import { reducer } from "../utils/reducer"

const SignupForm = () => {
    const {dispatch} = useGlobalState()
    const navigate = useNavigate()
    
    const initialFormData = {
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        password_confirmation: ""
    }
    const [formData, setFormData] = useState(initialFormData)
    const [error, setError] = useState(null)

    const handleSubmit = (e) =>{
        e.preventDefault()
        
        signUp(formData)
          .then((user) => {
            console.log(user)
            let errorMessage = "";
            if (user.error){
                // console.log(user.error)
                // convert the object into a string
                Object.keys(user.error).forEach(key => {
                    //console.log(key, user.error[key])
                    errorMessage = errorMessage.concat("", `${key} ${user.error[key]}`)
                })
                setError(errorMessage)
            }
            else {
                sessionStorage.setItem("username",  user.username)
                sessionStorage.setItem("token", user.jwt)
                dispatch({
                    type: "setLoggedInUser",
                    data: user.username
                })
                dispatch({
                    type: "setToken",
                    data: user.jwt
                })
                setFormData(initialFormData)
                navigate("/")
            }
            
        })
        .catch(e => {console.log(e)})
        
        
    }

    const handleFormData = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }

    console.log("FORM DATA ---", formData)

    return (
        <div className="form">
            <Typography variant='h4'>Register user</Typography>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>

                <div>
                    <InputLabel>First Name:</InputLabel>
                    <TextField type="text" name="firstName" id="firstName" value={formData.firstName} onChange={handleFormData}/>
                </div>
                <div>
                    <InputLabel>Last Name:</InputLabel>
                    <TextField type="text" name="lastName" id="lastName" value={formData.lastName} onChange={handleFormData}/>
                </div>

                <div>
                    <InputLabel>Username:</InputLabel>
                    <TextField type="text" name="username" id="username" value={formData.username} onChange={handleFormData}/>
                </div>
                <div>
                    <InputLabel>Email:</InputLabel>
                    <TextField type="text" name="email" id="email" value={formData.email} onChange={handleFormData}/>
                </div>
                <div>
                    <InputLabel htmlFor="password">Password:</InputLabel>
                    <TextField type="password" name="password" id="password" value={formData.password} onChange={handleFormData}/>
                </div>
                <div>
                    <InputLabel htmlFor="password">Password confirmation:</InputLabel>
                    <TextField type="password" name="password_confirmation" id="password_confirmation" value={formData.password_confirmation} onChange={handleFormData}/>
                </div>
               
                <Button variant="contained" type="submit">Sign up</Button>
            </form>
        </div>
    )


}



export default SignupForm