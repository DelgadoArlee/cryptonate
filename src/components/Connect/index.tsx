import { useConnect, useDisconnect, useAccount } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { Button, Grid, Paper, Stack, Typography } from '@mui/material';
import Leaderboard from '../Leaderboard';
import Donations from '../Donations';
import Donate from '../Donate';

function Connect() {
  const { address, isConnected, isDisconnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();

  return (
    <Grid container spacing={3} justifyContent="center" alignItems="center">
      <Grid item xs>
        {isConnected && <Leaderboard />}
      </Grid>
      <Grid item xs={6}>
        <Stack
          spacing={3}
          sx={{ justifyContent: 'center', alignItems: 'center' }}
        >
          <Typography sx={{ fontWeight: 'bold' }} align="center" variant="h1">
            CRYPTONATE
          </Typography>
          <Typography variant="body2" align="center" gutterBottom>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            finibus aliquet dui pellentesque egestas. Nullam est ipsum,
            consequat in sapien id, blandit feugiat sem. Aliquam gravida, est
            sit amet vehicula vestibulum, mi arcu semper urna, nec scelerisque
            quam lectus sed leo. Mauris convallis purus sit amet lacus aliquam
            faucibus. In quis magna ut lorem ultricies semper in ut ipsum.
            Pellentesque habitant morbi tristique senectus et netus et malesuada
            fames ac turpis egestas. Mauris eu metus ut sem venenatis pharetra
            sit amet et purus. Phasellus consequat malesuada nisi vitae
            pharetra.
          </Typography>
          {isConnected && (
            <Paper
              elevation={12}
              sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
            >
              <Stack
                sx={{ border: 1, borderRadius: 'px', padding: 2 }}
                spacing={2}
              >
                {/* <Grid item sm={12}>

          </Grid>
          <Grid item xs>

          </Grid>
          <Grid item xs>
        
          </Grid>
          <Grid item xs>
  
          </Grid> */}
                <Typography
                  sx={{ borderBottom: 2, paddingBottom: 1 }}
                  variant="h3"
                  align="center"
                >
                  Just My Hiling!
                </Typography>
                <Donations />
                <Donate address={address!} />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => disconnect()}
                >
                  <Typography variant="button">DISCONNECT</Typography>
                </Button>
              </Stack>
            </Paper>
          )}
          {isDisconnected && (
            <Button
              sx={{ width: '25%' }}
              variant="contained"
              color="primary"
              onClick={() => connect()}
            >
              <Typography variant="button">CONNECT</Typography>
            </Button>
          )}
        </Stack>
        <Grid item xs></Grid>
        <Grid item xs></Grid>
        <Grid item xs></Grid>
      </Grid>
      <Grid item xs></Grid>
    </Grid>
  );
}

export default Connect;
