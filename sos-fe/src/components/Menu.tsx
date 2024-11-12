import { Bell, Home, User, Menu, ShoppingBag } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function MenuFooter(){
    return(
        <div className='fixed bottom-0 w-full lg:w-[448px] bg-white px-4 z-50'>
            <div className="w-full flex justify-between items-center pt-4">
                <Link to="/main">
                    <button className="flex flex-col items-center">
                        <Home className="w-6 h-6 text-teal-600" />
                        <span className="text-xs mt-1">Home</span>
                    </button>
                </Link>

                <Link to="/category">
                    <button className="flex flex-col items-center">
                        <Menu className="w-6 h-6" />
                        <span className="text-xs mt-1">Menu</span>
                    </button>
                </Link>

                <Link to="/cart">
                    <button className="flex flex-col items-center">
                        <ShoppingBag className="w-6 h-6" />
                        <span className="text-xs mt-1">Cart</span>
                    </button>
                </Link>
                
                <Link to="/login">
                    <button className="flex flex-col items-center">
                        <User className="w-6 h-6" />
                        <span className="text-xs mt-1">User</span>
                    </button>
                </Link>
            </div>
        </div>
    )
}