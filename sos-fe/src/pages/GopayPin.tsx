import { useEffect, useState } from 'react'
import { ArrowLeft, Eye, EyeOff } from 'lucide-react'
import useRestaurantStore from '../store/useRestaurantStore'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function GopayPin() {
  const [pin, setPin] = useState<string>('')
  const [showPin, setShowPin] = useState(false)
  const { 
    cart, 
    tableNumber, 
    clearCart, 
    setTableNumber, 
    setRoomId,
    setPaymentMethodId,
    setAmount,
    setRoom,
    amount,
    paymentMethodId,
    roomId,
  } = useRestaurantStore()
  const navigate = useNavigate()

  const handlePinInput = (digit: string) => {
    if (pin.length < 6) {
      setPin(pin + digit)
    }
  }

  const handleDelete = () => {
    setPin(pin.slice(0, -1))
  }

  const togglePinVisibility = () => {
    setShowPin(!showPin)
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
        amount: amount,
      });

      clearCart()
      setTableNumber(0)
      setRoomId(0)
      setRoom(null)
      setAmount(0)
      setPaymentMethodId(0)

      navigate("/gopay-success")
    } catch (error: any) {
      console.error("Error creating order:", error.response?.data || error.message);
      throw error;
    }
  }

  useEffect(() => {
    if(tableNumber <= 0) navigate("/");
  }, [])

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex items-center p-4 bg-white">
        <ArrowLeft className="w-6 h-6 text-gray-600" />
        <h1 className="ml-4 text-xl font-semibold">GoPay PIN</h1>
      </div>

      <div className="flex-1 p-6">
        <div className="mb-6">
          <img src="/images/payment/Gopay.png" alt="GoPay Logo" className="h-10" />
        </div>
        <p className="mb-4 text-gray-600">Enter GoPay PIN</p>
        <p className="mb-6 text-sm text-gray-500">Your PIN is needed to complete the payment process.</p>

        <div className="flex mb-4">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="w-8 h-8 mx-1 border-b-2 border-gray-300 flex items-center justify-center"
            >
              {pin[index] && (showPin ? pin[index] : '•')}
            </div>
          ))}
          <button onClick={togglePinVisibility} className="ml-2">
            {showPin ? <EyeOff className="w-5 h-5 text-gray-500" /> : <Eye className="w-5 h-5 text-gray-500" />}
          </button>
        </div>

        <button className="text-green-500 text-sm">Forgot PIN?</button>
      </div>

      <div className="grid grid-cols-3 gap-1 bg-gray-200 p-1">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <button
            key={num}
            className="p-4 text-xl font-semibold bg-white rounded-md"
            onClick={() => handlePinInput(num.toString())}
          >
            {num}
          </button>
        ))}
        <button className="p-4 text-xl font-semibold bg-white rounded-md" onClick={handleDelete}>
          ⌫
        </button>
        <button
          className="p-4 text-xl font-semibold bg-white rounded-md"
          onClick={() => handlePinInput('0')}
        >
          0
        </button>
        <button onClick={() => submitOrder()} className="p-4 text-xl font-semibold bg-white rounded-md">
          ✓
        </button>
      </div>
    </div>
  )
}