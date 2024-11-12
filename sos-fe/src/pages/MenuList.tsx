import axios from 'axios';
import { useState, useRef, useEffect } from 'react';
import { useGlobalContext } from '../util/GlobalProvider';
import { Link, useNavigate } from 'react-router-dom';
import { ICartItem, ICategories, IMenuList } from '../interface';
import useRestaurantStore from '../store/useRestaurantStore';
import NotificationPopup from '../components/Notification';
import { ArrowLeft } from 'lucide-react';
import ErrorPage from '../components/ErrorPage';

export default function Component() {
  const [category, setCategory] = useState<Array<ICategories>>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true); 
  const [selectedCategory, setSelectedCategory] = useState<ICategories | null>(null);
  const [totalOrder, setTotalOrder] = useState<number>(0);
  const [activeCategory, setActiveCategory] = useState(0);
  const categoryRef = useRef<HTMLDivElement>(null);
  const { formatPrice, findCartItem, getCategoryImage } = useGlobalContext();
  const { cart, updateCartItemQuantity, addToCart, tableNumber } = useRestaurantStore();
  const navigate = useNavigate()

  const [notification, setNotification] = useState<{ type: 'success' | 'info' | 'warning' | 'error', message: string } | null>(null)

  const showNotification = (type: 'success' | 'info' | 'warning' | 'error', message: string) => {
    setNotification({ type, message })
  }

  const updateQuantity = (id: number, change: number) => {
    let menuItem: ICartItem = {
        id: 0,
        name: "",
        price: 0,
        discount: 0,
        quantity: 1,
        image: "",
    };

    category.map(ctg => 
        ctg.menus.map((item) =>{
            if(item.id === id){
                if(change < 0 && item.quantity <= 0) return;

                menuItem.id = item.id
                menuItem.name = item.name
                menuItem.price = item.price
                menuItem.quantity = change
                menuItem.image = item.image
                item.quantity = item.quantity + change

                const cartItem = findCartItem(cart, id);

                if (cartItem !== undefined) {
                    updateCartItemQuantity(id, cartItem.quantity + change);
                } else {
                    addToCart(menuItem);
                    showNotification('success', 'Item Added!')
                }
            }
        })
    ) 
  };

  const scrollCategory = (direction: 'left' | 'right') => {
    if (categoryRef.current) {
      const scrollAmount = direction === 'left' ? -100 : 100;
      categoryRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const selectCategory = (index: number, ctg: ICategories) => {
    setSelectedCategory(ctg);
    setActiveCategory(index);
  };

  useEffect(() => {
    if(tableNumber <= 0) navigate("/");

    const fetchCategory = async () => {
      try {
        const { data } = await axios.get('/categories');
        const updatedData = data.map((category: ICategories) => ({
            ...category,
            menus: category.menus.map((menu: IMenuList) => {
                const cartItem = cart.find(item => item.id === menu.id);
                return {
                    ...menu,
                    quantity: cartItem ? cartItem.quantity : 0,
                };
            })
        }));

        let total = 0;
        updatedData.forEach((category: ICategories) => {
            category.menus.forEach((item) => {
                total += item.price * item.quantity
            })
        });

        setCategory(updatedData);
        setSelectedCategory(updatedData[0] || null);
        setTotalOrder(total);
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, []);

  useEffect(() => {
    if (categoryRef.current && category.length > 0) {
      const activeElement = categoryRef.current.children[activeCategory] as HTMLElement;
      if (activeElement) {
        activeElement.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }
  }, [activeCategory, category]);

  useEffect(() => {
    let total = 0;
    cart.forEach((item) => {
      total += item.price * item.quantity
    })

    setTotalOrder(total);
  })

  if (loading) return (
    <div className="relative w-full h-screen bg-white shadow-lg rounded-lg overflow-hidden">
    
      <div className="p-4 flex items-center justify-between border-b">
        <ArrowLeft className="w-6 h-6 text-gray-500" />
        <div className="h-6 bg-gray-200 rounded w-24 animate-pulse"></div>
        <div className="w-6 h-6"></div>
      </div>

      <div className="w-full p-4 flex flex-row items-center mt-[5px]">
        <div className="w-20 h-20 bg-gray-200 rounded-full mx-[15px] animate-pulse"></div>
        
        <div className='w-[70%] flex flex-col'>
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4 -mt-[10px] animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-[80%] animate-pulse"></div>
        </div>
      </div>

      
      <div className="flex p-4 space-x-2 mx-2 overflow-x-hidden">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="h-8 bg-gray-200 rounded-full w-24 flex-shrink-0 animate-pulse"></div>
        ))}
      </div>

      
      <div className='mt-8 mx-2'>
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="relative flex p-4 border border-gray-200 my-4 mx-3 rounded-xl h-[115px]">
              <div className="w-[80px] h-[75px] bg-gray-200 rounded-xl mr-4 animate-pulse"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2 mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
              </div>

              <div className="absolute bottom-[10px] right-4 flex items-center space-x-8">
                <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
              </div>
            </div>
          ))}
      </div>
      
      <div className="absolute bg-white bottom-0 w-full px-4 py-3 border-t flex justify-between items-center z-50">
        <div className="h-6 bg-gray-200 rounded w-24 animate-pulse"></div>
        <div className="h-10 bg-gray-200 rounded-full w-40 animate-pulse"></div>
      </div>
    </div>
  )

  if (error) return <ErrorPage />;

  return (
    <div className="relative font-sans w-full mx-auto bg-teal-50 rounded-3xl overflow-hidden">
      {notification && (
          <NotificationPopup
            type={notification.type}
            message={notification.message}
            duration={1500}
            onDismiss={() => setNotification(null)}
          />
      )}

      <div className="flex justify-start items-center p-4 bg-white">
        <ArrowLeft onClick={() => navigate("/main")} className="w-6 h-6 text-gray-500 cursor-pointer" />
        <span className="text-lg font-bold ml-36">Category</span>
      </div>

      <div className="flex p-4 bg-white border-b border-gray-200">
        <div className='w-20 h-20 rounded-full mx-4 overflow-hidden'>
          <img
            src={getCategoryImage(selectedCategory?.image ?? 'default.jpg')}
            alt="Merchant"
            className="w-full h-full mr-4 object-contain"
          />
        </div>
        
        <div className='w-[70%]'>
          <h2 className="text-lg font-bold mb-1">{selectedCategory?.name}</h2>
          <h3 className="text-sm mb-1">{selectedCategory?.description}</h3>
        </div>
      </div>

      <div className="relative bg-white p-4 border-b border-gray-200">
        <button onClick={() => scrollCategory('left')} className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 flex items-center bg-teal-100 hover:bg-teal-600 hover:text-white p-2 rounded-full shadow-md z-10">
          ←
        </button>
        <div ref={categoryRef} className="flex overflow-x-auto scrollbar-hide space-x-4 no-scrollbar w-[85%] mx-auto">
          {category.map((category, index) => (
            <span
              key={category.id}
              onClick={() => selectCategory(index, category)}
              className={`flex-shrink-0 px-3 py-1 rounded-full text-sm cursor-pointer transition-colors duration-200 ease-in-out mb-4 ${
                index === activeCategory ? 'bg-teal-800 text-white' : 'text-gray-800 hover:bg-teal-200'
              }`}
            >
              {category.name}
            </span>
          ))}
        </div>
        <button onClick={() => scrollCategory('right')} className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 flex items-center bg-teal-100 hover:bg-teal-600 hover:text-white p-2 rounded-full shadow-md z-10">
          →
        </button>
      </div>

      <div className="p-4 space-y-4 mb-24">
        {selectedCategory?.menus.map((pkg) => (
          <div key={pkg.id} className="flex bg-white rounded-lg p-3">
            <img
              src="/images/default.jpg"
              alt={pkg.name}
              className="w-20 h-20 rounded-lg mr-4 object-cover"
            />
            
            <div className="flex-1">
              <Link to={`/item/${pkg.id}`}>
                <h3 className="font-bold mb-1">{pkg.name}</h3>
              </Link>
              <p className="text-sm text-gray-500 mb-2">{pkg.description}</p>
              <div className="flex justify-between items-center">
                <span className="font-bold">Rp. {formatPrice(pkg.price)}</span>
                <div className="flex items-center">
                  <button 
                    onClick={() => updateQuantity(pkg.id, -1)}
                    className="w-8 h-8 rounded-full bg-teal-100 hover:bg-teal-500 text-teal-500 hover:text-white flex items-center justify-center font-bold"
                  >
                    -
                  </button>
                  <span className="mx-2 w-8 text-center">{pkg.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(pkg.id, 1)}
                    className="w-8 h-8 rounded-full bg-teal-500 hover:bg-teal-100 text-white hover:text-teal-500 flex items-center justify-center font-bold"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="fixed bottom-0 w-full lg:w-[448px] bg-white p-4 flex justify-between items-center shadow-md border-t border-gray-100">
        <div className='relative w-full flex flex-row'>
            <span className="text-lg font-bold">Total Orders</span>
            <Link to="/cart">
              <div className="absolute right-0 -top-[5px] bg-teal-500 hover:bg-teal-800 text-white px-6 py-2 rounded-full font-bold">
              Pay <span className='text-sm ml-2'>Rp. {formatPrice(totalOrder)}</span>
              </div>
            </Link>
        </div>
      </div>
    </div>
  );
}
