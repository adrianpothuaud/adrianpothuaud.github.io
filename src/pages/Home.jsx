import Hero from '../components/Hero';
import Services from '../components/Services';
import ExperienceTimeline from '../components/ExperienceTimeline';
import Testimonials from '../components/Testimonials';
import Blog from '../components/Blog';
import Contact from '../components/Contact';

const Home = () => {
    return (
        <>
            <div className="container">
                <Hero />
                <Services />
                <ExperienceTimeline />
            </div>
            <Testimonials />
            <div className="container">
                <Blog />
                <Contact />
            </div>
        </>
    );
};

export default Home;
