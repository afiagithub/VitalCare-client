import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useLoaderData } from "react-router-dom";
import moment from 'moment';
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from 'sweetalert2'

const UpdateTest = () => {
    const testData = useLoaderData();
    const { _id, image, date: testDate, slots, cost, title, short_description } = testData;
    const [startDate, setStartDate] = useState(new Date());
    const axiosPublic = useAxiosPublic();

    const handleUpdate = (e) => {
        e.preventDefault();
        const form = e.target;
        const testTitle = form.title.value;
        const testSlots = form.slots.value;
        const testCost = form.cost.value;
        const testImage = form.image.value;
        const short_desc = form.short_desc.value;

        const updateTest = {
            image: testImage,
            date: moment(startDate).format('YYYY-MM-DD'),
            slots: testSlots,
            cost: testCost,
            title: testTitle,
            short_description: short_desc
        }
        console.log(updateTest);

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, update the test!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosPublic.patch(`/tests/${_id}`, updateTest);
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        title: "Updated!",
                        text: "Test data has been updated.",
                        icon: "success"
                    });
                }

            }
        });

    }
    return (
        <section className="">
            <div className="flex flex-col lg:flex-row justify-center min-h-screen">
                <div className=" block lg:w-2/5">
                    <img className="h-32 lg:h-full w-full object-cover" src="https://i.ibb.co/2s1ZKNd/test.jpg" alt="" />
                </div>

                <div className="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
                    <div className="w-full">
                        <h1 className="text-2xl font-semibold font-ubuntu tracking-wider text-gray-800 capitalize ">
                            Update Diagnostic Test
                        </h1>
                        <p className="mt-4 text-gray-500 dark:text-gray-400">
                            Update test details, including dates, slots, and descriptions,
                            to reflect the latest offerings and ensure seamless patient experience.
                        </p>

                        <form onSubmit={handleUpdate} className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2">
                            <div>
                                <label className="block mb-2 text-sm text-gray-600 ">Title</label>
                                <input name="title" type="text" defaultValue={title}
                                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 
                                bg-white border border-gray-200 rounded-lg" />
                            </div>

                            <div>
                                <label className="block mb-2 text-sm text-gray-600 ">Date</label>
                                <DatePicker name="updatedDate"
                                    className='block w-full px-5 py-3 text-gray-700 placeholder-gray-400 
                                bg-white border border-gray-200 rounded-lg'
                                    selected={testDate} onChange={(date) => setStartDate(date)} />
                            </div>

                            <div>
                                <label className="block mb-2 text-sm text-gray-600 ">Slots</label>
                                <input name="slots" type="number" defaultValue={slots}
                                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 
                                bg-white border border-gray-200 rounded-lg" />
                            </div>

                            <div>
                                <label className="block mb-2 text-sm text-gray-600 ">Test Cost</label>
                                <input name="cost" type="number" defaultValue={cost}
                                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 
                                bg-white border border-gray-200 rounded-lg" />
                            </div>

                            <div className="col-span-2">
                                <label className="block mb-2 text-sm text-gray-600 ">Photo URL</label>
                                <input name="image" defaultValue={image} type="url"
                                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 
                                bg-white border border-gray-200 rounded-lg " />
                            </div>

                            <div className="col-span-2">
                                <label className="block mb-2 text-sm text-gray-600 ">Short Description</label>
                                <textarea name="short_desc" rows={5} defaultValue={short_description}
                                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 
                                    bg-white border border-gray-200 rounded-lg"></textarea>
                            </div>
                            <button className="btn col-span-2 bg-[#47CCC8] text-white border-2 border-[#47CCC8] 
                    hover:border-[#47CCC8] hover:bg-transparent hover:text-[#47CCC8] text-lg">Update Test Data</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UpdateTest;