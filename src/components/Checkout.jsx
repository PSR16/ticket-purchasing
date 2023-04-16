import { ticketmasterData } from "../data/ticketmasterData"
export default function Checkout({numTickets, show}) {

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
                    <input type="checkbox" />I have read and agree to the current Terms of Use.
                    <button type="submit">Place Order</button>
                </div>
            </div>
        </div>
    )
}