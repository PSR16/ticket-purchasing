import { ticketmasterData } from "../data/ticketmasterData";
import { useState } from "react";
import AddPayment from "./AddPayment";
import { Grid, Box, Button, FormControlLabel, FormGroup, FormControl, RadioGroup, Radio } from "@mui/material";
import Paper from "@mui/material/Paper";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';

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
        <Box sx={{marginLeft:'20px', border: 1, borderColor: 'lightgray', p: 2, borderRadius: 1}}>
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
                    <Button onClick={handleAddPayment}>Add New Card</Button>
                </div>
            </div>
        </Box>
    )
}

function Info({card}) {
    return(
        <div key={card.id}>
            <div>{card.type} - {card.lastFour}</div>
            <div>{card.name} | exp. {card.expirationDate}</div>
            <div></div>
        </div>
    )
}

function Payment({cardList}) {
    return(
        <FormControl>
            <RadioGroup>
            {
                cardList.map((c) => {
                    return(
                        <FormControlLabel value={c.id} control={<Radio />} label={<Info card={c}/>} />
                    )
                })
            }
            </RadioGroup>
        </FormControl>
    )
}

export default function Checkout({numTickets, show}) {
    const [cardList, setCardList] = useState([]);

    const ticketsTotal = show.ticketCost * numTickets;
    const serviceFee = ticketmasterData.serviceFee * numTickets;
    const total = (ticketsTotal + ticketmasterData.orderProcessingFee + serviceFee).toFixed(2);

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
            <Grid container item xs={8} spacing={2}>
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
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography style={{textAlign: 'center'}}><b>${total}</b></Typography>    
                        </AccordionSummary>
                    <AccordionDetails>
                     <div>
                            <div>
                                <h4>Tickets</h4>
                                Tickets: ${show.ticketCost} x {numTickets}
                                <span style={{float:'right'}}>${ticketsTotal}</span>
                            </div>
                            <div>
                                <h4>Notes From Seller</h4>
                                {ticketmasterData.sellerNotes}
                            </div>
                            <div>
                                <h4>Fees</h4>
                                Service Fee: ${ticketmasterData.serviceFee} x {numTickets}
                                <span style={{float:'right'}}>${serviceFee}</span>
                                <span style={{float:'left'}}>Order Processing Fee: </span>
                                <span style={{float:'right'}}>${ticketmasterData.orderProcessingFee}</span>
                            </div>
                            <div>
                                <h4>Delivery</h4>
                                Mobile Entry
                                <span style={{float:'right'}}>{ticketmasterData.mobileEntryFee}</span>
                            </div>
                            <div style={{marginTop: '20px'}}>Cancel Order</div>
                        </div>
                        </AccordionDetails>
                    </Accordion>
                    <div style={{marginTop: '20px', marginBottom: '20px'}}>
                        <b>*All Sales Final - No Refunds</b>
                    </div>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox />} label="I have read and agree to the current Terms of Use." />
                    </FormGroup>
                    <Button onClick={() => { alert('Thank you for your order!'); }}
                            variant="contained"
                            style={{marginTop: '20px'}}>
                        Place Order
                        </Button>
                </Box>
            </Grid>
        </Grid>
        </Paper>
        </Box>
    )
}