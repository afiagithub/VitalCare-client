import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useBlocked from "../hooks/useBlocked";

const BlockedRoute = ({children}) => {
    const {user, loading} = useAuth();
    const [isBlocked, isUserLoading] = useBlocked();
    const location = useLocation();
    if (loading || isUserLoading) {
        return <div className="text-center flex flex-col items-center justify-center h-[100vh]">
            <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
    }
    if (user && !isBlocked) {
        return <div>
            {children}
        </div>
    }
    return <Navigate to="/" state={location?.pathname || '/'} />
};

export default BlockedRoute;