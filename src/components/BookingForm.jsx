import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useAxiosSecure from "../hooks/useAxiosSecure"
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";

const BookingForm = ({ testData }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState([])
    const [transId, setTransId] = useState('')
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();
    const price = testData.cost;
    const navigate = useNavigate()

    useEffect(() => {
        if (price > 0) {
            axiosSecure.post('create-payment-intent', { price })
                .then(res => {
                    console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret)
                })
        }
    }, [axiosSecure, price])

    const handleSubmit = async (event) => {
        let testPrice = parseInt(testData.cost);
        event.preventDefault();
        const promoCode = event.target.promo.value;
        if(promoCode){
            console.log(promoCode);
            if(promoCode === 'new24'){
                testPrice = testPrice - (testPrice * 0.1);                
            }
            else if(promoCode === 'firstPurchase'){
                testPrice = testPrice - (testPrice * 0.15);                
            }
        }

        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            setError(error.message)
            console.log('[error]', error);
        } else {
            setError('')
            console.log('[PaymentMethod]', paymentMethod);
        }

        const { paymentIntent, error: cardConfirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })

        if (cardConfirmError) {
            console.log('Payment Error');
        }
        else {
            console.log('Payment Intent', paymentIntent);
            if (paymentIntent.status === 'succeeded') {
                console.log('Transaction', paymentIntent.id);
                setTransId(paymentIntent.id)
                const booking = {
                    email: user?.email,
                    name: user?.displayName || 'anonymous',
                    price: testPrice,
                    transactionId: paymentIntent.id,
                    test_id: testData._id,
                    date: testData.date,
                    time: testData.time,
                    title: testData.title,
                    report: 'pending'
                }

                const res = await axiosSecure.post('/reserve', booking);
                if(res.data.insertedId){
                    const newSlots = parseInt(testData.slots);
                    const updatedSlots = newSlots - 1;
                    const updatedTest = {
                        slots: updatedSlots.toString()
                    };
                    await axiosPublic.patch(`/booked-test/${testData._id}`, updatedTest)
                    navigate('/dashboard/appointment')
                }
            }
        }
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-row justify-evenly items-center">
                    <div className="text-center text-white bg-[#2D3663] rounded-xl p-4">
                        <h3 className="text-2xl font-ubuntu">new24</h3>
                        <p className="font-semibold">10% Discount</p>
                    </div>
                    <div className="text-center text-white bg-[#2D3663] rounded-xl p-4">
                        <h3 className="text-2xl font-ubuntu">firstPurchase</h3>
                        <p className="font-semibold">15% Discount</p>
                    </div>
                </div>
            <div className="my-5">
                <label>Promocode: </label> <br />
                <input className="border-2 border-gray-300 p-3 rounded-xl" name="promo" 
                type="text" placeholder="Enter your promocode"/>
            </div>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button type="submit" disabled={!stripe || !clientSecret} className="btn btn-primary my-3">
                    Pay
                </button>
                <p>{error}</p>
                <p>{transId ? `${transId}` : 'No Payment Done'}</p>
            </form>
        </div>
    );
};

export default BookingForm;