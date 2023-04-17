import { useState } from "react";

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

    const cardTypes = ["Visa", "MasterCard", "American Express", "Discover"];

    return(
        <div>
            <form onSubmit={handleSubmitPaymentInfo}>
                <label>Type</label>
                <select name="cardType" onChange={(e) => setType(e.target.value)}>
                    {
                        cardTypes.map((c, idx) => {
                            return <option key={idx} value={c}>{c}</option>
                        })
                    }
                </select>
                <label>Card Number</label>
                <input type="number" onChange={(e) => setCardNumber(e.target.value)}/>
                <label>Name on Card</label>
                <input type="text" onChange={(e) => setName(e.target.value)}/>
                <label>Expiration Date</label>
                <input type="text" onChange={(e) => setExpirationDate(e.target.value)}/>
                <label>Security Code</label>
                <input type="number" onChange={(e) => setSecurityCode(e.target.value)}/>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}