import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import SingleTestCard from "../components/SingleTestCard";
import LoadingSpinner from "../components/shared/LoadingSpinner";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import moment from 'moment';

const AllTests = () => {
    const axiosPublic = useAxiosPublic();
    const [startDate, setStartDate] = useState(new Date());
    const [allTests, setAllTests] = useState([]);

    const today = new Date();
    const todayDate = moment(today).format('YYYY-MM-DD');

    const { data: tests = [], isLoading } = useQuery({
        queryKey: ['tests'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/tests?date=${todayDate}`)
            setAllTests(res.data);
        },
        refetchOnWindowFocus: false,
    })

    const handleDate = async () => {
        const newDate = moment(startDate).format('YYYY-MM-DD')
        console.log(newDate);
        const res = await axiosPublic.get(`/filter-tests?date=${newDate}`)
        setAllTests(res.data)
    }

    if (isLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }
    return (
        <div className="my-8 lg:my-12">
            <h1 className="text-4xl font-bold font-ubuntu text-center mb-10">Explore Our Diagnostic Services</h1>
            <p className="w-4/5 lg:w-3/5 mx-auto text-center text-sm font-semibold mb-5 lg:mb-10">Examine our broad array of
                diagnostic tests available to address all your health concerns.
                Utilizing the latest technology and techniques, our diagnostic center ensures that
                you receive high-quality, accurate results promptly. Find the test you need today.</p>
            <div className="mx-auto w-2/5 text-center">
                <label className='text-lg font-semibold'>Filter By Date</label> <br />
                <div className="flex flex-row items-center gap-4 lg:w-1/2 mx-auto">
                    <DatePicker className='border-2 w-32 rounded-md dark:border-gray-300 dark:bg-gray-50 p-3 mt-4 mb-8'
                        selected={startDate} onChange={(date) => setStartDate(date)} />
                    <button onClick={handleDate} className="btn bg-[#2D3663] text-white border-2 border-[#2D3663] 
                hover:border-[#2D3663] hover:bg-transparent hover:text-[#2D3663]">Filter</button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 place-items-center">
                {
                    allTests.map(test => <SingleTestCard key={test._id} test={test}></SingleTestCard>)
                }
            </div>
        </div>
    );
};

export default AllTests;