import React, { useState } from 'react'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Login submitted', { username, password, rememberMe })
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full bg-teal-50 h-full overflow-hidden shadow-lg overflow-scroll scrollbar-hide">
        <div className="relative h-48 bg-teal-400 rounded-b-[40px]">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-1/4">
              <div className="w-64 h-64 bg-teal-200 rounded-full"></div>
            </div>
          </div>
          <div className="relative h-full flex items-center justify-center">
            <div className="text-white text-center">
              <div className="w-20 h-20 mx-auto mb-2 bg-teal-400 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="text-xl font-semibold text-gray-800">Welcome Back</div>
              <div className="text-sm opacity-75 text-gray-800">Login to your account</div>
            </div>
          </div>
        </div>

        <div className="p-6 mt-[20%] xl:mt-[35%]">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                id="username"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-400"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-400"
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-[#7c3aed] focus:ring-teal-400 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600">
                  Remember me
                </label>
              </div>
              <a href="#" className="text-sm text-[#7c3aed] hover:underline">
                Forgot Password?
              </a>
            </div>
            <button
              type="submit"
              className="w-full bg-teal-400 hover:bg-teal-200 text-white py-2 px-4 rounded-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-200"
            >
              LOGIN
            </button>
          </form>
          <div className="mt-4 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="#" className="text-[#7c3aed] hover:underline">
              Sign up
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}