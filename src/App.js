import "./styles.css";
import { useState } from "react";
import Concerts from "./components/Concerts";
import { SelectTickets } from "./components/SelectTickets";
import {shows} from './data/shows.js';

export default function App() {
  const [selectedShow, setSelectedShow] = useState({id: 0, group: "group", date: "d"});
  const [showPurchaseScreen, setShowPurchaseScreen] = useState(false);
  const [numTickets, setNumTickets] = useState(0);


  function handleSelectedShow(showId){
    setSelectedShow(shows[showId])
    setShowPurchaseScreen(true);
  }

  function handleNumberTickets(e, num) {
    e.preventDefault();
    setNumTickets(num);
  }

  return (
    <div className="App">
      <h1>Buy Concert Tickets</h1>
      <Concerts 
        events={shows}
        onBuyTickets={handleSelectedShow}
        />
      
      { 
        showPurchaseScreen ? 
          <SelectTickets
            show={selectedShow}
            onSelectTickets={handleNumberTickets}
          />
        : null
      }
    </div>
  );
}
