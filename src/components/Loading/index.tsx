import React from 'react';
import { Grid, CircularProgress, Box } from '@mui/material';

function Loading() {
  return (
    <Box sx={{ padding: '25%', height: '85vh' }}>
      <Grid
        container
        sx={{
          alignItems: 'center',
          justifyContent: 'center',
          alignContent: 'center',
        }}
      >
        <Grid item>
          <CircularProgress size={100} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Loading;