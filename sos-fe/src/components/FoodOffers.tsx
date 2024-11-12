import { BadgePercent, ShoppingBasket } from "lucide-react";
import { ICartItem, IOffers } from "../interface";
import { useGlobalContext } from '../util/GlobalProvider';
import useRestaurantStore from "../store/useRestaurantStore";
import { Link } from "react-router-dom";

interface FoodOfferProps {
    offers: IOffers[];
    onCartUpdate?: () => void;
}

export default function FoodOffers({ offers, onCartUpdate }: FoodOfferProps) {
    const { formatPrice } = useGlobalContext();
    const { addToCart, updateCartItemQuantity, cart } = useRestaurantStore();

    const findCartItem = (menuItems: ICartItem[], id: number): ICartItem | undefined => {
        return menuItems.find((item) => item.id === id);
    };

    const addCart = (item: IOffers) => {
        const cartItem = findCartItem(cart, item.menu.id);

        if (cartItem !== undefined) {
            updateCartItemQuantity(cartItem.id, cartItem.quantity + 1);
        } else {
            const menuItem: ICartItem = {
                id: item.menu.id,
                name: item.menu.name,
                price: (item.menu.price) - (item.menu.price * item.discount / 100),
                discount: item.discount,
                quantity: 1,
                image: item.menu.image,
            };

            addToCart(menuItem);
        }

        let total = 0;
        cart.forEach((data) => {
            total += data.quantity;
        });

        if (onCartUpdate) {
            onCartUpdate();
        }
    };

    return (
        <div className="mb-16">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Special Offers</h2>
                <a href="/category" className="text-teal-500 text-sm">
                    See All
                </a>
            </div>
            <div className="grid grid-cols-2">
                {offers.map((item) => (
                    <div key={item.id} className="relative bg-white p-4 rounded-lg flex-1 m-3 h-[250px] shadow-md">
                        <div className="w-16 h-16 bg-gray-300 rounded-full mb-2 mx-auto overflow-hidden">
                            <img src="/images/default.jpg" alt="food" className="w-full h-full object-cover" />
                        </div>
                        <Link to={`/item/${item.id}`} className="cursor-pointer">
                            <h3 className="font-semibold text-center leading-4">{item.menu.name}</h3>
                        </Link>
                        <p className="text-xs text-gray-500 text-center">{String(item.menu.description).substring(0, 50)}</p>
                        <p className="text-center font-bold mt-2">Rp. {formatPrice((item.menu.price) - (item.menu.price * item.discount / 100))}</p>
                        <p className="text-center text-rose-600 text-xs">Rp. <s>{formatPrice(item.menu.price)}</s></p>

                        <div className="absolute bottom-3 left-3 flex gap-1 items-center text-amber-400">
                            <BadgePercent />
                            <span>{item.discount}</span>
                        </div>

                        <button onClick={() => addCart(item)} className="absolute bottom-2 right-2 px-2 h-8 rounded-full bg-teal-600 text-white hover:bg-teal-800 flex items-center">
                            <ShoppingBasket /> +
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
