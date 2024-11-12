import { useEffect, useState } from "react"
import FoodCarousel from "../components/FoodCarousel"
import { Home, Menu, QrCode, ShoppingCart, User } from "lucide-react"
import axios from "axios";
import { ICategory, IOffers, IPromotion } from "../interface";
import CategoryCarousel from "../components/CategoryCarousel";
import { useGlobalContext } from '../util/GlobalProvider';
import useRestaurantStore from "../store/useRestaurantStore";
import FoodOffers from "../components/FoodOffers";
import NotificationPopup from "../components/Notification";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import ErrorPage from "../components/ErrorPage";

export default function MainView() {
  const [offers, setOffers] = useState<Array<IPromotion>>([]);
  const [category, setCategory] = useState<Array<ICategory>>([]);
  const [food, setFood] = useState<Array<IOffers>>([]);
  const [promotion, setPromotion] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true); 
  const { formatPrice} = useGlobalContext()
  const [ total, setTotal] = useState<number>(0);
  const navigate = useNavigate()

  const {tableNumber, cart} = useRestaurantStore();

  const [notification, setNotification] = useState<{ type: 'success' | 'info' | 'warning' | 'error', message: string } | null>(null)

  const showNotification = (type: 'success' | 'info' | 'warning' | 'error', message: string) => {
    setNotification({ type, message })
  }

  useEffect(() => {
    if(tableNumber <= 0) navigate("/");
    
    const fetchPromotion = async () => {
      try {
        const { data } = await axios.get('/promotions');
        setOffers(data);
      } catch (err) {
        setError('Failed to fetch data');
      }
    }

    fetchPromotion()

    const fetchCategory = async () => {
      try {
        const { data } = await axios.get('/category');
        setCategory(data);
      } catch (err) {
        setError('Failed to fetch data');
      }
    }

    fetchCategory()

    const fetchFood = async () => {
      try {
        const { data } = await axios.get('/special-offers');
        setFood(data);

      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    }

    fetchFood()
  }, [])

  useEffect(() => {
    let total = 0;
    cart.forEach((data) => {
        total += data.quantity
    })

    setTotal(total)
  })

  if (loading) return (
      <div className="w-full mx-auto bg-teal-50 h-screen flex flex-col">
        <header className="flex items-center justify-between px-2 py-4">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="w-20 h-8 bg-teal-200 rounded-full animate-pulse"></div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
            <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
          </div>
        </header>
  
        <main className="flex-grow p-4 -mt-4">
          <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse"></div>
  
          <div className="h-[110px] bg-teal-200 rounded-lg animate-pulse p-4 flex flex-col justify-between mt-[22px]">
            <div className="h-4 bg-gray-200 rounded w-3/4 mt-2"></div>
            <div className="h-10 bg-white rounded-full w-1/3"></div>
          </div>
  
          <div className="relative h-[480px] bg-teal-200 rounded-3xl overflow-hidden animate-pulse mt-[20px]">
            <div className="absolute bottom-4 left-4 right-4">
              <div className="h-6 bg-white rounded w-1/2 mb-4"></div>
              <div className="h-4 bg-white rounded w-3/4 mb-10"></div>
              <div className="h-10 bg-white rounded-full w-1/3"></div>
            </div>
          </div>
  
          <div className="flex justify-center space-x-2 mt-[17px]">
            {[...Array(9)].map((_, i) => (
              <div key={i} className={`w-2 h-2 rounded-full ${i === 7 ? 'bg-teal-500' : 'bg-gray-200'}`}></div>
            ))}
          </div>
  
          <div className="space-y-2 mt-[30px]">
            <div className="h-[20px] bg-gray-200 rounded w-1/4 animate-pulse"></div>
            <div className="flex justify-between">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-12 h-12 bg-gray-200 rounded-full animate-pulse"></div>
              ))}
            </div>
          </div>
        </main>
  
  
        <nav className="flex justify-around items-center p-4 bg-white border-t">
          <Home className="w-6 h-6 text-gray-300" />
          <Menu className="w-6 h-6 text-gray-300" />
          <ShoppingCart className="w-6 h-6 text-gray-300" />
          <User className="w-6 h-6 text-gray-300" />
        </nav>
      </div>
  )

  if (error) return <ErrorPage />;
  
  return (
    <div className="relative">
      {notification && (
          <NotificationPopup
            type={notification.type}
            message={notification.message}
            duration={1500}
            onDismiss={() => setNotification(null)}
          />
      )}

      <div className="mt-4 flex justify-between items-center w-[96%] mx-auto">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-teal-500 rounded-full overflow-hidden flex items-center justify-center">
              <img src="/images/user.png" className="w-[90%] rounded-full" alt="Profile" />
            </div>
            <div className="bg-teal-500 rounded-full px-3 py-1">
              <span className="text-sm font-semibold text-white">Table {tableNumber}</span>
            </div>
          </div>
          <div className="relative flex items-center space-x-4">
            <QrCode className="w-6 h-6" />

            <Link to="/cart" className="flex items-center gap-1">
                <ShoppingCart className="w-6 h-6" />
                <span className="text-2xl z-10">{total}</span>
            </Link>
            
          </div>
      </div>
      
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4 text-gray-600">Order Your Favorite Food</h1>

        <div className="bg-teal-200 text-white p-4 rounded-lg mb-6">
          <p className="font-semibold mb-2">Grab Our Exclusive Food Discounts Now</p>
          
          <button onClick={() => navigate("/category")} className="bg-white text-teal-600 px-4 py-2 rounded-full font-semibold">
            Order Now
          </button>
        </div>

        <FoodCarousel foodItems={offers} />

        <h2 className="text-lg font-semibold mb-2">Categories</h2>

        <CategoryCarousel categoryItems={category} />

        <FoodOffers offers={food} onCartUpdate={() => showNotification('success', 'Item Added!')} />

      </div>
    </div>
  )
}