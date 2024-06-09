

const PromotionSection = () => {
    return (
        <section className="p-4 lg:p-8">
            <h1 className="font-ubuntu text-4xl font-bold text-center mt-5 md:mt-8 lg:mt-10 mb-5">Promotional Event</h1>
            <p className="w-4/5 lg:w-3/5 mx-auto text-center mb-5 md:mb-8 lg:mb-10">
                Promoting various health related events throughout the year to
                reach more people, provide medical care and raise awareness among public</p>
            <div className="container mx-auto space-y-12">
                <div className="flex flex-col overflow-hidden rounded-md shadow-sm md:flex-row">
                    <img src="https://i.ibb.co/J2qjJr8/summer.jpg" alt="" 
                    className="h-80 md:h-96 lg:h-80 dark:bg-gray-500 aspect-video w-full md:w-1/2" />
                    <div className="flex flex-col justify-center flex-1 p-6 dark:bg-gray-50">
                        <span className="text-xs uppercase dark:text-gray-600">June 1, 2024 - August 31, 2024</span>
                        <h3 className="text-3xl font-bold">Summer Health Check-Up Special</h3>
                        <p className="my-6 dark:text-gray-600">Stay healthy and active this summer
                            with our comprehensive health check-up package at a discounted rate.
                            Includes full-body screening, blood tests, and personalized health report</p>
                        <p className="my-6 dark:text-gray-600">
                            <span className="font-bold text-blue-700">Price: $10</span> (Regular Price: $200)</p>
                    </div>
                </div>
                <div className="flex flex-col overflow-hidden rounded-md shadow-sm md:flex-row lg:flex-row-reverse">
                    <img src="https://i.ibb.co/N1d6ngp/woman-health.jpg" 
                    className="h-80 md:h-96 lg:h-80 dark:bg-gray-500 aspect-video object-cover w-full md:w-1/2" />
                    <div className="flex flex-col justify-center flex-1 p-6 dark:bg-gray-50">
                        <span className="text-xs uppercase dark:text-gray-600">October 1, 2024 - October 31, 2024</span>
                        <h3 className="text-3xl font-bold">Women's Health Awareness Month</h3>
                        <p className="my-6 dark:text-gray-600">
                            Celebrate Women's Health Awareness Month with a special discount on
                            all women's health screenings and tests. Includes mammograms,
                            pap smears, and bone density tests.
                        </p>
                        <p className="my-6 dark:text-gray-600">
                            <span className="font-bold text-blue-700">Price: $20 </span>(Regular Price: $225)</p>
                    </div>
                </div>
                <div className="flex flex-col overflow-hidden rounded-md shadow-sm md:flex-row">
                    <img src="https://i.ibb.co/YNhz7Dh/diabetes.jpg" alt="" 
                    className="h-80 md:h-96 lg:h-80 dark:bg-gray-500 aspect-video w-full md:w-1/2" />
                    <div className="flex flex-col justify-center flex-1 p-6 dark:bg-gray-50">
                        <span className="text-xs uppercase dark:text-gray-600">March 1, 2024 - March 31, 2024</span>
                        <h3 className="text-3xl font-bold">Diabetes Awareness Campaign</h3>
                        <p className="my-6 dark:text-gray-600">
                            Join our Diabetes Awareness Campaign and get a discount on diabetes management and testing services.
                            Includes HbA1c test, fasting blood sugar test, and diet consultation.
                        </p>
                        <p className="my-6 dark:text-gray-600">
                            <span className="font-bold text-blue-700">Price: Free </span>(Regular Price: $110)</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PromotionSection;