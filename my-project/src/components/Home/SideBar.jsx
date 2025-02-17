import React, { useEffect, useState } from 'react';
import GradeIcon from '@mui/icons-material/Grade';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import AddTaskIcon from '@mui/icons-material/AddTask';
import TaskIcon from '@mui/icons-material/Task';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth';
import axios from 'axios';

function SideBar() {
  const [Data, setData] = useState("")
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = [
    {
      title: "All Tasks",
      icon: <AddTaskIcon />,
      link: "/"
    },
    {
      title: "Important Tasks",
      icon: <GradeIcon />,
      link: "/importanttasks"
    },
    {
      title: "Completed Tasks",
      icon: <BeenhereIcon />,
      link: "/completedTasks"
    },
    {
      title: "Incomplete Tasks",
      icon: <TaskIcon />,
      link: "/incompletedTask"
    }
  ];

  const logout = () => {
    dispatch(authActions.logout());
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    navigate("/signup");
  };

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("https://task-manegment-uh4y.onrender.com/api/task/get-all-tasks", { headers });
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  return (
    <>
      {Data && (
        <div>
          <h2 className='text-xl font-semibold'>{Data.username}</h2>
          <h4 className='my-1 text-gray-400'>{Data.email}</h4>
          <hr />
        </div>)}
      <div className='space-y-2'>
        {data.map((item, i) => (
          <Link to={item.link} key={i} className="p-2 my-2 hover:bg-gray-600 rounded-md cursor-pointer flex items-center transition-all duration-300">
            {item.icon}&nbsp; {item.title}
          </Link>
        ))}
      </div>
      <div>
        <button className='bg-gray-600 w-full p-2 rounded' onClick={logout}>Log Out</button>
      </div>
    </>
  );
}

export default SideBar;
