import { useState, useEffect } from "react";
import styles from "./Header.module.css";

import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Box,
  Tooltip,
  Menu,
  MenuItem,
  Stack,
} from "@mui/material";

import SpacedleLogo from "../../assets/logo.svg";
import Countdown from "../Countdown";

const Header = () => {
  return (
    <>
      <AppBar position="static">
        <Container maxWidth="lg">
          <Toolbar>
            <Box className={styles.logo}>
              <img src={SpacedleLogo} alt="Spacedle" />
            </Box>
            <Box style={{ flexGrow: "1" }}></Box>
            <Box>
              <Stack direction="column" alignItems="center">
                <Typography variant="body2" sx={{ margin: 0 }}>
                  Próximo desafio:
                </Typography>
                <Countdown />
              </Stack>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default Header;
