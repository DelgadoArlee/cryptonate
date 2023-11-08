import { useBalance } from 'wagmi'
import Loading from '../Loading'
import { Typography, Grid } from '@mui/material'

function Balance() {
    const { data, isError, isLoading } = useBalance({
      address: '0x00e2560fFE320cE84Cc2F1C71E6563CBb6D465b2',
    })
   
    if (isLoading) return <Loading/>
    if (isError) return <div>Error fetching balance</div>

    const balance = data? `${parseFloat(data?.formatted).toFixed(2)} ${data?.symbol}`: 'Connection Error'

    return (
      <>
      <Grid>
        <Typography variant="h4" align="center" fontWeight='bold'>BALANCE</Typography>
        <Typography sx={{borderBottom: 2, paddingBottom: 2}} variant="h5" align="center" fontWeight='bold'>{balance}</Typography>
      </Grid>
      </>
    )
}

export default Balance