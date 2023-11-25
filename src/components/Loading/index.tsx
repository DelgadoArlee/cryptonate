import { CircularProgress, Box } from '@mui/material';

function Loading() {
  return (
    <Box>
      <CircularProgress size={150} />
    </Box>
  );
}

export default Loading;
