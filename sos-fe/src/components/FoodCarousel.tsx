import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, A11y, Autoplay } from 'swiper/modules';
import FoodAds from './FoodAds';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { IPromotion } from '../interface';

interface FoodCarouselProps {
  foodItems: IPromotion[];
}

export default function FoodCarousel({ foodItems }: FoodCarouselProps) {
  return (
    <div className="relative max-w-screen-lg mx-auto mb-2">
      <Swiper
        modules={[Pagination, A11y, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        a11y={{
          prevSlideMessage: 'Previous slide',
          nextSlideMessage: 'Next slide',
        }}
        className="mySwiper"
      >
        {foodItems.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="flex justify-center mb-10">
              <FoodAds {...item} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}