import { useEffect, useState } from 'react'
import { X, CheckCircle, ChevronRight, ArrowRight, BadgePercent } from 'lucide-react'
import useRestaurantStore from '../store/useRestaurantStore'
import { useGlobalContext } from '../util/GlobalProvider'
import { useNavigate } from 'react-router-dom'

export default function GopayReview() {
  const [selectedMethod, setSelectedMethod] = useState('gopay')
  const [totalPay, setTotalPay] = useState<number>(0)
  const { cart, tableNumber } = useRestaurantStore()
  const { formatPrice } = useGlobalContext()
  const navigate = useNavigate()

  useEffect(() => {
    if(tableNumber <= 0) navigate("/");

    let total = 0;
    let tax = 0;
    cart.forEach((data) => {
        total += data.price * data.quantity
        tax += data.quantity * (data.price * 11 / 100)
    })

    setTotalPay(total + tax + ((total + tax) * 5 / 100))
  })

  return (
    <div className="relative flex flex-col h-screen bg-gray-50">
      <div className="flex items-center justify-between p-4 bg-white">
        <h1 className="text-xl font-semibold">Review payment</h1>
        <X className="w-6 h-6 text-gray-600" />
      </div>

      <div className="flex-1 p-6">
        <div className='flex flex-col'>
            <div className="flex items-center p-4 border border-gray-200 rounded-t-xl bg-white">
                <img src="/images/logo.png" alt="logo" className='w-4 h-4 mr-2' />
                <span className="text-lg font-semibold">Galih Restaurant</span>
                <CheckCircle className="w-5 h-5 text-blue-500 ml-2" />
            </div>

            <div className="mb-8 border border-gray-200 rounded-b-xl px-4 py-6 bg-white">
                <span className="text-lg font-bold text-gray-400">Rp <span className='text-3xl text-gray-800'>{formatPrice(totalPay)}</span></span>
            </div>
        </div>

        <div className='absolute bottom-0 left-0 w-full h-[390px] px-4 xl:w-[448px] border-t-2 pt-4 bg-white'>
            <div className="mb-6 flex items-center justify-between bg-gray-100 px-3 py-3 rounded-2xl cursor-pointer">
                <div className="flex items-center gap-2">
                    <BadgePercent className="w-8 h-8 text-orange-500" />
                    <div className='flex flex-col'>
                        <span className="text-black text-md font-semibold">2 promos available</span>
                        <span className="text-gray-500 text-sm">Tap here to see the details</span>
                    </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-500" />
            </div>

            <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Recommended methods</h2>
            <div className="relative flex justify-between items-center bg-white p-4 rounded-lg mb-2 border-b border-gray-200">
                <div className="flex items-center">
                <div className="w-10 h-10 rounded-full flex items-center justify-center">
                    <img src="/images/payment/Gopay.png" alt="gopay" className='w-10 h-10 object-cover' />
                </div>
                <div className="ml-3">
                    <p className="font-semibold">GoPay Saldo</p>
                    <p className="text-sm text-gray-500">Balance: Rp100.000.000</p>
                </div>
                </div>

                <input
                type="radio"
                checked={selectedMethod === 'gopay'}
                onChange={() => setSelectedMethod('gopay')}
                className="absolute w-full h-full z-50 form-radio text-green-600 focus:ring-green-600 opacity-0 cursor-pointer"
                />

                <input
                type="radio"
                checked={selectedMethod === 'gopay'}
                onChange={() => setSelectedMethod('gopay')}
                className="form-radio h-6 w-6 text-green-600 accent-green-600 focus:ring-green-600"
                />
            </div>

            <div className="relative flex justify-between items-center bg-white p-4 rounded-lg">
                <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center">
                        <img src="/images/payment/gopaylatter.png" alt="gopay" className='w-10 h-10 object-cover' />
                    </div>
                    <div className="ml-3">
                        <p className="font-semibold">GoPay Later</p>
                        <p className="text-sm text-gray-500">Limit: Rp100.000.000</p>
                    </div>
                </div>

                <input
                type="radio"
                checked={selectedMethod === 'gopay-later'}
                onChange={() => setSelectedMethod('gopay-later')}
                className="absolute w-full h-full z-50 form-radio text-green-600 focus:ring-green-600 opacity-0 cursor-pointer"
                />


                <input
                type="radio"
                checked={selectedMethod === 'gopay-later'}
                onChange={() => setSelectedMethod('gopay-later')}
                className="form-radio h-6 w-6 text-green-600 accent-green-600 focus:ring-green-600"
                />
            </div>
            </div>
        </div>
        
      </div>

      <div className="p-4 bg-white z-50 bg-transparent">
        <button onClick={() => navigate("/gopay-confirmation")} className="w-full bg-green-600 text-white py-3 px-4 rounded-full flex items-center justify-between">
          <span className="mr-2">Pay</span>

          <div className='flex gap-2 items-center'>
            <span className="font-semibold">Rp {formatPrice(totalPay)}</span>
            <div className='w-6 h-6 bg-white rounded-full flex items-center justify-center'>
                <ArrowRight className='text-green-700 text-xs' />
            </div>
          </div>          
        </button>
      </div>
    </div>
  )
}