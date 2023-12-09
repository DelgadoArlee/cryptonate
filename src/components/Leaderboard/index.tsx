import { useEffect, useState } from 'react';
import {
  Box,
  Paper,
  Toolbar,
  Typography,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useBalance } from 'wagmi';
import Donor from '../../api/models/donor.entity';
import { fireDb } from '../../api/firebase.main';

function Leaderboard() {
  const [topDonors, setTopDonors] = useState<Donor[]>([]);
  const { isFetching, isSuccess } = useBalance({
    address: '0x00e2560fFE320cE84Cc2F1C71E6563CBb6D465b2',
    watch: true,
  });

  useEffect(() => {
    // Function to fetch data from Firestore
    setTopDonors(fireDb.getTopDonors());
  }, [isFetching, isSuccess]);

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <Toolbar
          sx={{
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
          }}
        >
          <Typography
            sx={{ flex: '1 1 100%' }}
            variant="h6"
            id="tableTitle"
            align="center"
            component="div"
            fontWeight="bold"
          >
            TOP DONORS
          </Typography>
        </Toolbar>
        <Divider variant="middle" />
        <TableContainer>
          <Table sx={{ px: 5, minWidth: 350 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Total Donations</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {topDonors.map((row) => (
                <TableRow
                  key={row.key}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.totalDonations}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}

export default Leaderboard;
