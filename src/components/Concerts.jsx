import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button } from '@mui/material';
import Paper from '@mui/material/Paper';

function Concerts({events, onBuyTickets}) {

    return (
        <Paper elevation={4}>
            <h2>Upcoming Shows</h2>
            <div>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Concert</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Location</TableCell>
                                <TableCell>Venue</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                events.map(c => {
                                    return(
                                        <TableRow key={c.id}>
                                            <TableCell>{c.group}</TableCell>
                                            <TableCell>{c.date}</TableCell>
                                            <TableCell>{c.city}, {c.state}</TableCell>
                                            <TableCell>{c.venue}</TableCell>
                                            <TableCell>
                                                <Button 
                                                    variant="contained"
                                                    size="small"
                                                    onClick={() => onBuyTickets(c.id)}
                                                >
                                                    Buy Tickets
                                                </Button>
                                            </TableCell>
                                           
                                        </TableRow>      
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </Paper>
    )
}

export default Concerts;