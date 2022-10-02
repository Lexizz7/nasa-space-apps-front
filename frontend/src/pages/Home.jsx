import { useState, useEffect } from "react";

import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { Stack, Tabs, Tab } from "@mui/material";
import SwipeableViews from "react-swipeable-views";

import {
  SchoolRounded,
  RocketRounded,
  AutoAwesomeRounded,
  AllInclusiveRounded,
} from "@mui/icons-material";

import Solar from "./Solar";
import Galatico from "./Galatico";
import Universal from "./Universal";
import Tutorial from "./Tutorial";

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      style={{ overflow: "hidden" }}
      {...other}
    >
      {value === index && <>{children}</>}
    </div>
  );
};

const Home = () => {
  const [tab, setTab] = useState(0);
  const [tutorial, setTutorial] = useState(false);
  const [solar, setSolar] = useState(false);
  const [galatico, setGalatico] = useState(false);
  const [universal, setUniversal] = useState(false);

  const changeTab = (_, newValue) => {
    setTab(newValue);
  };
  const changeTabSwipe = (index) => {
    setTab(index);
  };

  useEffect(() => {
    switch (tab) {
      case 0:
        setTutorial(false);
        setSolar(false);
        setGalatico(false);
        setUniversal(false);
        break;

      case 1:
        setSolar(true);
        setTutorial(false);
        setGalatico(false);
        setUniversal(false);
        break;

      case 2:
        setGalatico(true);
        setTutorial(false);
        setSolar(false);
        setUniversal(false);
        break;

      case 3:
        setUniversal(true);
        setTutorial(false);
        setSolar(false);
        setGalatico(false);
        break;

      default:
        break;
    }
  }, [tab]);

  return (
    <>
      <Stack direction="column" alignItems="center" sx={{ minHeight: "100vh" }}>
        <Header />
        <Tabs style={{ width: "100%" }} variant="fullWidth" value={tab} onChange={changeTab}>
          <Tab label="Tutorial" icon={<SchoolRounded />} />
          <Tab label="Solar" icon={<RocketRounded />} />
          <Tab label="Galático" icon={<AutoAwesomeRounded />} />
          <Tab label="Universal" icon={<AllInclusiveRounded />} />
        </Tabs>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="end"
          sx={{ flexGrow: "1" }}
          spacing={4}
        >
          <div style={{ flexGrow: "1" }}></div>
          <SwipeableViews
            style={{
              overflow: "hidden",
              width: "100%",
              height: "100%",
            }}
            index={tab}
            onChangeIndex={changeTabSwipe}
          >
            <TabPanel value={tab} index={0}>
              <Tutorial setTab={setTab} />
            </TabPanel>
            <TabPanel value={tab} index={1}>
              <Solar enteringTab={solar} />
            </TabPanel>
            <TabPanel value={tab} index={2}>
              <Galatico />
            </TabPanel>
            <TabPanel value={tab} index={3}>
              <Universal />
            </TabPanel>
          </SwipeableViews>
          <div style={{ flexGrow: "1" }}></div>
          <Footer />
        </Stack>
      </Stack>
      {tutorial && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 999,
          }}
          id="tutorial-modal"
        ></div>
      )}
    </>
  );
};

export default Home;
