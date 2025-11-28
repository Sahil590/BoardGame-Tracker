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
import GamesIcon from "@mui/icons-material/Games";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import { motion } from "framer-motion";
import axios from "axios";
import { API_URL } from "../config";

function GameList({ games, onEdit, onRefresh, showSnackbar }) {
  const [newGameName, setNewGameName] = useState("");

  const handleAddGame = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/games/`, { name: newGameName });
      setNewGameName("");
      onRefresh();
      showSnackbar("Game added successfully");
    } catch (error) {
      console.error("Error adding game", error);
      showSnackbar("Error adding game", "error");
    }
  };

  const handleDeleteGame = async (id) => {
    if (!window.confirm("Are you sure you want to delete this game?")) return;
    try {
      await axios.delete(`${API_URL}/games/${id}/`);
      onRefresh();
      showSnackbar("Game deleted successfully");
    } catch (error) {
      console.error("Error deleting game", error);
      showSnackbar("Error deleting game", "error");
    }
  };

  return (
    <Box>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ display: "flex", alignItems: "center", gap: 1 }}
      >
        <GamesIcon fontSize="large" /> Games
      </Typography>
      <Paper
        sx={{ p: 2, mb: 3, display: "flex", gap: 2 }}
        component="form"
        onSubmit={handleAddGame}
      >
        <TextField
          label="New Game Name"
          value={newGameName}
          onChange={(e) => setNewGameName(e.target.value)}
          required
          fullWidth
        />
        <Button type="submit" variant="contained" startIcon={<AddIcon />}>
          Add
        </Button>
      </Paper>
      <List>
        {games.map((g, index) => (
          <motion.div
            key={g.id}
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
                    onClick={() => onEdit(g)}
                    sx={{ mr: 1 }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDeleteGame(g.id)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              }
            >
              <ListItemIcon>
                <SportsEsportsIcon color="secondary" />
              </ListItemIcon>
              <ListItemText primary={g.name} />
            </ListItem>
          </motion.div>
        ))}
      </List>
    </Box>
  );
}

export default GameList;
