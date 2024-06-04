import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useAxiosSecure from "../hooks/useAxiosSecure"
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";

const BookingForm = ({ testData }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState([])
    const [transId, setTransId] = useState('')
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const price = testData.cost;

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
        event.preventDefault();

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
                    price,
                    transactionId: paymentIntent.id,
                    test_id: testData._id,
                    date: testData.date,
                    time: testData.time,
                    title: testData.title,
                    report: 'pending'
                }

                const res = await axiosSecure.post('/reserve', booking);
                console.log(res.data);
            }
        }
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
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
                <button type="submit" disabled={!stripe || !clientSecret} className="btn btn-primary">
                    Pay
                </button>
                <p>{error}</p>
                <p>{transId ? `${transId}` : 'No Payment Done'}</p>
            </form>
        </div>
    );
};

export default BookingForm;