import { Link, useNavigate } from 'react-router-dom'

export default function ErrorPage() {
  const navigate = useNavigate()

  return (
    <div className="relative h-screen w-full bg-teal-50 flex items-center justify-center">
      <div className="w-full h-full bg-white shadow-lg overflow-hidden">
        <div className="px-6 pt-6 pb-8">
          <div className="flex justify-between items-center mb-8">
            <span className="text-lg font-semibold flex">
                <img src="/images/logo.png" alt="logo" className='w-8' />
            </span>
            <button onClick={() => navigate("/")} className="text-2xl">&times;</button>
          </div>

          <h1 className="text-[72px] font-bold leading-none mb-2">500</h1>
          <h2 className="text-2xl font-semibold mb-4">Internal Server Error!</h2>
          <p className="text-gray-600 mb-8">
                We're sorry, something went wrong on our end. Please try again later or go back to the homepage.
          </p>

          <img src="/images/error.svg" alt="error" className='w-48 2xl:w-64 mx-auto mt-[10%] 2xl:mt-[30%]' />
        </div>

        <Link to="/" className="absolute bottom-0 block w-full bg-teal-400 text-white text-center font-bold py-4 px-4">
          GO HOME
        </Link>
      </div>
    </div>
  )
}