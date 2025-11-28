import React from "react";
import { Box, Typography, Grid, Card, CardContent } from "@mui/material";
import HistoryIcon from "@mui/icons-material/History";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { motion } from "framer-motion";

function MatchList({ matches }) {
  return (
    <Box>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ display: "flex", alignItems: "center", gap: 1 }}
      >
        <HistoryIcon fontSize="large" /> Recent Matches
      </Typography>
      <Grid container spacing={2}>
        {matches.map((match, index) => (
          <Grid item xs={12} key={match.id}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card variant="outlined">
                <CardContent>
                  <Typography
                    variant="h6"
                    color="primary"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <EmojiEventsIcon fontSize="small" /> {match.game_name}
                  </Typography>
                  <Typography color="text.secondary" gutterBottom>
                    {match.date}
                  </Typography>
                  <Box sx={{ mt: 1 }}>
                    {match.scores.map((score) => (
                      <Typography key={score.id} variant="body1">
                        {score.player_name}: <strong>{score.value}</strong>
                      </Typography>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default MatchList;
