import { WagmiConfig, createConfig, sepolia } from 'wagmi';
import { createPublicClient, http } from 'viem';
import { Typography, Grid, Stack } from '@mui/material';
import Connect from './components/Connect';
import Leaderboard from './components/Leaderboard';
import { fireDb } from './api/firebase.main';

const fetchOptions: RequestInit = {
  mode: 'cors',
};

const config = createConfig({
  autoConnect: true,
  publicClient: createPublicClient({
    chain: sepolia,
    transport: http(import.meta.env.VITE_RPC_URL, { fetchOptions }),
  }),
});

function App() {
  return (
    <WagmiConfig config={config}>
      <Grid container spacing={3} justifyContent="center" alignItems="center">
        <Grid item xs>
          <Leaderboard />
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse finibus aliquet dui pellentesque egestas. Nullam est
              ipsum, consequat in sapien id, blandit feugiat sem. Aliquam
              gravida, est sit amet vehicula vestibulum, mi arcu semper urna,
              nec scelerisque quam lectus sed leo. Mauris convallis purus sit
              amet lacus aliquam faucibus. In quis magna ut lorem ultricies
              semper in ut ipsum. Pellentesque habitant morbi tristique senectus
              et netus et malesuada fames ac turpis egestas. Mauris eu metus ut
              sem venenatis pharetra sit amet et purus. Phasellus consequat
              malesuada nisi vitae pharetra.
            </Typography>
            <Connect />
          </Stack>
          <Grid item xs></Grid>
          <Grid item xs></Grid>
          <Grid item xs></Grid>
        </Grid>
        <Grid item xs></Grid>
      </Grid>
      {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </WagmiConfig>
  );
}

export default App;
