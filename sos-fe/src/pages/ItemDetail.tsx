import { useEffect, useState } from 'react'
import { Heart, ChevronLeft, Minus, Plus, ChevronRight, ArrowLeft } from 'lucide-react'
import { useParams } from 'react-router-dom';
import { ICartItem, IDish } from '../interface';
import { useGlobalContext } from '../util/GlobalProvider';
import useRestaurantStore from '../store/useRestaurantStore';
import axios from 'axios';
import NotificationPopup from '../components/Notification';
import { useNavigate } from 'react-router-dom';
import ErrorPage from '../components/ErrorPage';

export default function ItemDetail() {
  const [amount, setAmount] = useState(1)
  const [size, setSize] = useState('M')
  const { id } = useParams();

  const [food, setFood] = useState<IDish | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null);
  const { formatPrice, findCartItem } = useGlobalContext()
  const { cart, updateCartItemQuantity, addToCart, tableNumber } = useRestaurantStore()
  const navigate = useNavigate()

  const [notification, setNotification] = useState<{ type: 'success' | 'info' | 'warning' | 'error', message: string } | null>(null)

  const showNotification = (type: 'success' | 'info' | 'warning' | 'error', message: string) => {
    setNotification({ type, message })
  }

  const addCart = (item: IDish | null) => {
    if(item == null) return;

    const cartItem = findCartItem(cart, item.id);
    if (cartItem !== undefined) {
        updateCartItemQuantity(cartItem.id, cartItem.quantity + amount);
    } else {
        const menuItem: ICartItem = {
            id: item.id,
            name: item.name,
            price: item.price,
            discount: 0,
            quantity: amount,
            image: item.image,
        };

        addToCart(menuItem);
    }

    showNotification('success', 'Item Added!')

    setTimeout(() => {
      navigate("/cart")
    }, 1000)
  };

  useEffect(() => {
    if(tableNumber <= 0) navigate("/");
    
    const fetchMenu = async () => {
      try {
        const { data } = await axios.get(`/menus/${id}`);
        setFood(data)
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    }

    fetchMenu()
  }, [])

  if(loading) return (
    <div className="max-w-md mx-auto bg-gray-100 min-h-screen p-4">
      <div className="flex justify-between items-center mb-6">
        <ArrowLeft className="w-6 h-6" />
        <div className="h-6 bg-gray-300 rounded w-1/3 animate-pulse"></div>
        <Heart className="w-6 h-6" />
      </div>

      <div className="w-64 h-64 mx-auto bg-gray-300 rounded-full mb-6 mt-24 animate-pulse"></div>

      <div className="mb-4 mt-[180px]">
        <div className="h-8 bg-gray-300 rounded w-3/4 mb-2 animate-pulse"></div>
        <div className="h-6 bg-gray-300 rounded w-1/4 animate-pulse"></div>
      </div>

      <div className="h-6 bg-gray-300 rounded w-24 mb-4 animate-pulse"></div>

      <div className="flex items-center mb-4">
        <div className="w-5 h-5 bg-gray-300 rounded-full mr-2 animate-pulse"></div>
        <div className="h-4 bg-gray-300 rounded w-1/3 animate-pulse"></div>
      </div>

      <div className="mb-8">
        <div className="h-4 bg-gray-300 rounded w-[150px] animate-pulse mb-2"></div>
        <div className="h-[15px] bg-gray-300 rounded w-full mb-1 animate-pulse"></div>
        <div className="h-[15px] bg-gray-300 rounded w-3/4 animate-pulse"></div>
      </div>

      <div className="flex justify-between items-center mt-2 mb-2">
      <div className="h-[15px] bg-gray-300 rounded w-[100px] animate-pulse"></div>
      </div>

      <div className='flex justify-between items-center'>
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gray-300 rounded-full animate-pulse"></div>
          <div className="mx-4 h-6 w-6 bg-gray-300 rounded animate-pulse"></div>
          <div className="w-8 h-8 bg-gray-300 rounded-full animate-pulse"></div>
        </div>

        <div className="h-10 bg-gray-300 rounded-full w-[100px] animate-pulse"></div>
      </div>

    </div>
  );

  if(error) return <ErrorPage />

  return (
    <div>
      <div className="relative w-full h-screen flex-1 p-4 flex flex-col">
        {notification && (
            <NotificationPopup
              type={notification.type}
              message={notification.message}
              duration={1500}
              onDismiss={() => setNotification(null)}
            />
        )}

        <div className="flex justify-between mb-4">
          <button onClick={() => navigate("/main")} className='px-3 py-2'>
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h1 className='text-xl text-gray-600 font-bold'>Food Details</h1>
          <button className='px-3 py-2'>
            <Heart className="h-6 w-6" />
          </button>
        </div>

      
        <div className="rounded-3xl w-full mt-10 p-0 mb-4 overflow-hidden">
          <img
            src="/images/default_food.png"
            alt="Products"
            className="w-[300px] h-[300px] rounded-lg object-cover mx-auto mix-blend-darken"
          />
        </div>

        <div className="absolute bottom-0 left-0 w-full bg-white rounded-t-3xl p-6 flex-1">
          <h2 className="text-2xl font-bold mb-2">{food?.name}</h2>
          <p className="text-lg font-semibold mb-2">Rp. {formatPrice(food?.price ?? 0)}</p>
          <div className="flex space-x-2 mb-2">
            <span className="bg-teal-100 text-teal-800 px-2 py-1 rounded-full text-sm">{food?.category.name}</span>
          </div>
          <div className="flex items-center mb-4">
            <Heart className="h-4 w-4 text-red-500 mr-1" />
            <span className="text-sm text-gray-600">100 people like this</span>
          </div>
          <h3 className="font-bold mb-2">Description</h3>
          <p className="text-sm text-gray-600 mb-4">
            {food?.description}.
          </p>
          
          <h3 className="font-bold mb-2">Amount</h3>
          <div className="relative flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <button
                className="rounded-full px-3 py-2"
                onClick={() => setAmount(Math.max(1, amount - 1))}
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="text-xl font-bold">{amount}</span>
              <button
                className="rounded-full"
                onClick={() => setAmount(amount + 1)}
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <button onClick={() => addCart(food)} className="absolute bottom-0 right-0 flex flex-row items-center rounded-full w-[100px] h-18 px-6 py-2 bg-teal-400 hover:bg-teal-600 text-white">
              Buy
              <ChevronRight className="h-4 w-4 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}