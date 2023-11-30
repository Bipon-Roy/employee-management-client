// import Swiper core and required modules
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { BiSolidQuoteAltLeft } from "react-icons/bi";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const Testimonials = () => {
    return (
        <div className=" mt-8">
            <div className="my-5 space-y-2 ">
                <h1 className="text-center font-semibold text-2xl md:text-4xl ">
                    What Our{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">
                        Clients Says
                    </span>
                </h1>
                <p className="text-xs md:text-base w-2/3 md:w-[600px] text-center mx-auto">
                    Discover what our satisfied guests have to say about their experiences with our
                    platform. Read their testimonials to get a glimpse of the memorable journeys
                    they&apos;ve had.
                </p>
            </div>
            <Swiper
                pagination={{
                    clickable: true,
                }}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                modules={[Pagination, Autoplay]}
                className="mySwiper bg-mainBg"
            >
                <SwiperSlide>
                    <div className="rounded">
                        <div className="w-1/2 mx-auto py-8">
                            <div className="avatar flex justify-center items-center gap-5">
                                <div className="w-24 rounded-full">
                                    <img src="https://i.ibb.co/SxB8wdD/people-2.jpg" />
                                </div>
                                <p className="font-bold text-mainText">John Doe</p>
                            </div>
                            <div className="">
                                <BiSolidQuoteAltLeft className="text-secondary text-2xl" />
                                <p className="text-sm md:text-base text-center font-medium text-mainText">
                                    Exceptional service! Our HR processes have never been smoother.
                                    The platform&apos;s intuitive design and powerful features have
                                    significantly improved our employee management efficiency.
                                </p>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="rounded">
                        <div className="w-1/2 mx-auto py-8">
                            <div className="avatar flex justify-center items-center gap-5">
                                <div className="w-24 rounded-full">
                                    <img src="https://i.ibb.co/6tQFTz3/1-2.jpg" />
                                </div>
                                <p className="font-bold text-mainText">Emily Daviske</p>
                            </div>
                            <div className="">
                                <BiSolidQuoteAltLeft className="text-secondary text-2xl" />
                                <p className="text-center text-sm md:text-base text-mainText font-medium">
                                    Choosing this service was a game-changer for us. The team&apos;s
                                    professionalism and the platform&apos;s user-friendly interface
                                    have made managing our workforce a breeze. Highly recommended!
                                </p>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="rounded">
                        <div className="w-1/2 mx-auto py-8">
                            <div className="avatar flex justify-center items-center gap-5">
                                <div className="w-24 rounded-full">
                                    <img src="https://i.ibb.co/Tv0gDsT/1-4.jpg" />
                                </div>
                                <p className="font-bold text-mainText">Michael Johnson</p>
                            </div>
                            <div className="">
                                <BiSolidQuoteAltLeft className="text-secondary text-2xl" />
                                <p className="text-center text-sm md:text-base text-mainText font-medium">
                                    We&apos;ve seen a remarkable transformation in our employee
                                    management since implementing this service. The customization
                                    options and reliable support make it a valuable asset for any
                                    business.
                                </p>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="rounded">
                        <div className="w-1/2 mx-auto py-8">
                            <div className="avatar flex justify-center items-center gap-5">
                                <div className="w-24 rounded-full">
                                    <img src="https://i.ibb.co/W2v9TJ4/1-1.jpg" />
                                </div>
                                <p className="font-bold text-mainText">Emily Davis</p>
                            </div>
                            <div className="">
                                <BiSolidQuoteAltLeft className="text-secondary text-2xl" />
                                <p className="text-center text-sm md:text-base text-mainText font-medium">
                                    Our experience has been nothing short of fantastic. The platform
                                    offers a perfect blend of simplicity and functionality. It has
                                    become an integral part of our daily operations, streamlining
                                    our employee management processes.
                                </p>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Testimonials;
