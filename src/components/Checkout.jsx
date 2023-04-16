import { ticketmasterData } from "../data/ticketmasterData";
import { useState } from "react";
import AddPayment from "./AddPayment";
import { Grid, Box } from "@mui/material";
import Paper from "@mui/material/Paper";

function Payment({cardList}) {
    return(
        <div>
            {
                cardList.map((c) => {
                    return(
                        <div key={c.id}>
                            {c.nameOnCard}
                        </div>
                    )
                })
            }
        </div>
    )
}

function Delivery() {
    return(
        <Box sx={{marginLeft:'20px', border: 1, borderColor: 'lightgray', p: 2, width: '90%', borderRadius: 1}}>
            <h3>Delivery</h3>
            <div>
                <b>Mobile Entry - Free</b>
            </div>
            <div>
                {ticketmasterData.mobileEntryText}
            </div>
        </Box>
    )
}

function PaymentMethod({cardList, updateCardList}) {
    const [addNewPaymentInfo, setAddNewPaymentInfo] = useState(false);

    function handleAddPayment() {
        setAddNewPaymentInfo(true);
    }

    function handleNewPayment(paymentInfo) {
        updateCardList(paymentInfo);
        setAddNewPaymentInfo(false);
    }

    return (
        <Box sx={{marginLeft:'20px', border: 1, borderColor: 'lightgray', p: 2, width: '90%', height: '50%', borderRadius: 1}}>
            <h3>Payment</h3>
            <b>Use Credit / Debit Card</b>
            <div>
                {
                    cardList.length > 0 ? <Payment cardList={cardList}/> : null
                }
                {
                    addNewPaymentInfo ? <AddPayment cardList={cardList} onNewPayment={handleNewPayment} /> : null
                }
                <div>
                    <button onClick={handleAddPayment}>Add New Card</button>
                </div>
            </div>
        </Box>
    )
}

export default function Checkout({numTickets, show}) {
    const [cardList, setCardList] = useState([]);
    
    function updateCardList(paymentInfo) {
        let id = cardList.length + 1;
        
        setCardList((prev) => [
            ...prev,
            {
                ...paymentInfo,
                id: id
            }
        ]);
    }
 
    return(
        <Box sx={{width: '80%', margin: 'auto'}}>
        <Paper elevation={3}>
        <h2>Checkout</h2>
        <Grid container spacing={2} sx={{textAlign: 'left'}}>
            <Grid container item xs={8} spacing={1}>
                <Grid item>
                    <Delivery />
                </Grid>
                <Grid item>
                    <PaymentMethod 
                        cardList={cardList} 
                        updateCardList={updateCardList}
                        />
                </Grid>
            </Grid>
            <Grid item xs={4}>
                <Box sx={{marginRight:'20px', border: 1, borderColor: 'lightgray', p:2, borderRadius: 1}}>
                    <h3>Total</h3>
                    <div>
                        <h4>Tickets</h4>
                        <div>
                            Tickets: ${show.ticketCost} x {numTickets}
                            <div>${show.ticketCost * numTickets}</div>
                        </div>
                        <h4>Notes From Seller</h4>
                        <div>
                            {ticketmasterData.sellerNotes}
                        </div>
                        <h4>Fees</h4>
                        <div>
                            Service Fee: ${ticketmasterData.serviceFee} x {numTickets}  
                            <div>${ticketmasterData.serviceFee * numTickets}</div>
                        </div>
                        <p>Order Processing Fee: ${ticketmasterData.orderProcessingFee}</p>
                        <h4>Delivery</h4>
                        <p>Mobile Entry: {ticketmasterData.mobileEntryFee}</p>
                    </div>
                    <div>Cancel Order</div>
                    <div>
                        <b>*All Sales Final - No Refunds</b>
                    </div>
                    <div>
                        <label> 
                            <input type="checkbox" />
                            I have read and agree to the current Terms of Use.
                            </label>
                        <button type="submit">Place Order</button>
                    </div>
                </Box>
            </Grid>
        </Grid>
        </Paper>
        </Box>
    )
}