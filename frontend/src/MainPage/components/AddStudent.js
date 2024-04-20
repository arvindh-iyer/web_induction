import { Stack, TextField } from "@mui/material";
import React from "react";
import {
  CustomTextField,
  CustomNewDiv,
  CustomAuthCard,
  CustomNavFont,
  CustomAuthButton,
  CustomTitle,
} from "../../styles";
import { useState } from "react";
import { Alert, Button, Snackbar, Typography } from "@mui/material";

export const AddStudent = () => {
  const [name, setName] = useState("");
  const [batch, setBatch] = useState("");
  const [regno, setRegno] = useState("");
  const [semester, setSemester] = useState("");
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);

  async function handleSubmit() {
    let res = await fetch(
      `${process.env.REACT_APP_BACKEND}/mainpage/addNewStudent`,
      {
        method: "post",
        body: JSON.stringify({ name, batch, regno, semester }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setName("");
    setBatch("");
    setRegno("");
    setSemester("");
    res = await res.json();

    if (res) setSuccess(true);
    else setFailure(true);
  }

  return (
    <CustomNewDiv spacing={2}>
      <CustomTitle>Student</CustomTitle>
      <CustomAuthCard
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <CustomTextField
          label="name"
          sx={{ margin: "1rem" }}
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></CustomTextField>

        <CustomTextField
          label="batch"
          sx={{ margin: "1rem" }}
          value={batch}
          onChange={(e) => setBatch(e.target.value)}
        ></CustomTextField>

        <CustomTextField
          label="regno"
          sx={{ margin: "1rem" }}
          value={regno}
          onChange={(e) => setRegno(e.target.value)}
        ></CustomTextField>

        <CustomTextField
          label="semester"
          sx={{ margin: "1rem" }}
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
        ></CustomTextField>

        <CustomAuthButton onClick={handleSubmit}>Submit</CustomAuthButton>
      </CustomAuthCard>

      <Snackbar open={success} onClose={() => setSuccess(false)}>
        <Alert severity="success">Data stored successfully</Alert>
      </Snackbar>

      <Snackbar open={failure} onClose={() => setFailure(false)}>
        <Alert severity="error">invalid data</Alert>
      </Snackbar>
    </CustomNewDiv>
  );
};
