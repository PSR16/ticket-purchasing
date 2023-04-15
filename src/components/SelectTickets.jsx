import { useState } from "react";

export function SelectTickets({show, onSelectTickets}) {
    const [tickets, setTickets] = useState(0);
    
    return(
        <div>
            <h3>Purchase Tickets</h3>
            <h4>{show.group} on {show.date} at {show.arena}</h4>
            
            <div>
                Ticket Cost: ${show.ticketCost}
            </div>
            <div>
                <label>Select number of tickets: </label> 
                    <form onSubmit={e => onSelectTickets(e, tickets)}>
                        <select 
                            name="selectedTickets"
                            onChange={e => setTickets(e.target.value)}
                        >
                            <option>0</option>
                            {
                                [...Array(10).keys()].map((n) => {
                                    return <option key={n} value={n+1}>{n+1}</option> 
                                    })
                            }
                        </select>
                        <button type="submit">Submit</button>
                    </form>
            </div>
        </div>
    )
}