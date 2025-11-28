import React, { useState } from "react";
import {
  Paper,
  Typography,
  Box,
  TextField,
  MenuItem,
  Button,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import DeleteIcon from "@mui/icons-material/Delete";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { API_URL } from "../config";

function MatchForm({ games, players, onMatchRecorded, showSnackbar }) {
  const [matchDate, setMatchDate] = useState("");
  const [selectedGame, setSelectedGame] = useState("");
  const [matchScores, setMatchScores] = useState([{ player: "", score: "" }]);

  const handleAddScoreRow = () => {
    setMatchScores([...matchScores, { player: "", score: "" }]);
  };

  const handleRemoveScoreRow = (index) => {
    const newScores = matchScores.filter((_, i) => i !== index);
    setMatchScores(newScores);
  };

  const handleScoreChange = (index, field, value) => {
    const newScores = [...matchScores];
    newScores[index][field] = value;
    setMatchScores(newScores);
  };

  const handleSaveMatch = async (e) => {
    e.preventDefault();
    try {
      // 1. Create Match
      const matchRes = await axios.post(`${API_URL}/matches/`, {
        game: selectedGame,
        date: matchDate,
      });
      const matchId = matchRes.data.id;

      // 2. Create Scores
      await Promise.all(
        matchScores.map((s) =>
          axios.post(`${API_URL}/scores/`, {
            match: matchId,
            player: s.player,
            value: parseInt(s.score),
          })
        )
      );

      // Reset form
      setMatchDate("");
      setSelectedGame("");
      setMatchScores([{ player: "", score: "" }]);

      if (onMatchRecorded) onMatchRecorded();
      if (showSnackbar) showSnackbar("Match recorded successfully");
    } catch (error) {
      console.error("Error saving match", error);
      if (showSnackbar) showSnackbar("Error saving match", "error");
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography
        variant="h5"
        gutterBottom
        sx={{ display: "flex", alignItems: "center", gap: 1 }}
      >
        <AddIcon /> Record Match
      </Typography>
      <Box
        component="form"
        onSubmit={handleSaveMatch}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          select
          label="Game"
          value={selectedGame}
          onChange={(e) => setSelectedGame(e.target.value)}
          required
          fullWidth
        >
          {games.map((g) => (
            <MenuItem key={g.id} value={g.id}>
              {g.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          type="date"
          label="Date"
          value={matchDate}
          onChange={(e) => setMatchDate(e.target.value)}
          required
          fullWidth
          InputLabelProps={{ shrink: true }}
        />

        <Typography variant="h6" sx={{ mt: 2 }}>
          Scores
        </Typography>
        <AnimatePresence>
          {matchScores.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <TextField
                  select
                  label="Player"
                  value={s.player}
                  onChange={(e) =>
                    handleScoreChange(i, "player", e.target.value)
                  }
                  required
                  sx={{ flexGrow: 1 }}
                >
                  {players.map((p) => (
                    <MenuItem key={p.id} value={p.id}>
                      {p.name}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  type="number"
                  label="Score"
                  value={s.score}
                  onChange={(e) =>
                    handleScoreChange(i, "score", e.target.value)
                  }
                  required
                  sx={{ width: 100 }}
                />
                <IconButton
                  onClick={() => handleRemoveScoreRow(i)}
                  color="error"
                  disabled={matchScores.length === 1}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </motion.div>
          ))}
        </AnimatePresence>

        <Button
          startIcon={<PersonAddIcon />}
          onClick={handleAddScoreRow}
          variant="outlined"
        >
          Add Player
        </Button>

        <Button
          type="submit"
          variant="contained"
          size="large"
          startIcon={<SaveIcon />}
          sx={{ mt: 2 }}
        >
          Save Match
        </Button>
      </Box>
    </Paper>
  );
}

export default MatchForm;
