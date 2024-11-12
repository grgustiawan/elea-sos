import { Star, ShoppingCart, Heart, SquarePercent } from 'lucide-react';
import { useGlobalContext } from '../util/GlobalProvider';
import { IOffers, IPromotion } from '../interface';
import { Link } from 'react-router-dom';

export default function FoodAds({
  name,
  description,
  menu,
}: IPromotion) {
  const { price, image } = menu;
  const title = menu.name;
  const { formatPrice, getFoodImage } = useGlobalContext();

  return (
    <div className="relative bg-black text-white rounded-3xl p-4 w-full h-[480px] overflow-hidden shadow-md">
      <img src="/images/bg-ads.png" alt="bg" className="absolute top-0 -right-[5px] h-full z-1" />
      <div className="relative">
        <img
          src={getFoodImage(String(image).replaceAll(".jpg",".png"))}
          alt={title}
          className="rounded-2xl w-full h-[300px] object-contain"
        />
      </div>

      <h2 className="relative text-2xl font-bold mb-2 text-white z-50">{name}</h2>
      <div className="flex justify-between items-center mb-4">
        <span className="relative text-xl font-semibold text-white z-50">{description}</span>
        {/* <div className="flex items-center">
          <SquarePercent className="w-8 h-8 text-yellow-400" />
          <span className="ml-1">
            <span className='text-3xl text-white'>{discount}%</span>
          </span>
        </div> */}
      </div>
      <div className="flex justify-between">
        <Link to="/category">
          <button
            className="bg-white text-black py-2 px-4 rounded-full font-semibold flex items-center"
            aria-label="Add to cart"
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Add to Cart
          </button>
        </Link>
        <button
          className="bg-gray-800 p-2 rounded-full"
          aria-label="Add to favorites"
        >
          <Heart className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}