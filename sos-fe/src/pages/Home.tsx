import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function HomeView() {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-full h-full max-w-md bg-white shadow-lg overflow-hidden">
        <div className="relative h-[70%] bg-purple-100 flex items-center justify-center">
          <div className="absolute inset-0">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <circle cx="0" cy="100" r="60" fill="white" />
              <circle cx="100" cy="0" r="60" fill="white" />
            </svg>
          </div>
          <div className="relative z-10 h-full">
            <img
              src="/images/bg-home.jpg"
              alt="Sushi roll"
              className="object-cover h-full"
            />
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-bold tracking-tight">Galih Restaurant</h1>
            <p className="text-gray-500">Choose a delicious food</p>
          </div>

          <div className="space-y-4">
            <button onClick={() => navigate("/login")} className="w-full h-12 flex items-center justify-center rounded-md bg-black text-white hover:bg-gray-800 mb-4">
              Login
            </button>
            <Link to="/table" className="mt-4">
                <button className="w-full h-12 rounded-md bg-teal-100 text-teal-700 hover:bg-teal-400 hover:text-white">
                Start Ordering
                </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}