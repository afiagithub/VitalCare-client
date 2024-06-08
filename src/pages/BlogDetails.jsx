import { useParams } from "react-router-dom";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../components/shared/LoadingSpinner";
import { Helmet } from "react-helmet-async";


const BlogDetails = () => {
    const {id} = useParams();
    console.log(id);
    const axiosPublic = useAxiosPublic();
    const { data: blog = {}, isLoading } = useQuery({
        queryKey: ['blog', id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/blogs/${id}`)
            return res.data;
        },
        refetchOnWindowFocus: false,
    })
    if(isLoading){
        return <LoadingSpinner></LoadingSpinner>
    }
    return (
        <div className="max-w-3xl mx-auto my-5">
            <Helmet>
                <title>VitalCare | Blog Details</title>
            </Helmet>
            <img className="object-cover w-full h-64" src={blog.image} alt="Article" />
                <div className="p-6">
                    <div>
                        <span className="text-sm font-bold text-blue-700 uppercase">
                            {blog.category}</span>
                        <h4 className="block mt-2 text-xl font-semibold text-gray-800">{blog.title}</h4>
                        <p className="mt-2 text-gray-600">
                            {blog.description}</p>
                    </div>

                    <div className="mt-4">
                        <div className="flex items-center">
                            <div className="flex items-center">
                                <a href="#" 
                                className="mx-2 font-semibold text-gray-700">{blog.name}</a>
                            </div>
                            <span className="mx-1 text-sm text-gray-600">Date: {blog.date}</span>
                        </div>
                    </div>
                </div>
        </div>
    );
};

export default BlogDetails;