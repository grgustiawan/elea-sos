import React from 'react'
import { Search, MapPin, Home, Truck, ShoppingCart, Settings } from 'lucide-react'
import MenuFooter from '../components/Menu'

export default function Promotion() {
  return (
    <div className="relative w-full bg-teal-50 min-h-screen p-4 font-sans">
      <header className="mb-6">
        <h1 className="text-4xl font-bold text-teal-800 mb-2">Hello,<br />Federico</h1>
        <div className="flex items-center text-teal-600">
          <MapPin size={18} />
          <span className="ml-1">Indonesia</span>
          <span className="ml-1">▼</span>
        </div>
      </header>

      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search for something tasty..."
          className="w-full py-3 px-4 rounded-full bg-white text-gray-800 placeholder-gray-500"
        />
        <button className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-green-500 text-white p-2 rounded-full">
          <Search size={18} />
        </button>
      </div>

      <section className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Top categories</h2>
          <a href="#" className="text-orange-500">See all</a>
        </div>
        <div className="flex space-x-4">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-orange-300 rounded-full flex items-center justify-center mb-2">
              <span className="text-2xl">🍰</span>
            </div>
            <span className="text-sm">Bakeries</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-orange-300 rounded-full flex items-center justify-center mb-2">
              <span className="text-2xl">🍹</span>
            </div>
            <span className="text-sm">Drinks</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-orange-300 rounded-full flex items-center justify-center mb-2">
              <span className="text-2xl">🍎</span>
            </div>
            <span className="text-sm">Fruits</span>
          </div>
        </div>
      </section>

      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Recommended for you</h2>
          <a href="#" className="text-orange-500">See all</a>
        </div>
        <div className="bg-white rounded-lg p-4 flex items-start">
          <img src="/placeholder.svg?height=80&width=80" alt="Chocolate Pie" className="w-20 h-20 object-cover rounded-lg mr-4" />
          <div>
            <h3 className="font-semibold">Chocolate Pie</h3>
            <div className="flex items-center">
              <span className="text-yellow-500">★★★★★</span>
              <span className="text-sm text-gray-500 ml-1">4.8</span>
            </div>
            <p className="text-orange-500 font-bold mt-1">$12</p>
          </div>
        </div>
      </section>

      <div className='w-full -ml-[15px]'>
        <MenuFooter />
      </div>
    </div>
  )
}