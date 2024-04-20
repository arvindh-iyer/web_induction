import {
  AppBar,
  Button,
  Stack,
  Switch,
  ThemeProvider,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { CustomAppBar } from "../styles.js";
import { ThemeContext } from "../ThemeContext";
import { theme, darkTheme } from "../theme";
//import {MainPage}from './components/MainPage'
//import { NewMainPage } from './components/NewMainPage.js'
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import { CustomNavFont, CustomSwitch } from "../styles.js";
import { Link } from "react-router-dom";
import { DashBoard } from "./components/DashBoard.js";
import { AddStudent } from "./components/AddStudent.js";
import { AddSubject } from "./components/AddSubject.js";
import { AddMarks } from "./components/AddMarks.js";

export const MainPage = () => {
  const { mode, toggleMode } = useContext(ThemeContext);
  const token = localStorage.getItem("token");
  const [name, setName] = useState();
  const [value, setValue] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      let name = await fetch(
        `${process.env.REACT_APP_BACKEND}/mainpage/verifyJwt`,
        {
          method: "post",
          body: JSON.stringify({ token }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      name = await name.json();
      setName(name.name);
    })();
  });
  return (
    <div>
      <Stack direction="column" spacing={0} margin={0}>
        <CustomAppBar
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            position: "relative",
          }}
        >
          <Grid
            container
            sx={{
              padding: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Grid item xs={9}>
              <Grid container>
                <Grid
                  item
                  xs={3}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Button onClick={() => setValue(1)}>
                    <CustomNavFont>DashBoard</CustomNavFont>
                  </Button>
                </Grid>

                <Grid
                  item
                  xs={3}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Button onClick={() => setValue(2)}>
                    <CustomNavFont>Add Student</CustomNavFont>
                  </Button>
                </Grid>

                <Grid
                  item
                  xs={3}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Button onClick={() => setValue(3)}>
                    <CustomNavFont>Add Subject</CustomNavFont>
                  </Button>
                </Grid>

                <Grid
                  item
                  xs={3}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Button onClick={() => setValue(4)}>
                    <CustomNavFont>Add Marks</CustomNavFont>
                  </Button>
                </Grid>
              </Grid>
            </Grid>

            <Grid
              item
              xs={3}
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CustomSwitch onChange={toggleMode}></CustomSwitch>
              <CustomNavFont>{`hello ${name}`}</CustomNavFont>
            </Grid>
          </Grid>
        </CustomAppBar>

        {value === 1 && <DashBoard></DashBoard>}
        {value === 2 && <AddStudent></AddStudent>}
        {value === 3 && <AddSubject></AddSubject>}
        {value === 4 && <AddMarks></AddMarks>}
      </Stack>
    </div>
  );
};

/*Admin Portal
        
          

          <div style={{position:'absolute',right:'10px'}}>
          {`hello ${name}`}
        </div> */
