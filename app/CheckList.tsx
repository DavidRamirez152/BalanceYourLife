import React from 'react';
import { Box, Checkbox, Typography } from '@mui/material';

function Checklist() {
  return (
    <Box>
      <Typography variant="h6">Primeros pasos</Typography>
      <Box display="flex" alignItems="center">
        <Checkbox checked disabled />
        <Typography>Crea tu cuenta</Typography>
      </Box>
      <Box display="flex" alignItems="center">
        <Checkbox checked disabled />
        <Typography>Arma Tu Primer Día</Typography>
      </Box>
      <Box display="flex" alignItems="center">
        <Checkbox checked disabled />
        <Typography>Completa tus calorías diarias</Typography>
      </Box>
      <Box display="flex" alignItems="center">
        <Checkbox />
        <Typography>Registra tu peso</Typography>
      </Box>
      <Box display="flex" alignItems="center">
        <Checkbox />
        <Typography>Únete o crea un Team</Typography>
      </Box>
    </Box>
  );
}

export default Checklist;