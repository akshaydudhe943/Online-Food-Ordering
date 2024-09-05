import React from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { Formik, ErrorMessage, Field, Form } from "formik";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../State/Authentication/Action";
import { useDispatch } from "react-redux";

const initialValues = {
  fullName: "",
  email: "",
  password: "",
  role: "",
};



export const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const HandleSubmit = (values) => {
    dispatch(registerUser({userData:values,navigate}))
    console.log(values);
  };
  

  return (
    <div>
      <Typography variant="h5" className="text-center">
        Register
      </Typography>

      <Formik initialValues={initialValues} onSubmit={HandleSubmit}>
        <Form>
          <Field
            as={TextField}
            name="fullName"
            label="fullName"
            fullWidth
            variant="outlined"
            margin="normal"
          />
          <Field
            as={TextField}
            name="email"
            label="email"
            fullWidth
            variant="outlined"
            margin="normal"
          />
          <Field
            as={TextField}
            name="password"
            label="password"
            fullWidth
            variant="outlined"
            margin="normal"
            type="password"
          />

          <FormControl fullWidth margin="normal">
            <InputLabel id="demo-simple-select-label">Role</InputLabel>
            <Field
              as={Select}
              labelId="role-simple-select-label"
              id="role-simple-select"
              //value={age}
              label="Role"
              name="role"
              //onChange={handleChange}
            >
              <MenuItem value={"ROLE_CUSTOMER"}>Customer</MenuItem>
              <MenuItem value={"ROLE_RESTAURANT_OWNER"}>Restaurant Owner</MenuItem>
            </Field>
          </FormControl>

          <Button
            sx={{ mt: 2, padding: "1rem" }}
            fullWidth
            type="submit"
            variant="contained"
          >
            Register
          </Button>
        </Form>
      </Formik>

      <Typography
        variant="body2"
        align="center"
        sx={{ mt: 3 }}
        className="text-center"
      >
        Already have an account?
        <Button size="small" onClick={() => navigate("/account/login")}>
          Login
        </Button>
      </Typography>
    </div>
  );
};
export default RegisterForm;
