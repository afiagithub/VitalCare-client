import { useLoaderData } from "react-router-dom";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from "@stripe/react-stripe-js";
import BookingForm from "../components/BookingForm";
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const TestDetail = () => {
    const testData = useLoaderData();
    const { _id, image, date, time, slots, cost, title, short_description } = testData;

    const stripePromise = loadStripe(import.meta.env.VITE_PAY_PUBLISH_KEY);

    const handleBooking = () => {        
        if(slots > 0){
            document.getElementById('my_modal_1').showModal()
        }
        else{
            return toast.error("Sorry! this test has no slot left");
        }
    }
    return (
        <div className="p-5 mx-auto sm:p-10 md:p-16 dark:bg-gray-100 dark:text-gray-800">
            <div className="flex flex-col max-w-3xl mx-auto overflow-hidden rounded">
                <img src={image} alt="" className="w-full h-60 sm:h-96 dark:bg-gray-500" />
                <div className="p-6 pb-12 m-4 mx-auto -mt-16 space-y-6 lg:max-w-2xl sm:px-10 sm:mx-12 lg:rounded-md dark:bg-gray-50">
                    <div className="space-y-2">
                        <a href="#" className="inline-block text-2xl font-semibold sm:text-3xl">{title}</a>
                        <p className="text-lg font-bold">Conducted By: Doctor Jane</p>
                    </div>
                    <div className="dark:text-gray-800">
                        <p>{short_description}</p>
                    </div>
                    <div className="text-lg font-bold">
                        <p>Date: <span className="text-[#20B2AA]">{date}</span></p>
                        <p>Time: <span className="text-[#20B2AA]">{time}</span></p>
                        <p>Slot Left: <span className="text-[#20B2AA]">{slots}</span></p>
                        <p>Cost: <span className="text-[#20B2AA]">${cost}</span></p>
                    </div>
                    <button onClick={handleBooking}
                    className="btn bg-[#2D3663] text-white border-2 border-[#2D3663] 
                    hover:border-[#2D3663] hover:bg-transparent hover:text-[#2D3663]">Book Now</button>
                    <dialog id="my_modal_1" className="modal">
                        <div className="modal-box">
                            <Elements stripe={stripePromise}>
                                <BookingForm testData={testData}/>
                            </Elements>
                            <div className="modal-action">
                                <form method="dialog">
                                    {/* if there is a button in form, it will close the modal */}
                                    <button className="btn">Close</button>
                                </form>
                            </div>
                        </div>
                    </dialog>
                </div>
            </div>
        </div>
    );
};

export default TestDetail;