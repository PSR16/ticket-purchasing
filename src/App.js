import "./styles.css";
import { useState } from "react";
import Concerts from "./components/Concerts";
import SelectTickets from "./components/SelectTickets";
import Checkout from "./components/Checkout";
import {shows} from './data/shows.js';

export default function App() {
  const [selectedShow, setSelectedShow] = useState({id: 0, group: "group", date: "d"});
  const [showTicketSelect, setshowTicketSelect] = useState(false);
  const [numTickets, setNumTickets] = useState(0);
  const [showCheckOut, setShowCheckOut] = useState(false);


  function handleSelectedShow(showId){
    setSelectedShow(shows[showId])
    setshowTicketSelect(true);
  }

  function handleNumberTickets(e, num) {
    e.preventDefault();
    setNumTickets(num);
    setShowCheckOut(true);
  }

  return (
    <div className="App">
      <h1>Buy Concert Tickets</h1>
      <Concerts 
        events={shows}
        onBuyTickets={handleSelectedShow}
        />
      
      { 
        showTicketSelect ? 
          <SelectTickets
            show={selectedShow}
            onSelectTickets={handleNumberTickets}
          />
        : null
      }

      { 
        showCheckOut ? 
          <Checkout
            show={selectedShow}
            numTickets={numTickets}
          />
        : null
      }
    </div>
  );
}
