import React, { useState, useEffect } from "react";
import axios from "axios";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddCircleIcon from "@mui/icons-material/AddCircle";

function Card({ home, setInputDiv, data , setUpdatedData }) {

  // useEffect(() => {
  //   console.log("Received Data:", data); 
  //   if (data && Array.isArray(data?.tasks)){
  //     setTaskList(data.tasks);
  //   } else {
  //     setTaskList([]);
  //   }
  // }, [data]);

  const userId = localStorage.getItem("id");
  const token = localStorage.getItem("token");

  const headers = {
    id: userId,
    Authorization: `Bearer ${token}`,
  };

  const handleCompleteTasks = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/task/update-complete-tasks/${id}`,
        {},
        { headers }
      );

      alert(response.data.message);

      // setTaskList((prevTasks) =>
      //   prevTasks.map((task) =>
      //     task._id === id ? { ...task, complete: !task.complete } : task
      //   )
      // );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleImportantTask = async (_id) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/task/update-imp-tasks/${_id}`,
        {},
        { headers }
      );

      alert(response.data.message);

      // setTaskList((prevTasks) =>
      //   prevTasks.map((task) =>
      //     task._id === _id ? { ...task, important: !task.important } : task
      //   )
      // );
    } catch (error) {
      console.error("Error updating task importance:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/task/delete-tasks/${id}`,
        { headers }
      );

      alert(response.data.message);

      // setTaskList((prevTasks) => prevTasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleUpdate = (id, title, desc) => {
    try {
      setInputDiv("fixed");
      setUpdatedData({ id, title, desc });
    } catch (error) {
      console.log("Error updating task:", error);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {data.length > 0 ? (
        data.map((item, i) => (
          <div
            key={i}
            className="p-4 flex flex-col justify-between border border-gray-300 shadow-md rounded-lg hover:shadow-lg transition-transform transform hover:scale-105 bg-gray-700"
          >
            <div>
              <h3 className="text-lg font-semibold mb-2 text-white">
                {item.title}
              </h3>
              <p className="text-gray-300 my-2">{item.desc}</p>
            </div>
            <div className="mt-4 w-full flex items-center">
              <button
                className={`${
                  item.complete ? "bg-green-600" : "bg-red-500"
                } p-2 rounded w-3/6 text-white`}
                onClick={() => handleCompleteTasks(item._id)}
              >
                {item.complete ? "Completed" : "Incomplete"}
              </button>
              <div className="p-2 w-3/6 flex justify-around">
                <button
                  aria-label="Mark Task as Important"
                  onClick={() => handleImportantTask(item._id)}
                >
                  {item.important ? (
                    <FavoriteIcon className="text-red-500" />
                  ) : (
                    <FavoriteBorderIcon className="text-white" />
                  )}
                </button>
                {home !== false && (
                  <button
                    aria-label="Edit Task"
                    onClick={() => handleUpdate(item._id, item.title, item.desc)}
                  >
                    <EditIcon className="text-white" />
                  </button>
                )}
                <button
                  aria-label="Delete Task"
                  onClick={() => deleteTask(item._id)}
                >
                  <DeleteForeverIcon className="text-white" />
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500 col-span-full text-center">
          No tasks available
        </p>
      )}

      {home && (
        <button
          className="flex flex-col justify-center items-center bg-gray-800 p-4 shadow-md rounded-lg hover:shadow-lg transition-transform transform hover:scale-105 hover:cursor-pointer"
          onClick={() => setInputDiv("fixed")}
        >
          <AddCircleIcon className="text-5xl text-white" />
          <h2 className="text-2xl mt-4 text-white">Add Task</h2>
        </button>
      )}
    </div>
  );
}

export default Card;
