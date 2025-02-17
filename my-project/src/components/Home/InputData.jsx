import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

function InputData({ inputDiv, setInputDiv, UpdatedData, setUpdatedData }) {
  const [Data, setData] = useState({ title: "", desc: "" });

  useEffect(() => {
    if (UpdatedData) {
      setData({ title: UpdatedData.title || "", desc: UpdatedData.desc || "" });
    }
  }, [UpdatedData]);

  // Handle input changes
  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  // Get user ID and token from local storage
  const userId = localStorage.getItem("id");
  const token = localStorage.getItem("token");

  const headers = {
    id: userId,
    Authorization: `Bearer ${token}`,
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (Data.title.trim() === "" || Data.desc.trim() === "") {
      alert("Please fill all fields");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/task/create-task",
        Data,
        { headers }
      );

      console.log("Task created:", response.data);

      // Reset form fields
      setData({ title: "", desc: "" });

      // Hide the input modal
      setUpdatedData({ id: "", title: "", desc: "" });
      setInputDiv("hidden");

      // Reset UpdatedData

    } catch (error) {
      console.error("Error submitting data:", error.response?.data || error.message);
      alert("Error submitting data! Please try again.");
    }
  };

  // Close modal and reset updated data
  const handleClose = () => {
    setInputDiv("hidden");
    setUpdatedData({ id: "", title: "", desc: "" });
  };
  const updateTask = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/task/update-tasks/${id}`,
        Data,
        { headers }
      );

      console.log("Task created:", response.data);
      setUpdatedData({ id: "", title: "", desc: "" });
      setData({ title: "", desc: "" });
      setInputDiv("hidden");
    } catch (error) {
      console.log("error form the updated task", error);
    }
  }
  return (
    <>
      {/* Background Overlay */}
      <div
        className={`${inputDiv === "hidden" ? "hidden" : ""} fixed top-0 left-0 bg-gray-800 opacity-50 h-screen w-full`}
      ></div>

      {/* Centered Content Container */}
      <div
        className={`${inputDiv === "hidden" ? "hidden" : "flex"} fixed top-0 left-0 h-screen w-full justify-center items-center`}
      >
        <div className="w-2/6 bg-gray-900 p-4 rounded">
          <div className="flex justify-end">
            <button className="text-xl" onClick={handleClose}>
              <CloseIcon />
            </button>
          </div>

          {/* Title Input */}
          <input
            type="text"
            name="title"
            placeholder="Title..."
            className="px-3 rounded py-2 w-full bg-gray-700 my-3 text-white"
            value={Data.title}
            onChange={change}
          />

          {/* Description Textarea */}
          <textarea
            name="desc"
            cols="30"
            rows="5"
            placeholder="Description..."
            className="px-3 rounded py-2 w-full bg-gray-700 my-3 text-white"
            value={Data.desc}
            onChange={change}
          ></textarea>

          {/* Submit Button */}
          {UpdatedData.id === "" ? (<button
            className="px-3 py-2 bg-blue-400 rounded text-black text-2xl font-semibold w-full"
            onClick={handleSubmit}
          >
            Submit
          </button>) : (<button
            className="px-3 py-2 bg-blue-400 rounded text-black text-2xl font-semibold w-full"
            onClick={()=>updateTask(UpdatedData.id)}
          >
            update
          </button>)}


        </div>
      </div>
    </>
  );
}

export default InputData;
