import "./styles.css";
import { useState } from "react";
import Concerts from "./components/Concerts";
import { SelectTickets } from "./components/SelectTickets";
import {shows} from './data/shows.js';

export default function App() {
  const [selectedShow, setSelectedShow] = useState({id: 0, group: "group", date: "d"});
  const [showPurchaseScreen, setShowPurchaseScreen] = useState(false);

  function handleSelectedShow(showId){
    console.log(shows[showId])
    setSelectedShow(shows[showId])
    setShowPurchaseScreen(true);
  }

  return (
    <div className="App">
      <h1>Concert Ticket Checkout</h1>
      <Concerts 
        events={shows}
        onBuyTickets={handleSelectedShow}
        />
      
      { 
        showPurchaseScreen ? 
            <SelectTickets
          />
        : null
      }
    </div>
  );
}
