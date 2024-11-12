import React, { useEffect, useState } from 'react';
import { ChevronDown, Coins, ArrowLeft } from 'lucide-react';
import useRestaurantStore from '../store/useRestaurantStore';
import { useGlobalContext } from '../util/GlobalProvider';
import { Link, useNavigate } from 'react-router-dom';
import { IPaymentMethod } from '../interface';
import axios from 'axios';
import NotificationPopup from '../components/Notification';
import ErrorPage from '../components/ErrorPage';

const OrderSummary: React.FC = () => {
  const {
    tableNumber,
    cart,
    setTableNumber,
    setPaymentMethodId, 
    setAmount,
    setRoom,
    setRoomId,
    clearCart,
    roomId,
    roomName,
    paymentMethodId,
    amount
  } = useRestaurantStore()

  const navigate = useNavigate()
  const [total, setTotal] = useState<number>(0);
  const [tax, setTax] = useState<number>(0);
  const [serviceCharge, setServiceCharge] = useState<number>(0);
  const {formatPrice} = useGlobalContext();

  const [paymentMethod, setPaymentMethod] = useState<Array<IPaymentMethod>>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true); 

  const [payment, setPayment] = useState<number>(0)
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null)
  const [cardNumber, setCardNumber] = useState<string >('')
  const [expDate, setExpDate] = useState<string>('')
  const [cvv, setCvv] = useState<string>('')

  const [notification, setNotification] = useState<{ type: 'success' | 'info' | 'warning' | 'error', message: string } | null>(null)

  const showNotification = (type: 'success' | 'info' | 'warning' | 'error', message: string) => {
    setNotification({ type, message })
  }

  const choosePayment = (id: number, name: string) => {
      setPayment(id)
      setSelectedPayment(name)
  }
  
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g)
    const match = matches && matches[0] || ''
    const parts = []

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
      return parts.join(' ')
    } else {
      return value
    }
  }

  const formatExpDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`
    }
    return v
  }

  const setConfirmation = () => {
    if(!selectedPayment) {
      showNotification('error', 'Select payment method!')
      return
    }

    if(selectedPayment == 'Card' && cardNumber == '') {
      showNotification('error', 'Please fill Card Number!')
      return
    }

    if(selectedPayment == 'Card' && expDate == '') {
      showNotification('error', 'Please fill Expired Date!')
      return
    }

    if(selectedPayment == 'Card' && cvv == '') {
      showNotification('error', 'Please fill CVV!')
      return
    }

    setPaymentMethodId(payment)
    setAmount(total + tax + serviceCharge)

    if (selectedPayment == 'Gopay') navigate("/gopay-review")
    else if (selectedPayment == 'Card') submitOrder();
  }

  const submitOrder = async() => {
    try {
      await axios.post("/orders", {
        tableId: tableNumber,
        roomId: roomId,
        orderItems: cart.map((item) => ({
          menuId: item.id,
          quantity: item.quantity,
        })),
        paymentMethodId: paymentMethodId, 
        amount: amount
      });

      clearCart()
      setTableNumber(0)
      setRoomId(0)
      setRoom(null)
      setAmount(0)
      setPaymentMethodId(0)

      navigate("/order-success")
    } catch (error: any) {
      console.error("Error creating order:", error.response?.data || error.message);
      throw error;
    }
  }

  useEffect(() => {
    if(tableNumber <= 0) navigate("/");

    let ttl: number = 0;
    let tx: number = 0;
    let sc: number = 0;

    cart.forEach((data) => {
      ttl += data.price * data.quantity
      tx += data.quantity * (data.price * 11 / 100)
    })

    setTotal(ttl)
    setTax(tx)
    setServiceCharge((ttl + tx) * 5 / 100)

    const fetchPaymentMethod = async() => {
      try {
        const { data } = await axios.get('/payment-methods');
        data.forEach((element: IPaymentMethod) => {
          element.image = element.name + '.png';
        });

        setPaymentMethod(data)
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    }

    fetchPaymentMethod()
  }, [])

  if (loading) return (
    <div className="relative w-full bg-gray-100 h-screen p-4 overflow-hidden">
      <div className="flex items-center mb-6">
        <ArrowLeft className="w-6 h-6 mr-4" />
        <div className="h-8 bg-gray-300 rounded w-1/3 animate-pulse"></div>
      </div>

      <div className="bg-white rounded-lg p-4 mb-4 mt-[30px] h-[235px]">
        <div className="flex justify-between items-center mb-4">
          <div className="h-4 bg-gray-300 rounded w-1/3 animate-pulse"></div>
          <div className="h-4 bg-gray-300 rounded w-1/4 animate-pulse"></div>
        </div>
        <div className="flex items-center mb-2 mt-[30px]">
          <div className="w-14 h-14 bg-gray-300 rounded mr-4 animate-pulse"></div>
          <div>
            <div className="h-4 bg-gray-300 rounded w-24 mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-300 rounded w-32 animate-pulse"></div>
          </div>
        </div>
        
        <div className="h-[15px] bg-gray-300 rounded w-1/2 mt-2 animate-pulse mt-4"></div>
        <div className="h-[15px] bg-gray-300 rounded w-3/4 mt-2 animate-pulse"></div>

        <div className="h-[15px] bg-gray-300 rounded w-1/2 mt-2 animate-pulse"></div>
        <div className="h-[15px] bg-gray-300 rounded w-3/4 mt-2 animate-pulse"></div>
      </div>

      <div className="bg-white rounded-lg p-4 mb-4 h-[200px]">
        <div className="h-6 bg-gray-300 rounded w-1/3 mb-8 animate-pulse mt-2"></div>
        {[...Array(4)].map((_, index) => (
          <div key={index} className="flex justify-between items-center mb-[15px]">
            <div className="h-[15px] bg-gray-300 rounded w-[120px] animate-pulse"></div>
            <div className="h-[15px] bg-gray-300 rounded w-1/4 animate-pulse"></div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg p-4 mb-4 h-[170px]">
        <div className="h-6 bg-gray-300 rounded w-1/3 mb-4 animate-pulse"></div>
        {[...Array(2)].map((_, index) => (
          <div key={index} className="flex items-center mb-2">
            <div className="w-12 h-12 bg-gray-300 rounded-full mr-4 animate-pulse"></div>
            <div className="h-4 bg-gray-300 rounded w-1/4 animate-pulse"></div>
            <div className="ml-auto w-6 h-6 bg-gray-300 rounded-full animate-pulse"></div>
          </div>
        ))}
      </div>

      <div className="bg-teal-500 rounded-lg p-4 mb-4">
        <div className="h-6 bg-teal-400 rounded w-3/4 animate-pulse"></div>
      </div>

      <div className="absolute w-full bottom-0 left-0 right-0 bg-white p-4 flex justify-between items-center">
        <div>
          <div className="h-4 bg-gray-300 rounded w-20 mb-1 animate-pulse"></div>
          <div className="h-6 bg-gray-300 rounded w-24 animate-pulse"></div>
        </div>
        <div className="h-10 bg-teal-500 rounded-full w-1/3 animate-pulse"></div>
      </div>
    </div>
  );

  if (error) return <ErrorPage />;

  return (
    <div className="min-h-screen flex flex-col">
      {notification && (
          <NotificationPopup
            type={notification.type}
            message={notification.message}
            duration={1500}
            onDismiss={() => setNotification(null)}
          />
      )}

      <div className="bg-white p-4 flex items-center">
        <Link to="/cart">
          <button className="px-2 cursor-pointer">
            <ArrowLeft className="h-6 w-6" />
          </button>
        </Link>
        <h1 className="text-xl font-bold ml-4">Payment</h1>
      </div>

      <div className="flex-1 p-4 space-y-4 overflow-auto mb-24">
        <div className="bg-white rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-lg">Order Summary</h2>
            <ChevronDown className="h-5 w-5 text-gray-500" />
          </div>
          <div className="flex items-center mb-4">
            <div className="bg-teal-100 rounded-lg p-1 mr-3">
              <img src="/images/table.jpg" className="h-12 w-12 object-cover text-teal-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">Table {tableNumber}</h3>
              <p className="text-sm text-gray-500">{roomName}</p>
            </div>
            <button className="text-teal-600 px-3 py-2 rounded-xl">
              Change
            </button>
          </div>
          <div className="grid grid-cols-1 gap-2 text-sm">
            <div>
              <p className="text-gray-500">Restaruant Name</p>
              <p className="font-semibold">Galih Restaurant</p>
            </div>
            <div>
              <p className="text-gray-500">Address</p>
              <p className="font-semibold">Serang, Banten- Indonesia</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-lg">Payment Summary</h2>
            <ChevronDown className="h-5 w-5 text-gray-500" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-500">Total</span>
              <span className="font-semibold">Rp. {formatPrice(total)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Tax</span>
              <span className="font-semibold">Rp. {formatPrice(tax)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Service Charge</span>
              <span className="font-semibold">Rp. {formatPrice(serviceCharge)}</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Total Payment</span>
              <span>Rp. {formatPrice(total + tax + serviceCharge)}</span>
            </div>
          </div>
        </div>

        <div className="w-full p-2 rounded-lg shadow flex flex-col items-center justify-center gap-2 bg-slate-50">
          <p className="capitalize font-semibold self-start">Payment method</p>
          
          {paymentMethod.map((payment) => (
              <label key={payment.id}
                className="inline-flex justify-between w-full items-center z-10 rounded-lg p-2 border border-transparent has-[:checked]:border-teal-800 has-[:checked]:text-teal-900 has-[:checked]:bg-teal-50 has-[:checked]:font-bold hover:bg-slate-200 transition-all cursor-pointer has-[:checked]:transition-all has-[:checked]:duration-500 duration-500 relative [&amp;_p]:has-[:checked]:translate-y-0 [&amp;_p]:has-[:checked]:transition-transform [&amp;_p]:has-[:checked]:duration-500 [&amp;_p]:has-[:checked]:opacity-100 overflow-hidden"
              >
                <div className="inline-flex items-center justify-center gap-2 relative z-10">
                  <img src={"/images/payment/" + payment.image} alt="gopay" className='w-10 h-10 object-cover' />
                  <p
                    className="font-semibold text-sky-400 text-md"
                  >
                    {payment.name}
                  </p>
                </div>
                <input
                  className="checked:text-teal-500 checked:ring-0 checked:ring-current focus:ring-0 focus:ring-current"
                  value={payment.name}
                  onClick={() => choosePayment(payment.id, payment.name)}
                  name="payment"
                  type="radio"
                />
              </label>
          ))}

          {
            selectedPayment == 'Card' && (
              <div className="w-full mx-auto bg-transparent overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-700">Credit Card Information</h2>
                </div>
                <div className="px-6 py-4">
                  <div className="mb-4">
                    <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">Card Number<span className='text-rose-800'>*</span></label>
                    <input
                      id="cardNumber"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="1234 5678 9012 3456"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                      maxLength={19}
                    />
                  </div>
                  <div className="flex mb-4 space-x-4">
                    <div className="flex-1">
                      <label htmlFor="expDate" className="block text-sm font-medium text-gray-700 mb-1">Expiration Date<span className='text-rose-800'>*</span></label>
                      <input
                        id="expDate"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="MM/YY"
                        value={expDate}
                        onChange={(e) => setExpDate(formatExpDate(e.target.value))}
                        maxLength={5}
                      />
                    </div>
                    <div className="flex-1">
                      <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">CVV<span className='text-rose-800'>*</span></label>
                      <input
                        id="cvv"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="123"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                        maxLength={4}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )
          }
        </div>

        <div className="bg-teal-600 rounded-lg p-4 flex items-center">
          <Coins className="h-6 w-6 text-white mr-3" />
          <span className="text-white font-semibold">You will get {((total + tax + serviceCharge) / 1000).toFixed(0)} Coins</span>
        </div>
      </div>

      <div className="fixed bottom-0 w-full lg:w-[448px] bg-white p-4 flex justify-between items-center z-50">
        <div>
          <p className="text-sm text-gray-500">Total Order</p>
          <p className="font-bold text-lg">Rp. {formatPrice(total + tax + serviceCharge)}</p>
        </div>
        <button onClick={() => setConfirmation()} className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-2 rounded-full">
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;
