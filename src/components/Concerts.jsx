function Concerts({events}) {

    return (
        <div>
            <h3>Upcoming Shows</h3>
            <div>
                {
                    events.map(c => {
                        return(
                            <div>
                                {c.group} - {c.date}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Concerts;