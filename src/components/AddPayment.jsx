import { useState } from "react";
import { FormControl, InputLabel } from '@mui/material';

export default function AddPayment({onNewPayment}) {
    const [cardNumber, setCardNumber] = useState(0);
    const [name, setName] = useState("");
    const [expirationDate, setExpirationDate] = useState("");
    const [securityCode, setSecurityCode] = useState(0);
    const [type, setType] = useState("");

    function handleSubmitPaymentInfo(e) {
        e.preventDefault();
        const paymentInfo =  {
            nameOnCard: name,
            expirationDate: expirationDate,
            cardNumber: cardNumber,
            securityCode: securityCode,
            type: type,
            lastFour: 1234
        }
        //console.log(paymentInfo)
        onNewPayment(paymentInfo);
    }

    const cardTypes = ["", "Visa", "MasterCard", "American Express", "Discover"];

    return(
        <div>
        
        
            <form onSubmit={handleSubmitPaymentInfo}>
                <div>
                    <label>Type</label>
                    <select name="cardType" onChange={(e) => setType(e.target.value)}>
                        {
                            cardTypes.map((c, idx) => {
                                return <option key={idx} value={c}>{c}</option>
                            })
                        }
                    </select>
                </div>
                <div>
                    <label>Card Number</label>
                    <input type="number" onChange={(e) => setCardNumber(e.target.value)}/>
                </div>
                <div>
                    <label>Name on Card</label>
                    <input type="text" onChange={(e) => setName(e.target.value)}/>
                </div>
                <div>
                    <label>Expiration Date</label>
                    <input type="text" onChange={(e) => setExpirationDate(e.target.value)}/>
                </div>
                <div>
                    <label>Security Code</label>
                    <input type="text" maxLength="3" onChange={(e) => setSecurityCode(e.target.value)}/>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}