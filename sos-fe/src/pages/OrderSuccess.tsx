import { Check, Home } from "lucide-react"
import { Link } from "react-router-dom"

export default function OrderSuccess() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full">
        <div className="flex flex-col items-center">
          <div className="rounded-full border-4 border-teal-100 p-2 mb-4">
            <Check className="w-12 h-12 text-teal-500" />
          </div>

          <h1 className="text-2xl font-semibold mb-4">Payment Successful</h1>
          <div className="text-center mb-6">
            <p className="text-gray-600 font-medium">Your order has been received!</p>
            <p className="text-gray-800 font-bold">Please wait while we prepare your meal</p>
          </div>
          <Link
            to="/"
            className="flex items-center justify-center w-full bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-800 transition-colors"
          >
            <Home className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}