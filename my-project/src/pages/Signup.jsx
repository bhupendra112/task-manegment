import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import axios from 'axios';

function Signup() {
  const navigation = useNavigate()
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  if (isLoggedIn === true) {
    navigation('/')
  }
  const [Data, setData] = useState({ username: "", email: "", password: "" });
  const history = useNavigate()
  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value })
  }
  const submit = async () => {
    try {
      if (Data.username === "" || Data.email === "" || Data.password == "") {
        alert("Please fill all the fields")
      } else {
        const response = await axios.post("https://task-manegment-uh4y.onrender.com/api/user/sign-in", Data)
        setData({ username: "", email: "", password: "" })
        alert(response.data.message);
        history("/login")
      }
    } catch (error) {
      alert(error.response.data.message)
    }
  }
  return (
    <div className='h-[98vh] flex items-center justify-center'>
      <div className='p-4 w-2/6 rounded bg-gray-800'>
        <div className='text-2xl font-semibold'>Signup</div>
        <input
          type="text"
          name="username"
          id="username"
          placeholder='username...'
          className='bg-gray-700 px-3 py-2 my-3 w-full rounded' onChange={change} value={Data.username} />
        <input
          type="email"
          name="email"
          id="email"
          placeholder='xyz@example.com'
          required
          className='bg-gray-700 px-3 py-2 my-3 w-full rounded' onChange={change} value={Data.email} />
        <input
          type="password"
          name="password"
          id="password"
          placeholder='password'
          className='bg-gray-700 px-3 py-2 my-3 w-full rounded' onChange={change} value={Data.password} />
        <div className='w-full flex justify-between items-center'>
          <button className='bg-blue-400 text-xl font-semibold text-black px-3 py-2 rounded' onClick={submit}>Signup</button>
          <Link to="/login" className='text-gray-400 hover:text-gray-400'>allready having account? LogIn here</Link>
        </div>
      </div>
    </div>
  )
}

export default Signup
