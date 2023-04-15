function Concerts({events, onBuyTickets}) {

    return (
        <div>
            <h3>Upcoming Shows</h3>
            <div>
                <ul>
                {
                    events.map(c => {
                        return(
                            <div key={c.id}>
                                <li>{c.group} - {c.date}</li>  
                                <button 
                                    onClick={() => onBuyTickets(c.id)}
                                >
                                        Buy Tickets
                                    </button>
                            </div>      
                        )
                    })
                }
                </ul>
            </div>
        </div>
    )
}

export default Concerts;