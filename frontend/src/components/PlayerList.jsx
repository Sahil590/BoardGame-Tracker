import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { motion } from "framer-motion";
import axios from "axios";
import { API_URL } from "../config";

function PlayerList({ players, onEdit, onRefresh, showSnackbar }) {
  const [newPlayerName, setNewPlayerName] = useState("");

  const handleAddPlayer = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/players/`, { name: newPlayerName });
      setNewPlayerName("");
      onRefresh();
      showSnackbar("Player added successfully");
    } catch (error) {
      console.error("Error adding player", error);
      showSnackbar("Error adding player", "error");
    }
  };

  const handleDeletePlayer = async (id) => {
    if (!window.confirm("Are you sure you want to delete this player?")) return;
    try {
      await axios.delete(`${API_URL}/players/${id}/`);
      onRefresh();
      showSnackbar("Player deleted successfully");
    } catch (error) {
      console.error("Error deleting player", error);
      showSnackbar("Error deleting player", "error");
    }
  };

  return (
    <Box>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ display: "flex", alignItems: "center", gap: 1 }}
      >
        <PeopleIcon fontSize="large" /> Players
      </Typography>
      <Paper
        sx={{ p: 2, mb: 3, display: "flex", gap: 2 }}
        component="form"
        onSubmit={handleAddPlayer}
      >
        <TextField
          label="New Player Name"
          value={newPlayerName}
          onChange={(e) => setNewPlayerName(e.target.value)}
          required
          fullWidth
        />
        <Button type="submit" variant="contained" startIcon={<AddIcon />}>
          Add
        </Button>
      </Paper>
      <List>
        {players.map((p, index) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <ListItem
              divider
              secondaryAction={
                <Box>
                  <IconButton
                    edge="end"
                    aria-label="edit"
                    onClick={() => onEdit(p)}
                    sx={{ mr: 1 }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDeletePlayer(p.id)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              }
            >
              <ListItemIcon>
                <PeopleIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary={p.name} />
            </ListItem>
          </motion.div>
        ))}
      </List>
    </Box>
  );
}

export default PlayerList;
