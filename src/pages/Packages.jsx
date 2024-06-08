import { useLoaderData } from "react-router-dom";
import { TiTickOutline } from "react-icons/ti";
import { Helmet } from "react-helmet-async";

const Packages = () => {
    const packages = useLoaderData();
    return (
        <div>
            <Helmet>
                <title>VitalCare | Plans</title>
            </Helmet>
            <h1 className="font-ubuntu text-4xl font-bold text-center mt-5 md:mt-8 lg:mt-10 mb-5">
                Choose Your Health Care Plan</h1>
            <p className="w-4/5 lg:w-3/5 mx-auto text-center mb-5 md:mb-8 lg:mb-10">
                Discover our range of subscription packages designed to cater to your health and
                wellness needs. At VitalCare, we offer tailored packages that provide various
                levels of diagnostic services, regular health check-ups, personalized consultations, and more.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {
                    packages.map(pac => <div key={pac.id} className="hover:scale-105 transition-all duration-300 
                    border-2 border-transparent hover:border-[#47CCC8] rounded-lg">
                        <div className="flex flex-col items-center justify-center px-2 py-8 space-y-4 
                        bg-[#47CCC8]">
                            <p className="text-xl font-medium font-ubuntu">{pac.name}</p>
                            <p className="text-5xl font-bold">${pac.fee_per_month}
                                <span className="text-xl dark:text-gray-600">/mo</span>
                            </p>
                        </div>
                        <div className="flex flex-col items-center justify-center px-2 py-8 dark:bg-blue-50">
                            <ul className="space-y-2 h-64 flex-grow">
                                {
                                    pac.facilities.map(facility =>
                                        <li key={facility} className="flex space-x-2">
                                            <TiTickOutline className="text-blue-700" />
                                            <span>{facility}</span>
                                        </li>)
                                }
                            </ul>
                            <button className="btn bg-[#2D3663] text-white border-2 border-[#2D3663] 
                                hover:border-[#2D3663] hover:bg-transparent hover:text-[#2D3663] text-lg w-3/5">
                            Sign up</button>
                        </div>
                    </div>)
                }
            </div>
        </div>

    );
};

export default Packages;