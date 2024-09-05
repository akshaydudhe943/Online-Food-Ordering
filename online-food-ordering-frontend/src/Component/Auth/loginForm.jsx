import React from "react";
import { Button, Typography } from "@mui/material";
import { Formik, ErrorMessage, Field, Form } from "formik";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../State/Authentication/Action";

const initialValues = {
  email: "",
  password: "",
};

export const LoginForm = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const HandleSubmit = (values) => {
    dispatch(loginUser({userData:values,navigate}))
    console.log(values);
  };

  return (
    <div>
      <Typography variant="h5" className="text-center">
        Login
      </Typography>

      <Formik initialValues={initialValues} onSubmit={HandleSubmit}>
        <Form>
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

          <Button
            sx={{ mt: 2, padding: "1rem" }}
            fullWidth
            type="submit"
            variant="contained"
          >
            Login
          </Button>
        </Form>
      </Formik>
      <Typography
        variant="body2"
        align="center"
        sx={{ mt: 3 }}
        className="text-center"
      >
        Don't have an account?
        <Button size="small" onClick={() => navigate("/account/register")}>
          Register
        </Button>
      </Typography>
    </div>
  );
};
export default LoginForm;
