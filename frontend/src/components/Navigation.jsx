import React from "react";
import { AppBar, Toolbar, Typography, Tabs, Tab } from "@mui/material";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import HistoryIcon from "@mui/icons-material/History";
import AddIcon from "@mui/icons-material/Add";
import PeopleIcon from "@mui/icons-material/People";
import GamesIcon from "@mui/icons-material/Games";

function Navigation({ view, onViewChange }) {
  return (
    <AppBar position="static" color="primary" enableColorOnDark>
      <Toolbar>
        <SportsEsportsIcon sx={{ mr: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Boardgame Tracker
        </Typography>
      </Toolbar>
      <Tabs
        value={view}
        onChange={onViewChange}
        textColor="inherit"
        indicatorColor="secondary"
        centered
      >
        <Tab icon={<HistoryIcon />} label="Matches" />
        <Tab icon={<AddIcon />} label="Record" />
        <Tab icon={<PeopleIcon />} label="Players" />
        <Tab icon={<GamesIcon />} label="Games" />
      </Tabs>
    </AppBar>
  );
}

export default Navigation;
