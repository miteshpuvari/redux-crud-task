import React from "react";
import "./Homestyles.scss";
import {
  Box,
  Button,
  FormHelperText,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { createEmployee } from "../../redux/reducer/employeeReducer";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const id = Math.floor(Math.random() * 100);

  const formik = useFormik({
    // enableReinitialize: true,
    initialValues: {
        id: id,
      employeeName: "",
      employeeAge: "",
      employeeSalary: "",
    },
    validationSchema: Yup.object().shape({
      employeeName: Yup.string().required(),
      employeeAge: Yup.string().required(),
      employeeSalary: Yup.string().required(),
    }),
    onSubmit: (values) => {
      dispatch(createEmployee(values));
      navigate("/employeeList");
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box className="home-container mt-3">
        <Typography variant="h4">User Crude Task</Typography>
      </Box>
      <Box sx={{ minHeight: "400px" }} className="input-box-styles">
        <TextField
          id="employeeName"
          onChange={formik.handleChange}
          value={formik.values.employeeName}
          label="Employee name"
          variant="outlined"
        />
        <FormHelperText sx={{ color: "red" }}>
          {formik.touched.employeeName && formik.errors.employeeName}
        </FormHelperText>
        <TextField
          id="employeeAge"
          type="number"
          onChange={formik.handleChange}
          value={formik.values.employeeAge}
          label="Employee age"
          variant="outlined"
        />
        <FormHelperText sx={{ color: "red" }}>
          {formik.touched.employeeAge && formik.errors.employeeAge}
        </FormHelperText>
        <TextField
          id="employeeSalary"
          type="number"
          onChange={formik.handleChange}
          value={formik.values.employeeSalary}
          label="Employee salary"
          variant="outlined"
        />
        <FormHelperText sx={{ color: "red" }}>
          {formik.touched.employeeSalary && formik.errors.employeeSalary}
        </FormHelperText>
        <Button type="submit" variant="contained">
          Create
        </Button>
      </Box>
    </form>
  );
};

export default Home;
