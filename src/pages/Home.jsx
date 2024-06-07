import Banner from "../components/Banner";
import FeaturedTests from "../components/FeaturedTests";
import PromotionSection from "../components/PromotionSection";
import Recommendation from "../components/Recommendation";


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <FeaturedTests></FeaturedTests>
            <PromotionSection></PromotionSection>
            <Recommendation></Recommendation>            
        </div>
    );
};

export default Home;