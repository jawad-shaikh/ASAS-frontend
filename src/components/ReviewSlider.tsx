'use client'
import React, { useCallback, useRef } from 'react'
import Image from 'next/image'
// import required modules
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Navigation } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';


const ReviewSlider = () => {

    const sliderRef = useRef<any>(null);

    const handlePrevSlide = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current?.swiper?.slidePrev();
    }, []);

    const handleNextSlide = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current?.swiper.slideNext();
    }, []);

    return (
        <div className='relative flex flex-col gap-4 lg:gap-0 lg:flex-row items-center mt-12'>

            <div className="border-2 border-black rounded-[38px] relative w-[400px] h-[400px] flex-shrink-0">
                <Image src="/lp/review.png" height={500} width={400} alt="CTA Banner" quality={100} className="w-full h-full object-cover rounded-[38px]" />
                <div className="border-4 border-black rounded-[47px] bg-[#FF7B5E] absolute -right-2 -bottom-2 -z-10 h-full w-full" />
            </div>

            <div className='flex items-center gap-2 lg:absolute lg:top-0 lg:right-0'>
                <button onClick={handlePrevSlide}>
                    <svg width="49" height="49" viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="0.789062" y="0.794922" width="46.4935" height="46.4935" rx="16" fill="white" stroke="black" stroke-width="1.5" />
                        <path d="M20.5599 28.5405C22.705 30.17 24.8818 31.7609 27.0536 33.3482C27.4815 33.6609 27.9092 33.9735 28.3364 34.2862L28.3364 34.2863C29.0702 34.8233 30.0591 34.6998 30.5306 33.9348L30.5307 33.9347C30.7564 33.5682 30.7913 33.1571 30.6569 32.7751C30.5275 32.407 30.2536 32.0968 29.9111 31.8613L29.9111 31.8613C29.4023 31.5116 28.8933 31.1652 28.3854 30.8196C26.8502 29.7748 25.325 28.7369 23.8454 27.635L23.5468 28.036L23.8454 27.635C22.8458 26.8905 21.9094 26.0831 20.9462 25.2525C20.6509 24.9979 20.353 24.7411 20.05 24.4832C20.1161 24.4252 20.1787 24.3699 20.2407 24.3145C23.2404 21.6462 26.234 18.9713 29.2213 16.2899L29.2215 16.2897C29.6058 15.9443 29.9544 15.5625 30.2622 15.1498L30.2624 15.1495C30.4916 14.8417 30.569 14.4563 30.4543 14.1122C30.3345 13.7525 30.0134 13.4837 29.5863 13.469L29.5664 13.4684L29.5465 13.4693C29.1545 13.487 28.7785 13.6329 28.479 13.8858C28.0204 14.2609 27.574 14.6482 27.1341 15.03L27.1167 15.045C26.6684 15.4341 26.2265 15.8173 25.7741 16.1862C22.9742 18.458 20.1724 20.7276 17.3686 22.9951L17.3685 22.9951C16.9079 23.3678 16.5675 23.8278 16.5626 24.3822C16.5577 24.9351 16.8881 25.4029 17.339 25.7877C17.6795 26.0788 18.0222 26.3834 18.369 26.6915C19.0767 27.3204 19.8015 27.9645 20.5599 28.5405ZM20.5599 28.5405L20.8623 28.1424M20.5599 28.5405L20.8623 28.1424M20.8623 28.1424C23.0034 29.7687 25.1757 31.3564 27.3475 32.9437C27.7757 33.2566 28.2038 33.5696 28.6317 33.8828L20.8623 28.1424Z" fill="black" stroke="black" />
                    </svg>

                </button>
                <button onClick={handleNextSlide}>
                    <svg width="49" height="49" viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="0.806641" y="0.794922" width="46.4935" height="46.4935" rx="16" fill="white" stroke="black" stroke-width="1.5" />
                        <path d="M18.6714 13.9812L18.6715 13.9813C20.2941 15.6076 22.1161 16.9854 24.0014 18.3251C24.4885 18.6712 24.9809 19.0155 25.4752 19.3611C26.8836 20.346 28.3068 21.3411 29.6617 22.4167L29.6617 22.4167C30.222 22.8615 30.6576 23.3584 30.7396 23.9753C30.8232 24.6045 30.5191 25.1871 30.0359 25.7486C29.7406 26.1031 29.42 26.4355 29.0767 26.7432L29.0702 26.7491L29.0701 26.749C28.5909 27.1635 28.1119 27.5792 27.6326 27.9952C25.7438 29.6343 23.8492 31.2784 21.9158 32.8726L21.5977 32.4868L21.9158 32.8726C21.2788 33.3978 20.5261 33.8035 19.8288 34.1795C19.6263 34.2886 19.4285 34.3952 19.2396 34.5015C19.2396 34.5015 19.2395 34.5016 19.2395 34.5016L18.6714 13.9812ZM18.6714 13.9812C18.5021 13.8115 18.249 13.595 17.9353 13.5079M18.6714 13.9812L17.9353 13.5079M19.6051 30.8023L19.6051 30.8023C20.6419 29.845 21.7258 28.9276 22.8 28.0184C23.3066 27.5897 23.811 27.1627 24.3073 26.7342C24.846 26.2692 25.376 25.8024 25.9082 25.3337C26.2861 25.0008 26.6652 24.6669 27.0493 24.332L19.6051 30.8023ZM19.6051 30.8023C18.9823 31.3775 18.5012 32.1113 18.0698 32.7693M19.6051 30.8023L18.0698 32.7693M17.9353 13.5079C17.7679 13.4614 17.5776 13.4503 17.3804 13.5078M17.9353 13.5079L17.3804 13.5078M17.3804 13.5078C17.1843 13.5651 17.0155 13.6802 16.8739 13.8324L17.3804 13.5078ZM18.0698 32.7693C18.0272 32.8342 17.9852 32.8984 17.9435 32.9616L18.0698 32.7693ZM26.5559 23.5458C26.7963 23.7379 27.0407 23.9332 27.2904 24.1325L16.8738 13.8326C16.738 13.9785 16.6425 14.1484 16.6018 14.3387C16.5613 14.5277 16.5815 14.7059 16.6291 14.8601C16.7189 15.151 16.9171 15.3893 17.069 15.55L17.069 15.55C17.2302 15.7205 17.3939 15.9003 17.5613 16.0842C18.0367 16.6063 18.5414 17.1607 19.101 17.6246L19.1013 17.6248C20.2998 18.6169 21.5295 19.5786 22.7528 20.5354C23.3112 20.9721 23.8683 21.4078 24.4206 21.8449L24.4206 21.8449C25.1226 22.4005 25.821 22.9586 26.5559 23.5458ZM17.9494 34.2092C17.9495 34.2093 17.9495 34.2095 17.9496 34.2096L18.4225 34.0472L17.9493 34.2087C17.9493 34.2089 17.9494 34.209 17.9494 34.2092Z" fill="black" stroke="black" />
                    </svg>

                </button>

            </div>

            <div className="border-4 border-black lg:border-l-0 rounded-[38px] lg:rounded-l-none ml-[6px] relative bg-[#1EDADA] flex-grow-0 py-20 px-8 w-full lg:max-w-[calc(100%-400px)]">
                <Swiper ref={sliderRef} slidesPerView={1}
                    centeredSlides={true}
                    // initialSlide={4}

                    loop={true}

                    modules={[Navigation]}
                >
                    {
                        [1, 2, 3, 4].map(id => (
                            <SwiperSlide key={id}>
                                <div>
                                    <p>“My son loves the lesson.
                                        He started during the lockdown”</p>
                                    <h3 className='text-2xl mt-4 font-semibold'>Genelia D’Souza</h3>
                                    <p>Mother of Aniket, 4 years old</p>
                                </div> </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
        </div>
    )
}

export default ReviewSlider