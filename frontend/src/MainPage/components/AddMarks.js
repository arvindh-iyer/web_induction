import { CustomAuthButton, CustomTextField, CustomTitle } from "../../styles";
import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  CustomAuthCard,
  CustomNavFont,
  CustomNewDiv,
  CustomSelect,
  CustomMenuItem,
} from "../../styles";
import { useState } from "react";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import {
  ButtonGroup,
  IconButton,
  MenuItem,
  Select,
  Snackbar,
  Alert,
} from "@mui/material";
import { PercentSharp } from "@mui/icons-material";

export const AddMarks = () => {
  //const [student,setStudent]=useState()
  //const [results,setResults]=useState([])
  //const [displayTable,setDisplayTable]=useState(false)

  const [subjects, setSubjects] = useState([]);
  const [students, setStudents] = useState([]);

  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");

  const [marks, setMarks] = useState("");
  const [total, setTotalMarks] = useState("");
  const [displayMarks, setDisplayMarks] = useState(false);

  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);

  const [data, setData] = useState({});
  const [displayData, setDisplayData] = useState(false);

  /*async function fetchMarks(){
    let l=await fetch('http://localhost:5000/mainpage/fetchMarks',{
        method:'post',
        body:JSON.stringify({student}),
        headers:{
          'Content-Type':'application/json'
        }
      })
      l=await l.json()
      setDisplayTable(true)
      setResults(l)
  }*/

  function reset() {
    setSelectedStudent(null);
    setSelectedSubject(null);
    setMarks([]);
    setDisplayMarks(false);
    setData([]);
    setDisplayData(false);
  }

  async function submit() {
    console.log(marks);
    let l = await fetch(
      `${process.env.REACT_APP_BACKEND}mainpage/updateMarks`,
      {
        method: "post",
        body: JSON.stringify({
          student: selectedStudent,
          subject: selectedSubject,
          marks,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    l = await l.json();
    if (l) {
      setSuccess(true);
      reset();
    }
  }

  async function searchMarks() {
    //console.log(`student is ${selectedStudent} and subject is ${selectedSubject} `)
    let x = await fetch(`${process.env.REACT_APP_BACKEND}mainpage/fetchMarks`, {
      method: "post",
      body: JSON.stringify({
        student: selectedStudent,
        subject: selectedSubject,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    x = await x.json();

    let l = await fetch(
      `${process.env.REACT_APP_BACKEND}mainpage/studentMarks`,
      {
        method: "post",
        body: JSON.stringify({ student: selectedStudent }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    l = await l.json();
    setData(l);
    setDisplayData(true);
    setMarks(x.marks_secured);
    setTotalMarks(x.total_marks);
    setDisplayMarks(true);
  }

  useEffect(() => {
    (async () => {
      let l = await fetch(
        `${process.env.REACT_APP_BACKEND}mainpage/displaySubjects`,
        {
          method: "get",
        }
      );
      l = await l.json();

      let m = await fetch(
        `${process.env.REACT_APP_BACKEND}mainpage/displayStudents`,
        {
          method: "get",
        }
      );
      m = await m.json();
      setStudents(m);
      setSubjects(l);
    })();
  }, []);

  return (
    <CustomNewDiv
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <CustomTitle>Add/View/Update Marks</CustomTitle>
      <CustomAuthCard>
        <CustomSelect
          label="select student"
          value={selectedStudent}
          onChange={(e) => setSelectedStudent(e.target.value)}
        >
          {students.map((item) => {
            return (
              <MenuItem key={item.regno} value={item.regno}>
                {item.regno}
              </MenuItem>
            );
          })}
        </CustomSelect>

        <CustomSelect
          label="select subject"
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
        >
          {subjects.map((item) => {
            return (
              <MenuItem key={item.sub_code} value={item.sub_code}>
                {item.sub_name}
              </MenuItem>
            );
          })}
        </CustomSelect>

        {displayMarks && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CustomTextField
              label="marks secured"
              value={marks}
              onChange={(e) => setMarks(e.target.value)}
              sx={{ marginTop: "2rem" }}
            ></CustomTextField>

            <CustomTextField
              label="total marks"
              disabled
              value={total}
              sx={{ marginTop: "2rem" }}
            ></CustomTextField>
          </div>
        )}

        <ButtonGroup sx={{ width: "30vw" }}>
          <CustomAuthButton sx={{ marginTop: "2rem" }} onClick={searchMarks}>
            <CustomNavFont>Search</CustomNavFont>
          </CustomAuthButton>
          <CustomAuthButton sx={{ marginTop: "2rem" }} onClick={reset}>
            <CustomNavFont>Ok</CustomNavFont>
          </CustomAuthButton>
          <CustomAuthButton sx={{ marginTop: "2rem" }} onClick={submit}>
            <CustomNavFont>Update</CustomNavFont>
          </CustomAuthButton>
        </ButtonGroup>
      </CustomAuthCard>

      {displayData && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CustomNavFont
            sx={{ margin: "1rem" }}
          >{`Marks Secured: ${data.marks_secured}`}</CustomNavFont>

          <CustomNavFont
            sx={{ margin: "1rem" }}
          >{`percentage: ${data.percentage}`}</CustomNavFont>
        </div>
      )}

      <Snackbar open={success} onClose={() => setSuccess(false)}>
        <Alert severity="success">Data stored successfully</Alert>
      </Snackbar>

      <Snackbar open={failure} onClose={() => setFailure(false)}>
        <Alert severity="error">enter all credentials</Alert>
      </Snackbar>
    </CustomNewDiv>
  );
};
