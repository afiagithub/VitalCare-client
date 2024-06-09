import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { TbError404 } from "react-icons/tb";

const ErrorPage = () => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col justify-center items-center text-center my-10 mx-3">
            <Helmet>
                <title>StudyCircle | 404 Page</title>
            </Helmet>
            <p className="text-7xl text-red-700 border-2 border-red-700 p-4 rounded-lg"><TbError404 /></p>
            <h1 className="text-3xl font-bold font-rale mt-8 mb-2 uppercase"><span className="text-red-800">404</span>: Page not found</h1>
            <p className="font-semibold text-xl text-red-700">Sorry we couldn't find the page you're looking for</p>
            <a onClick={() => navigate('/')}
                className="relative my-10 px-5 py-3 overflow-hidden font-medium text-red-700 
        bg-transparent border-2 border-red-700 rounded-lg shadow-inner group cursor-pointer">
                <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-red-700 group-hover:w-full ease"></span>
                <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-red-700 group-hover:w-full ease"></span>
                <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-red-700 group-hover:h-full ease"></span>
                <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-red-700 group-hover:h-full ease"></span>
                <span className="absolute inset-0 w-full h-full duration-300 delay-300 bg-red-700 opacity-0 group-hover:opacity-100"></span>
                <span className="relative transition-colors duration-300 delay-200 group-hover:text-white ease font-rale font-bold">To HomePage</span>
            </a>
        </div>
    );
};

export default ErrorPage;