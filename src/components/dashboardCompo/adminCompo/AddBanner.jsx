import "react-datepicker/dist/react-datepicker.css";
import Swal from 'sweetalert2'
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";

const AddBanner = () => {
    const axiosSecure = useAxiosSecure();

    const handleAdd = async (e) => {
        e.preventDefault();
        const form = e.target;
        const heading = form.heading.value;
        const coupon_code_name = form.coupon_code.value;
        const coupon_rate = form.rate.value;
        const image = form.image.value;
        const short_desc = form.short_desc.value;

        const newBannerData = {
            image,
            heading,
            coupon_code_name,
            coupon_rate,
            short_description: short_desc,
            isActive: false
        }
        console.log(newBannerData);

        const res = await axiosSecure.post('/banners', newBannerData);
        if (res.data.insertedId) {
            Swal.fire({
                title: "Successful",
                text: "Added New Banner",
                icon: "success"
            });
        }

    }
    return (
        <section className="">
            <Helmet>
                <title>VitalCare | Add Banner</title>
            </Helmet>
            <div className="flex flex-col lg:flex-row justify-center min-h-screen">
                <div className="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
                    <div className="w-full">
                        <h1 className="text-2xl font-semibold font-ubuntu tracking-wider text-gray-800 capitalize ">
                            Add a Banner
                        </h1>
                        <p className="mt-4 text-gray-500 dark:text-gray-400">
                        Easily create and manage promotional banners to highlight special offers, 
                        new services, and important updates. Customize each banner with a captivating 
                        heading, engaging description, relevant image, and discount details to attract 
                        and inform your patients.
                        </p>

                        <form onSubmit={handleAdd} className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2">
                            <div>
                                <label className="block mb-2 text-sm text-gray-600 ">Heading</label>
                                <input name="heading" type="text" placeholder="Enter Banner Heading"
                                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 
                                bg-white border border-gray-200 rounded-lg" />
                            </div>

                            <div>
                                <label className="block mb-2 text-sm text-gray-600 ">Image URL</label>
                                <input name="image" placeholder="Enter image URL" type="url"
                                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 
                                bg-white border border-gray-200 rounded-lg " />
                            </div>

                            <div>
                                <label className="block mb-2 text-sm text-gray-600 ">Coupon Code Name</label>
                                <input name="coupon_code" type="text" placeholder="Enter Coupon Code Name"
                                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 
                                bg-white border border-gray-200 rounded-lg" />
                            </div>

                            <div>
                                <label className="block mb-2 text-sm text-gray-600 ">Coupon Rate</label>
                                <input name="rate" type="number" placeholder="Enter Coupon Rate"
                                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 
                                bg-white border border-gray-200 rounded-lg" />
                            </div>                           

                            <div className="col-span-2">
                                <label className="block mb-2 text-sm text-gray-600 ">Short Description</label>
                                <textarea name="short_desc" rows={5} placeholder="Enter a short description"
                                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 
                                    bg-white border border-gray-200 rounded-lg"></textarea>
                            </div>
                            <button className="btn col-span-2 bg-[#47CCC8] text-white border-2 border-[#47CCC8] 
                    hover:border-[#47CCC8] hover:bg-transparent hover:text-[#47CCC8] text-lg">
                        Add Banner Data</button>
                        </form>
                    </div>
                </div>

                <div className="md:-ml-5 block lg:w-2/5">
                    <img className="h-32 lg:h-full w-full object-cover" 
                    src="https://i.ibb.co/2s1ZKNd/test.jpg" alt="" />
                </div>
            </div>
        </section>
    );
};

export default AddBanner;