import React from 'react'
import InputField from '../component/InputField'

const Login = () => {
  return (
    <div>
          <form className="space-y-4">
      <InputField
        label="Email"
        name="email"
        type="email"
        placeholder="Enter your email"
        required
      />
      <InputField
        label="Password"
        name="password"
        type="password"
        placeholder="Enter your password"
        required
      />
      <button className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition">
        Log In
      </button>
    </form>
    </div>
  )
}

export default Login
