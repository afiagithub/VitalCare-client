import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { LiaFacebookF } from "react-icons/lia";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { toast } from "react-toastify";
import useAxiosPublic from "../hooks/useAxiosPublic";

const SocialLogin = () => {
    const { googleLogin, githubLogin, facebookLogin } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state || '/';
    const axiosPublic = useAxiosPublic()

    const handleSocialLogin = (socialProvider) => {
        socialProvider()
            .then(async (result) => {
                if (result.user) {
                    navigate(`${from}`)
                    toast.success("Successfully Logged In")
                    
                    const userInfo = {
                        name: result.user.displayName,
                        email: result.user.email,
                        user_id: result.user.uid,
                        photo: result.user.photoURL,
                        bloodType: '',
                        dist: '',
                        upazila: '',
                        status: 'active'

                    }
                    const res = await axiosPublic.post("/users", userInfo);
                    console.log(res);
                    if (res.data.insertedId) {
                        console.log({ message: 'success' });
                    }
                }
            });
    }

    return (
        <div>
            <div className="mt-5 flex flex-row items-center gap-4">
                <hr className="flex-grow" />
                <p className="text-primary">Or Sign In Using</p>
                <hr className="flex-grow" />
            </div>
            <div className="mt-5 flex flex-row items-center justify-center gap-5 ">
                <button onClick={() => handleSocialLogin(googleLogin)} className="py-3">
                    <FcGoogle className="text-2xl" />
                </button>
                <button onClick={() => handleSocialLogin(githubLogin)} className="py-3">
                    <FaGithub className="text-2xl" />
                </button>
                <button onClick={() => handleSocialLogin(facebookLogin)} className="py-3">
                    <LiaFacebookF className="text-2xl" />
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;