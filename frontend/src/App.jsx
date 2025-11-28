import { useState, useEffect } from "react";
import axios from "axios";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Container, Snackbar, Alert } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import theme from "./theme";
import { API_URL } from "./config";

import Navigation from "./components/Navigation";
import MatchList from "./components/MatchList";
import MatchForm from "./components/MatchForm";
import PlayerList from "./components/PlayerList";
import GameList from "./components/GameList";
import EditDialog from "./components/EditDialog";

function App() {
  const [players, setPlayers] = useState([]);
  const [games, setGames] = useState([]);
  const [matches, setMatches] = useState([]);
  const [view, setView] = useState(0); // 0: matches, 1: add_match, 2: players, 3: games
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Edit Dialog State
  const [editDialog, setEditDialog] = useState({
    open: false,
    type: "",
    id: null,
    name: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [playersRes, gamesRes, matchesRes] = await Promise.all([
        axios.get(`${API_URL}/players/`),
        axios.get(`${API_URL}/games/`),
        axios.get(`${API_URL}/matches/`),
      ]);
      setPlayers(playersRes.data);
      setGames(gamesRes.data);
      setMatches(matchesRes.data);
    } catch (error) {
      console.error("Error fetching data", error);
      showSnackbar("Error fetching data", "error");
    }
  };

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleEditPlayer = (player) => {
    setEditDialog({
      open: true,
      type: "player",
      id: player.id,
      name: player.name,
    });
  };

  const handleEditGame = (game) => {
    setEditDialog({
      open: true,
      type: "game",
      id: game.id,
      name: game.name,
    });
  };

  const handleUpdateItem = async () => {
    try {
      const endpoint = editDialog.type === "player" ? "players" : "games";
      await axios.patch(`${API_URL}/${endpoint}/${editDialog.id}/`, {
        name: editDialog.name,
      });
      setEditDialog({ ...editDialog, open: false });
      fetchData();
      showSnackbar(
        `${
          editDialog.type === "player" ? "Player" : "Game"
        } updated successfully`
      );
    } catch (error) {
      console.error("Error updating item", error);
      showSnackbar("Error updating item", "error");
    }
  };

  const handleTabChange = (event, newValue) => {
    setView(newValue);
  };

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 },
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.3,
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navigation view={view} onViewChange={handleTabChange} />

      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <AnimatePresence mode="wait">
          {view === 0 && (
            <motion.div
              key="matches"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <MatchList matches={matches} />
            </motion.div>
          )}

          {view === 1 && (
            <motion.div
              key="add_match"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <MatchForm
                games={games}
                players={players}
                onMatchRecorded={() => {
                  fetchData();
                  setView(0);
                }}
                showSnackbar={showSnackbar}
              />
            </motion.div>
          )}

          {view === 2 && (
            <motion.div
              key="players"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <PlayerList
                players={players}
                onEdit={handleEditPlayer}
                onRefresh={fetchData}
                showSnackbar={showSnackbar}
              />
            </motion.div>
          )}

          {view === 3 && (
            <motion.div
              key="games"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <GameList
                games={games}
                onEdit={handleEditGame}
                onRefresh={fetchData}
                showSnackbar={showSnackbar}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </Container>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      <EditDialog
        open={editDialog.open}
        type={editDialog.type}
        name={editDialog.name}
        onNameChange={(name) => setEditDialog({ ...editDialog, name })}
        onClose={() => setEditDialog({ ...editDialog, open: false })}
        onSave={handleUpdateItem}
      />
    </ThemeProvider>
  );
}

export default App;
