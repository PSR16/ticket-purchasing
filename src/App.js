import "./styles.css";
import Concerts from "./components/Concerts";

export default function App() {
  const upcomingShows = [
    {
      id: 1,
      group: "P!nk",
      date: ""
    },
    {
      id: 2,
      group: "Transiberian Orchestra",
      date: ""
    },
    {
      id: 3,
      group: "John Mellencamp",
      date: ""
    }
  ];
  
  return (
    <div className="App">
      <h1>Concert Ticket Checkout</h1>
      <Concerts events={upcomingShows}/>
    </div>
  );
}
