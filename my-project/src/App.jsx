
import { Route, Routes, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import AllTask from './pages/AllTask';
import ImportantTask from './pages/ImportantTask';
import CompletedTask from './pages/CompletedTask';
import IncompletedTask from './pages/IncompletedTask';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { authActions } from './store/auth';

function App() {
  const navigation = useNavigate()
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch()
  useEffect(() => {
    if(localStorage.getItem("id") && localStorage.getItem("token")){
      dispatch(authActions.login())
    }
    else if (isLoggedIn === false) {
      navigation('/signup')
    }
  }, [])

  return (
    <div className='bg-gray-900 text-white h-screen p-2 relative'>
      <Routes>
        <Route exact path='/' element={<Home />}>
          <Route index element={<AllTask />} />
          <Route path='/importanttasks' element={<ImportantTask />} />
          <Route path='/completedTasks' element={<CompletedTask />} />
          <Route path='/incompletedTask' element={<IncompletedTask />} />
        </Route>
        <Route exact path='/signup' element={<Signup />} />
        <Route exact path='/login' element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
