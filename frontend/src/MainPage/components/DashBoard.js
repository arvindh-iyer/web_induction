import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { CustomAuthCard, CustomNavFont, CustomNewDiv } from "../../styles";
import { useState } from "react";
import { CustomTitle } from "../../styles";

export const DashBoard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      let l = await fetch(
        `${process.env.REACT_APP_BACKEND}mainpage/dashboard`,
        {
          method: "get",
        }
      );
      l = await l.json();
      setData(l);
    })();
  });

  return (
    <CustomNewDiv
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <CustomTitle>DashBoard</CustomTitle>

      <TableContainer component={CustomAuthCard} sx={{ width: "90vw" }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <CustomNavFont>Registration Number</CustomNavFont>
              </TableCell>
              <TableCell align="center">
                <CustomNavFont>Student Name</CustomNavFont>
              </TableCell>
              <TableCell align="center">
                <CustomNavFont>Total Marks</CustomNavFont>
              </TableCell>
              <TableCell align="center">
                <CustomNavFont>Percentage</CustomNavFont>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((row) => (
              <TableRow key={row.name}>
                <TableCell align="center">
                  <CustomNavFont>{row.regno}</CustomNavFont>
                </TableCell>
                <TableCell align="center">
                  <CustomNavFont>{row.name}</CustomNavFont>
                </TableCell>

                <TableCell align="center">
                  <CustomNavFont>{row.marks}</CustomNavFont>
                </TableCell>

                <TableCell align="center">
                  <CustomNavFont>{row.percentage}</CustomNavFont>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </CustomNewDiv>
  );
};
