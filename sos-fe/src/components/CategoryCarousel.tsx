import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { ICategory } from '../interface';
import { useGlobalContext } from '../util/GlobalProvider';
import { useNavigate } from 'react-router-dom';

interface FoodCarouselProps {
  categoryItems: ICategory[];
}

export default function CategoryCarousel({ categoryItems }: FoodCarouselProps) {
  const {getCategoryImage} = useGlobalContext();
  const navigate = useNavigate()

  return (

    <div className="flex justify-between mb-6">
        <Swiper
            modules={[Pagination, A11y]}
            spaceBetween={50}
            slidesPerView={4}
            a11y={{
                prevSlideMessage: 'Previous slide',
                nextSlideMessage: 'Next slide',
            }}
            className="mySwiper"
        >
            {categoryItems.map((category) => (
                <SwiperSlide key={category.id}>
                    <div key={category.id} onClick={() => navigate("/category")} className="flex flex-col items-center cursor-pointer">
                        <div className="w-12 h-12 bg-gray-200 rounded-full mb-2 overflow-hidden">
                            <img src={getCategoryImage(category.image)} alt="food" className='w-12 h-12 object-cover' />
                        </div>
                        {/* <span className="text-sm w-12">{category.name}</span> */}
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    </div>
  );
}