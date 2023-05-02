import {
  Box,
  Button,
  FormHelperText,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import "./EmployeeListStyles.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteEmployee,
  editEmployee,
} from "../../redux/reducer/employeeReducer";
import Modal from "@mui/material/Modal";
import { useFormik } from "formik";
import * as Yup from "yup";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const EmployeeList = () => {
  const dispatch = useDispatch();
  const [allData, setAllData] = useState();
  const [open, setOpen] = React.useState(false);
  const [editData, setEditData] = useState();
  const handleClose = () => setOpen(false);
  const eployeList = useSelector((state) => state.employee);

  useEffect(() => {
    setAllData(eployeList);
  }, [eployeList]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: open
      ? editData
      : {
          employeeName: "",
          employeeAge: "",
          employeeSalary: "",
        },
    validationSchema: Yup.object().shape({
      employeeName: Yup.string().required(),
      employeeAge: Yup.string().required(),
      employeeSalary: Yup.string().required(),
    }),
    onSubmit: async (values) => {
      const removed = await eployeList?.employeeList?.filter(
        (state) => state?.id !== values?.id
      );
      removed.push(values);
      setOpen(false);
      dispatch(editEmployee(removed));
    },
  });

  const Delete = (deleteData) => {
    const deletedData = eployeList?.employeeList?.filter(
      (state) => state?.id !== deleteData?.id
    );
    dispatch(deleteEmployee(deletedData));
  };

  const Edit = (data) => {
    setEditData(data);
    setOpen(true);
  };

  return (
    <Box className="list-container mt-3 p-5">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <form onSubmit={formik.handleSubmit}>
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Edit Employee
            </Typography>
            <Box sx={{ minHeight: "400px" }} className="input-box-styles">
              <TextField
                id="employeeName"
                onChange={formik.handleChange}
                value={formik.values.employeeName}
                defaultValue={formik.values.employeeName}
                label="Employee name"
                variant="outlined"
              />
              <FormHelperText sx={{ color: "red" }}>
                {formik.touched.employeeName && formik.errors.employeeName}
              </FormHelperText>
              <TextField
                id="employeeAge"
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
                onChange={formik.handleChange}
                value={formik.values.employeeSalary}
                label="Employee salary"
                variant="outlined"
              />
              <FormHelperText sx={{ color: "red" }}>
                {formik.touched.employeeSalary && formik.errors.employeeSalary}
              </FormHelperText>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}
              >
                <Button sx={{ mr: 2 }} type="submit" variant="contained">
                  Edit
                </Button>
                <Button
                  onClick={() => setOpen(false)}
                  type="submit"
                  variant="contained"
                >
                  close
                </Button>
              </Box>
            </Box>
          </Box>
        </form>
      </Modal>
      <Typography variant="h4">Employee List</Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Employee Name</TableCell>
              <TableCell>Employee Age</TableCell>
              <TableCell>Employee Salart</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allData?.employeeList?.map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.employeeName}
                </TableCell>
                <TableCell>{row.employeeAge}</TableCell>
                <TableCell>{row.employeeSalary}</TableCell>
                <TableCell>
                  <Button onClick={() => Edit(row)} variant="contained">
                    Edit
                  </Button>
                  <Button
                    onClick={() => Delete(row)}
                    sx={{ ml: 2 }}
                    variant="outlined"
                    color="error"
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default EmployeeList;
