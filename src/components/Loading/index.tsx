import React from 'react';
import { Grid, CircularProgress, Box } from '@mui/material';

function Loading() {
  return (
    <Box>
      <CircularProgress size={150} />
    </Box>
  );
  return (
    <Box sx={{ padding: '25%' }}>
      <Grid
        container
        sx={{
          alignItems: 'center',
          justifyContent: 'center',
          alignContent: 'center',
        }}
      >
        <Grid item>
          <CircularProgress size={150} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Loading;
