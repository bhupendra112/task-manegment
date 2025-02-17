import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { authActions } from '../store/auth';
import { useSelector, useDispatch } from 'react-redux';

function Login() {
  const history = useNavigate()
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  if (isLoggedIn === true) {
    history('/')
  }
  const [Data, setData] = useState({ username: "", password: "" });

  const dispatch = useDispatch()
  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value })
  }
  const submit = async () => {
    try {
      if (Data.username === "" || Data.password == "") {
        alert("Please fill all the fields")
      } else {
        const response = await axios.post("http://localhost:5000/api/user/log-in", Data)
        setData({ username: "", password: "" })
        console.log(response);
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("token", response.data.token);
        dispatch(authActions.login())
        history("/")
      }
    } catch (error) {
      alert(error)
    }
  }
  return (
    <div className='h-[98vh] flex items-center justify-center'>
      <div className='p-4 w-2/6 rounded bg-gray-800'>
        <div className='text-2xl font-semibold'>Login</div>
        <input
          type="text"
          name="username"
          id="username"
          placeholder='username...'
          className='bg-gray-700 px-3 py-2 my-3 w-full rounded' value={Data.username} onChange={change} />
        <input
          type="password"
          name="password"
          id="password"
          placeholder='password'
          className='bg-gray-700 px-3 py-2 my-3 w-full rounded' value={Data.password} onChange={change} />
        <div className='w-full flex justify-between items-center'>
          <button className='bg-blue-400 text-xl font-semibold text-black px-3 py-2 rounded' onClick={submit}>Login</button>
          <Link to="/signup" className='text-gray-400 hover:text-gray-400'>Not having an account? SignUp here</Link>
        </div>
      </div>
    </div>
  )
}

export default Login