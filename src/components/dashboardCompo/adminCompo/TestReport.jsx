import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../shared/LoadingSpinner";
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Swal from 'sweetalert2'
import { Helmet } from "react-helmet-async";

const TestReport = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const { data: reserves = {}, isLoading } = useQuery({
        queryKey: ['reserves'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/reserve-report/${id}`)
            return res.data
        }
    })

    const handleReport = async (e) => {
        e.preventDefault();
        const reportUrl = e.target.report.value;
        if (reportUrl) {
            const reportData = {
                patient_name: reserves?.name,
                patient_email: reserves?.email,
                reserve_id: reserves._id,
                test_id: reserves.test_id,
                test_title: reserves.title,
                pay_id: reserves.transactionId,
                date: reserves.date,
                report: reportUrl,
            }
            console.log(reportData);
            const res = await axiosSecure.post('/report', reportData);
            if (res.data.insertedId) {
                const res = await axiosSecure.patch(`/deliver-test/${reserves._id}`)
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        title: "Successful",
                        text: "Submitted Report",
                        icon: "success"
                    });
                }
            }
        }
        else {
            return toast.error("Please Provide the test report URL");
        }
    }

    if (isLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }
    return (
        <section className="">
            <Helmet>
                <title>VitalCare | Test Report</title>
            </Helmet>
            <div className="flex flex-col lg:flex-row justify-center min-h-screen">
                <div className="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
                    <div className="w-full">
                        <h1 className="text-2xl font-semibold font-ubuntu tracking-wider text-gray-800 capitalize ">
                            Submit Test Report
                        </h1>

                        <form onSubmit={handleReport} className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2">
                            <div>
                                <label className="block mb-2 text-sm text-gray-600">Patient Name</label>
                                <input name="name" type="text" disabled defaultValue={reserves?.name}
                                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 
                                bg-white border border-gray-200 rounded-lg" />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm text-gray-600 ">Test Title</label>
                                <input name="title" type="text" disabled defaultValue={reserves.title}
                                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 
                                bg-white border border-gray-200 rounded-lg" />
                            </div>

                            <div>
                                <label className="block mb-2 text-sm text-gray-600 ">Date</label>
                                <input name="date" type="text" disabled defaultValue={reserves.date}
                                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 
                                bg-white border border-gray-200 rounded-lg" />
                            </div>

                            <div>
                                <label className="block mb-2 text-sm text-gray-600 ">Time</label>
                                <input name="time" type="text" disabled defaultValue={reserves.time}
                                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 
                                bg-white border border-gray-200 rounded-lg" />
                            </div>

                            <div className="col-span-2">
                                <label className="block mb-2 text-sm text-gray-600 ">Report URL</label>
                                <input name="report" type="url" placeholder="Enter Test Report URL"
                                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 
                                bg-white border border-gray-200 rounded-lg " />
                            </div>
                            <button className="btn col-span-2 bg-[#47CCC8] text-white border-2 border-[#47CCC8] 
                    hover:border-[#47CCC8] hover:bg-transparent hover:text-[#47CCC8] text-lg">Submit Report</button>
                        </form>
                    </div>
                </div>

                <div className="md:-ml-5 block lg:w-2/5">
                    <img className="h-32 lg:h-full w-full object-cover" src="https://i.ibb.co/2s1ZKNd/test.jpg" alt="" />
                </div>
            </div>
        </section>
    );
};

export default TestReport;