import Card from '../components/Home/Card';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ImportantTask() {
  const [Data, setData] = useState([]); // Ensures Data is an array

  useEffect(() => {
    const fetchTasks = async () => {
      const userId = localStorage.getItem("id");
      const token = localStorage.getItem("token");

      if (!userId || !token) {
        console.error("User ID or token missing");
        return;
      }

      const headers = {
        id: userId,
        Authorization: `Bearer ${token}`, // Fixed backticks for template literal
      };

      try {
        const response = await axios.get(
          "http://localhost:5000/api/task/get-imp-tasks",
          { headers }
        );
        setData(response.data.data || []); // Ensures Data remains an array
      } catch (error) {
        console.error("Error fetching tasks:", error.response?.data || error.message);
      }
    };

    fetchTasks();
  }, []); // Runs only once on mount


  return (
    <div>
      <Card home={false} data={Data} />
    </div>
  );
}

export default ImportantTask;
