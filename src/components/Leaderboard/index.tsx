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

function createData(name: string, amount: number) {
  return { name, amount };
}

const rows = [
  createData('AB', 159),
  createData('CD', 237),
  createData('EF', 262),
  createData('GH', 305),
  createData('IJ', 356),
];

function Leaderboard() {
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
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.amount}</TableCell>
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
