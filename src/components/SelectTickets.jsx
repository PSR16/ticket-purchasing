import { useState } from "react";
import { Select, MenuItem, Button, InputLabel, Box } from "@mui/material";
import Paper from "@mui/material/Paper";
export default function SelectTickets({show, onSelectTickets}) {
    const [tickets, setTickets] = useState(0);

    return(
        <Box sx={{width: '80%', margin: 'auto'}}>
        <Paper elevation={3}>
            <h2>Ticket Selection</h2>
            <h3>{show.group} on {show.date} at {show.venue}</h3>
            
            <div>
                Ticket Cost: ${show.ticketCost}
            </div>
            <div>
                <InputLabel>Select number of tickets: </InputLabel> 
                    <form onSubmit={e => onSelectTickets(e, tickets)}>
                        <select 
                            name="selectedTickets"
                            onChange={e => setTickets(e.target.value)}
                        >
                            <option key={0}>0</option>
                            {
                                [...Array(10).keys()].map((n) => {
                                    return <option key={n+1} value={n+1}>{n+1}</option> 
                                    })
                            }
                        </select>
                        <Button size="small" type="submit">Submit</Button>
                    </form>
            </div>
        </Paper>
    </Box>
    )
}