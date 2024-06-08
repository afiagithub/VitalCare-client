import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import LoadingSpinner from "../shared/LoadingSpinner";
import { Helmet } from "react-helmet-async";

const UserTestReport = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth()
    const { data: reports = [], isLoading } = useQuery({
        queryKey: ['reports', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/report/${user.email}`)
            return res.data
        }
    })

    const handleDownload = (reportUrl) => {
        if (reportUrl) {
            const link = document.createElement('a');
            link.href = reportUrl;
            link.download = reportUrl.split('/').pop();
            link.target = '_blank';
            document.body.appendChild(link);
            link.click();
        } else {
            console.error('No report URL available to download');
        }
    }

    if (isLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }
    return (
        <div className="z-0 mt-10 px-10 md:px-0">
            <Helmet>
                <title>VitalCare | Test Results</title>
            </Helmet>
            <h1 className="text-4xl font-bold font-ubuntu text-center mb-10">Test Results</h1>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Test</th>
                            <th>Date</th>
                            <th>Download Report</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            reports.map(appoint => <tr key={appoint._id}>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div>
                                            <div className="font-bold">{appoint.test_title}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>{appoint.date}</td>
                                <th>
                                    <button onClick={() => handleDownload(appoint.report)} className="btn col-span-2 bg-[#47CCC8] text-white border-2 border-[#47CCC8] 
                    hover:border-[#47CCC8] hover:bg-transparent hover:text-[#47CCC8] text-lg">Download</button>
                                </th>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserTestReport;