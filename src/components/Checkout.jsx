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
import AddIcon from '@mui/icons-material/Add';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const panelStylingLeft = {
    marginLeft:'20px', 
    border: 1, 
    borderColor: 'lightgray', 
    p: 2, borderRadius: 1
};

const panelStylingRight = {
    marginRight:'20px', 
    border: 1, 
    borderColor: 'lightgray', 
    p:2, 
    borderRadius: 1
};

function Delivery() {
    return(
        <Box sx={panelStylingLeft}>
            <h3>Delivery <CheckCircleOutlineIcon style={{color: 'lightgreen'}} /></h3>
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
    const [paymentSelected, setPaymentSelected] = useState(false);

    function handleAddPayment() {
        setAddNewPaymentInfo(true);
    }

    function handleNewPayment(paymentInfo) {
        updateCardList(paymentInfo);
        setAddNewPaymentInfo(false);
    }

    function handlePaymentSelected() {
        setPaymentSelected(true);
    }

    return (
        <Box sx={panelStylingLeft}>
            <h3>Payment {paymentSelected ? <CheckCircleOutlineIcon style={{color: 'lightgreen'}} /> : null }</h3>
            <h4>Use Credit / Debit Card</h4>
            <div>
                {
                    cardList.length > 0 ? <Payment cardList={cardList} onSelectPayment={handlePaymentSelected}/> : null
                }
                {
                    addNewPaymentInfo ? <AddPayment cardList={cardList} onNewPayment={handleNewPayment} /> : null
                }
                <div>
                <Button onClick={handleAddPayment}><AddIcon sx={{marginRight:'15px'}}/><CreditCardIcon sx={{marginRight:'25px'}} />Add New Card</Button>
                </div>
            </div>
            <hr />
            <div>
                <h4>Or Pay With</h4>
                <b>By using a digital wallet and continuing past this page, you have read and are accepting the Terms of Use</b>
            </div>
        </Box>
    )
}

function Info({card}) {
    return(
        <div key={card.id}>
            <div>{card.type} - {card.lastFour}</div>
            <div>{card.nameOnCard} | exp. {card.expirationDate}</div>
            <div></div>
        </div>
    )
}

function Payment({cardList, onSelectPayment}) {
    return(
        <FormControl>
            <RadioGroup>
            {
                cardList.map((c) => {
                    return(
                        <FormControlLabel key={c.id} value={c.id} control={<Radio onClick={onSelectPayment}/>} label={<Info card={c}/>} />
                    )
                })
            }
            </RadioGroup>
        </FormControl>
    )
}

export default function Checkout({numTickets, show}) {
    const [cardList, setCardList] = useState([]);
    const [canPlaceOrder, setCanPlaceOrder] = useState(false);

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
        <Paper elevation={3} style={{height: '800px'}}>
        <h2>Checkout</h2>
        <Grid container spacing={2} sx={{textAlign: 'left'}}>
            <Grid container item xs={8} spacing={2} direction="column">
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
                <Box sx={panelStylingRight}>
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
                        <FormControlLabel control={<Checkbox onClick={() => setCanPlaceOrder(true)} />} label="I have read and agree to the current Terms of Use." />
                    </FormGroup>
                    <Button 
                        disabled={!canPlaceOrder}
                        onClick={() => { alert(`Congratulations, you're going to see ${show.group} on ${show.date}!`); }}
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