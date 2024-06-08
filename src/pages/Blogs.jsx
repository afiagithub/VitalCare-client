import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { Link } from "react-router-dom";
import LoadingSpinner from "../components/shared/LoadingSpinner";
import { Helmet } from "react-helmet-async";

const Blogs = () => {
    const axiosPublic = useAxiosPublic();
    const { data: blogs = [], isLoading } = useQuery({
        queryKey: ['blogs'],
        queryFn: async () => {
            const res = await axiosPublic.get('/blogs')
            return res.data;
        },
        refetchOnWindowFocus: false,
    })
    if(isLoading){
        return <LoadingSpinner></LoadingSpinner>
    }
    return (
        <div className="py-6 sm:py-12">
            <Helmet>
                <title>VitalCare | Blogs</title>
            </Helmet>
            <h1 className="font-ubuntu text-4xl font-bold text-center mb-5">
            Health Insights and Expert Advice</h1>
            <p className="w-4/5 lg:w-3/5 mx-auto text-center mb-5 md:mb-8 lg:mb-10">
            Welcome to our blog! Here, you’ll find the latest insights, expert advice, 
            and helpful tips on a wide range of health topics. Whether you're looking for advice on managing 
            chronic conditions, improving your wellness routine, or staying informed about the latest medical 
            advancements, we've got you covered.</p>

            <div className="container p-6 mx-auto space-y-8">
                <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
                    {
                        blogs.map(blog => <Link to={`/blog/${blog._id}`} key={blog._id} className="flex flex-col dark:bg-gray-50">
                            <a rel="noopener noreferrer" href="#" aria-label="Te nulla oportere reprimique his dolorum">
                                <img alt="" className="object-cover w-full h-52 dark:bg-gray-500" 
                                src={blog.image} />
                            </a>
                            <div className="flex flex-col flex-1 p-6">
                                <a href="#" className="text-xs font-bold tracking-wider uppercase hover:underline 
                                dark:text-blue-700">{blog.category}</a>
                                <h3 className="flex-1 py-2 text-lg font-semibold leading-snug">
                                    {blog.title}</h3>
                                <div className="flex flex-wrap justify-between pt-3 space-x-2 text-xs dark:text-gray-600">
                                    <span>Date: {blog.date}</span>
                                    <span>{blog.views/ 100}K views</span>
                                </div>
                            </div>
                        </Link>)
                    }
                </div>
            </div>
        </div>
    );
};

export default Blogs;