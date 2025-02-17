import React, { useState, useEffect } from "react";
import axios from "axios";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Card from "../components/Home/Card";
import InputData from "../components/Home/InputData";

function AllTask() {
  const [inputDiv, setInputDiv] = useState("hidden");
  const [Data, setData] = useState([]); // ✅ Fix: Default to an empty array
  const [UpdatedData, setUpdatedData] = useState({
    id: "",
    title: "",
    desc: "",
  });

  const userId = localStorage.getItem("id");
  const token = localStorage.getItem("token");

  const headers = {
    id: userId,
    Authorization: `Bearer ${token}`,
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/task/get-all-tasks",
          { headers }
        );
        setData(response.data.data.tasks); 
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
console.log(Data)
    fetchTasks();
  }, []); // ✅ Fix: Remove userId and token from dependencies

  return (
    <>
      <div className="w-full flex justify-end p-4">
        <button onClick={() => setInputDiv("fixed")}>
          <AddCircleIcon className="text-4xl text-gray-500 cursor-pointer hover:text-gray-700 transition duration-300" />
        </button>
      </div>

      {/* ✅ Fix: Ensure Card receives an array */}
      {Data.length > 0 ? (
        <Card home={true} setInputDiv={setInputDiv} data={Data} setUpdatedData={setUpdatedData} />
      ) : (
        <p className="text-gray-500 text-center">No tasks available</p>
      )}

      <InputData inputDiv={inputDiv} setInputDiv={setInputDiv} UpdatedData={UpdatedData} setUpdatedData={setUpdatedData} />
    </>
  );
}

export default AllTask;
