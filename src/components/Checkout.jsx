import { ticketmasterData } from "../data/ticketmasterData";
import { useState } from "react";
import AddPayment from "./AddPayment";

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

export default function Checkout({numTickets, show}) {
    const [cardList, setCardList] = useState([]);
    const [addNewPaymentInfo, setAddNewPaymentInfo] = useState(false);

    function handleAddPayment() {
        setAddNewPaymentInfo(true);
    }

    function handleNewPayment(paymentInfo) {
        let id = cardList.length + 1;
        
        setCardList((prev) => [
            ...prev,
            {
                ...paymentInfo,
                id: id
            }
        ]);
        setAddNewPaymentInfo(false);
    }

    return(
        <div>
            <h3>Checkout</h3>

            <div>
                <h4>Delivery</h4>
                <div>
                    Mobile Entry - Free
                </div>
                <div>
                    {ticketmasterData.mobileEntryText}
                </div>
            </div>

            <div>
                <h4>Payment</h4>
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
            </div>

            <div>
                <h4>Total</h4>
                <div>
                    <b>Tickets</b>
                    <p>Tickets: ${show.ticketCost} x {numTickets}</p>
                    <div>{show.ticketCost * numTickets}</div>
                    <b>Notes From Seller</b>
                    <p>${ticketmasterData.sellerNotes}</p>
                    <b>Fees</b>
                    <p>Service Fee: ${ticketmasterData.serviceFee} x {numTickets}</p>
                    <div>${ticketmasterData.serviceFee * numTickets}</div>
                    <p>Order Processing Fee: ${ticketmasterData.orderProcessingFee}</p>
                    <b>Delivery</b>
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
            </div>
        </div>
    )
}