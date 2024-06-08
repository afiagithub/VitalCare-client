import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import SingleTestCard from "../components/SingleTestCard";
import LoadingSpinner from "../components/shared/LoadingSpinner";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import moment from 'moment';
import { Helmet } from "react-helmet-async";

const AllTests = () => {
    const axiosPublic = useAxiosPublic();
    const [startDate, setStartDate] = useState(new Date());
    const [allTests, setAllTests] = useState([]);
    const [currentPage, setCurrentPage] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(9);

    const today = new Date();
    const todayDate = moment(today).format('YYYY-MM-DD');

    const { data: tests = [], isLoading, refetch } = useQuery({
        queryKey: ['tests', currentPage, itemsPerPage],
        queryFn: async () => {
            const res = await axiosPublic.get(`/tests?date=${todayDate}&page=${currentPage}&size=${itemsPerPage}`)
            setAllTests(res.data);
        },
        refetchOnWindowFocus: false,
    })

    const { data: testCount = {}, isLoading: testLoading } = useQuery({
        queryKey: ['test-count'],
        queryFn: async () => {
            const res = await axiosPublic.get('/test-count')
            console.log(res.data);
            return res.data
        },
        refetchOnWindowFocus: false,
    })

    const { count } = testCount;
    const noOfPages = Math.ceil(count / itemsPerPage);
    const pages = [];
    for (let i = 0; i < noOfPages; i++) {
        pages.push(i)
    }

    const handleItemsPerPage = (e) => {
        const newPerPage = parseInt(e.target.value)
        setCurrentPage(0)
        setItemsPerPage(newPerPage)
        refetch()
    }

    const handlePrev = () => {
        if(currentPage > 0){
            setCurrentPage(currentPage - 1)
        }
    }

    const handleNext = () => {
        if(currentPage < pages.length - 1){
            setCurrentPage(currentPage + 1)
        }
    }

    const handleDate = async () => {
        const newDate = moment(startDate).format('YYYY-MM-DD')
        const res = await axiosPublic.get(`/filter-tests?date=${newDate}`)
        setAllTests(res.data)
    }

    if (isLoading || testLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }
    return (
        <div className="my-8 lg:my-12">
            <Helmet>
                <title>VitalCare | Tests</title>
            </Helmet>
            <h1 className="text-4xl font-bold font-ubuntu text-center mb-10">Explore Our Diagnostic Services</h1>
            <p className="w-4/5 lg:w-3/5 mx-auto text-center text-sm font-semibold mb-5 lg:mb-10">Examine our broad array of
                diagnostic tests available to address all your health concerns.
                Utilizing the latest technology and techniques, our diagnostic center ensures that
                you receive high-quality, accurate results promptly. Find the test you need today.</p>
            <div className="mx-auto w-2/5 text-center">
                <label className='text-lg font-semibold'>Filter By Date</label> <br />
                <div className="flex flex-row items-center gap-4 lg:w-1/2 mx-auto my-5">
                    <DatePicker className='border-2 w-32 rounded-md dark:border-gray-300 dark:bg-gray-50 p-3'
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
            <div className="mt-5 text-center flex flex-row gap-5 justify-center items-center">
                <button onClick={handlePrev} className="btn btn-outline">Prev</button>
                {
                    pages.map(page => <button
                    onClick={() => setCurrentPage(page)}
                        key={page}
                        className={currentPage === page? 'btn border-2 bg-[#47CCC8] text-white border-[#47CCC8]'
                        : 'btn border-2 border-[#47CCC8] bg-transparent text-[#47CCC8]'}>
                        {page + 1}
                    </button>)
                }
                <button onClick={handleNext} className="btn btn-outline">Next</button>
                <select value={itemsPerPage} onChange={handleItemsPerPage} className="border-2 p-3 rounded-xl border-black">
                    <option value="6">6</option>
                    <option value="9">9</option>
                    <option value="18">18</option>
                </select>
            </div>
        </div>
    );
};

export default AllTests;