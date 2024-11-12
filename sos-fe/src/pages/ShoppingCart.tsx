import React, { useEffect, useState } from 'react'
import { ChevronLeft, MoreVertical, Plus, Minus, Trash2, BadgePercent, ArrowLeft } from 'lucide-react'
import useRestaurantStore from '../store/useRestaurantStore';
import { useGlobalContext } from '../util/GlobalProvider';
import { ICartItem } from '../interface';
import { Link } from 'react-router-dom';
import NotificationPopup from '../components/Notification';
import { useNavigate } from 'react-router-dom';

interface Cart {
  [key: number]: number
}

export default function ShoppingCart() {
  const [carts, setCarts] = useState<Cart>({})
  const {
          tableNumber, 
          cart, 
          updateCartItemQuantity,
          removeFromCart,
        } = useRestaurantStore();
  const {formatPrice, findCartItem} = useGlobalContext();
  const [total, setTotal] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const [notification, setNotification] = useState<{ type: 'success' | 'info' | 'warning' | 'error', message: string } | null>(null)

  const showNotification = (type: 'success' | 'info' | 'warning' | 'error', message: string) => {
    setNotification({ type, message })
  }

  const navigate = useNavigate()

  const addToCart = (item: ICartItem) => {
    const cartItem = findCartItem(cart, item.id)
    if(cartItem !== undefined) {
      updateCartItemQuantity(cartItem.id, cartItem.quantity + 1)
    }
  }

  const minCart = (item: ICartItem) => {
    const cartItem = findCartItem(cart, item.id)
    if(cartItem !== undefined && cartItem.quantity > 0) {
      updateCartItemQuantity(cartItem.id, cartItem.quantity - 1)
    }
  }

  const deleteFromCart = (itemId: number) => {
    removeFromCart(itemId)
    showNotification('info', 'Item removed!')
  }

  const subtotal = Object.entries(carts).reduce((sum, [itemId, quantity]) => {
    const item = cart.find(coffee => coffee.id === parseInt(itemId))
    return sum + (item ? item.price * quantity : 0)
  }, 0)

  useEffect(() => {
    if(tableNumber <= 0) navigate("/");

    let total = 0;
    cart.forEach((data) => {
      total += data.price * data.quantity
    })

    setTotal(total)

    setTimeout(() => {
      setIsLoading(false)
    }, 1500)
  })

  if(isLoading) return (
    <div className="relative w-full bg-white h-screen">
      <header className="flex items-center justify-start p-4 border-b">
        <ArrowLeft className="w-6 h-6 text-gray-500" />
        <div className="h-6 bg-gray-200 rounded w-20 animate-pulse ml-36"></div>
      </header>

      <div className="p-4 space-y-4 -mt-[7px]">
        {[...Array(5)].map((_, index) => (
          <div className='relative flex flex-col my-3 border border-gray-200 rounded-lg px-3 py-4'>
              <div key={index} className="relative flex items-center space-x-4 animate-pulse">
                <div className="w-20 h-20 bg-gray-200 rounded-lg"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="flex items-center space-x-2">
                    <div className="h-6 w-16 bg-gray-200 rounded"></div>
                    <div className="h-6 w-16 bg-gray-200 rounded"></div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                  <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                  <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                </div>
              </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-0 p-4 border-t w-full lg:w-[448px] bg-white z-50">
        <div className="flex justify-between items-center mb-4 animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-24"></div>
          <div className="h-4 bg-gray-200 rounded w-24"></div>
        </div>
        <div className="h-8 bg-gray-200 rounded-full w-full animate-pulse"></div>
      </div>
    </div>
  )

  return (
    <div className="relative flex flex-col mb-12">
      {notification && (
          <NotificationPopup
            type={notification.type}
            message={notification.message}
            duration={1500}
            onDismiss={() => setNotification(null)}
          />
      )}

      <div className="bg-white p-4 flex justify-start items-center">
        <Link to="/main">
          <button className='bg-white hover:bg-gray-100 rounded-xl'>
            <ArrowLeft className="w-6 h-6" />
          </button>
        </Link>
        <h1 className="text-xl font-bold ml-36">Cart</h1>
      </div>

      <div className="flex-1 p-4 space-y-4 overflow-auto mb-28">
        {cart.map((item) => (
          <div key={item.id} className="bg-white rounded-lg p-4 flex items-center space-x-4">
            <img src={"/images/default.jpg"} alt={item.name} className="w-20 h-20 rounded-lg" />
            <div className="flex-1">
              <Link to={`/item/${item.id}`} className='cursor-pointer'>
                <h2 className="font-bold">{item.name}</h2>
              </Link>

              <div className="flex items-center">
                <BadgePercent className="h-4 w-4 text-teal-400" />
                <span className="ml-1 text-sm text-teal-600">{item.discount}</span>
              </div>
              <p className="font-semibold">Rp.{formatPrice(item.price)} 
                {item.discount > 0 && (
                  <span className="ml-1 text-sm text-rose-600">
                    <s>{formatPrice((item.price) + (item.price * item.discount / 100))}</s>
                  </span>
                )}
              </p> 
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => minCart(item)}
                className="bg-teal-500 hover:bg-teal-600 text-white rounded-full p-1"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="font-bold">{item.quantity || 0}</span>
              <button
                onClick={() => addToCart(item)}
                className="bg-teal-500 hover:bg-teal-600 text-white rounded-full p-1"
              >
                <Plus className="h-4 w-4" />
              </button>
              <button
                onClick={() => deleteFromCart(item.id)}
                className="bg-red-500 hover:bg-red-600 text-white rounded-full p-1"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="fixed bottom-0 w-full lg:w-[448px] bg-white p-4 rounded-t-3xl shadow-md shadow-gray-200">
        <div className="flex justify-between items-center mb-4">
          <span className="font-bold">Subtotal</span>
          <span className="font-bold">Rp.{formatPrice(total)}</span>
        </div>
        
        {total > 0 && (
            <Link to="/order-summary">
              <button className="w-full bg-teal-500 hover:bg-teal-600 text-white rounded-full py-2">
                Checkout
              </button>
            </Link>
        )}
       
      </div>
    </div>
  )
}
