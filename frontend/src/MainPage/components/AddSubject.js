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

export const AddSubject = () => {
  const [sub_code, setSub_code] = useState("");
  const [sub_name, setSub_name] = useState("");
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);

  async function handleSubmit() {
    let res = await fetch(
      `${process.env.REACT_APP_BACKEND}mainpage/addNewSubject`,
      {
        method: "post",
        body: JSON.stringify({ sub_code, sub_name }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setSub_code("");
    setSub_name("");
    res = await res.json();

    if (res) setSuccess(true);
    else setFailure(true);
  }

  return (
    <CustomNewDiv spacing={2}>
      <CustomTitle>Add New Subject</CustomTitle>

      <CustomAuthCard
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <CustomTextField
          label="subject code"
          sx={{ margin: "1rem" }}
          value={sub_code}
          onChange={(e) => setSub_code(e.target.value)}
        ></CustomTextField>

        <CustomTextField
          label="subject name"
          sx={{ margin: "1rem" }}
          value={sub_name}
          onChange={(e) => setSub_name(e.target.value)}
        ></CustomTextField>

        <CustomAuthButton onClick={handleSubmit}>Submit</CustomAuthButton>
      </CustomAuthCard>

      <Snackbar open={success} onClose={() => setSuccess(false)}>
        <Alert severity="success">Subject stored successfully</Alert>
      </Snackbar>

      <Snackbar open={failure} onClose={() => setFailure(false)}>
        <Alert severity="error">invalid data</Alert>
      </Snackbar>
    </CustomNewDiv>
  );
};
