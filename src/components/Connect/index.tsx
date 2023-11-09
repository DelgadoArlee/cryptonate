import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { Button, Grid, Paper, Stack, Typography } from '@mui/material'
import Donations from '../Donations'
import Donate from '../Donate'
 
function Connect() {
  const { isConnected, isDisconnected } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })
  const { disconnect } = useDisconnect()
 

    return (
      <>
        {isConnected &&
        <Paper elevation={12} sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Stack sx={{border: 1, borderRadius: 'px', padding: 2}}spacing={2}>
          {/* <Grid item sm={12}>

          </Grid>
          <Grid item xs>

          </Grid>
          <Grid item xs>
        
          </Grid>
          <Grid item xs>
  
          </Grid> */}
          <Typography sx={{borderBottom: 2, paddingBottom: 1}} variant="h3" align="center">
            Just My Hiling!
          </Typography>
          <Donations/>
          <Donate/>
          <Button variant="contained" color="primary" onClick={() => disconnect()}>
            <Typography variant="button">
              DISCONNECT
            </Typography>
          </Button>
        </Stack> 
        </Paper>

    
        }
        {isDisconnected && 
          
           <Button  sx={{width: '25%',}}variant="contained"  color="primary" onClick={() => connect()}>
              <Typography variant="button">
                CONNECT
              </Typography>
            </Button>
     
        }
      </>
    )
  return (
          <Grid container >
            <Button variant="contained"  color="primary" onClick={() => connect()}>
              <Typography variant="button">
                CONNECT
              </Typography>
            </Button>
          </Grid>
        )
}

export default Connect