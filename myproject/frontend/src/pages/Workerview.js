import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";

const Workerview = () => {
  const [workers, setWorkers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const response = await axios.get("http://localhost:3001/workeradd/get-workers");
        setWorkers(response.data);
      } catch (error) {
        console.error("Error fetching workers:", error);
        setError("Failed to load worker data.");
      }
    };
    fetchWorkers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/workeradd/delete-worker/${id}`);
      setWorkers(workers.filter(worker => worker.id !== id)); // Update state
    } catch (error) {
      console.error("Error deleting worker:", error);
      setError("Failed to delete worker.");
    }
  };

  return (
    <div>
      <div className="relative overflow-x-auto">
        {error && <p className="text-red-500">{error}</p>}
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">EPF</th>
              <th scope="col" className="px-6 py-3">Name</th>
              <th scope="col" className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {workers.map((worker) => (
              <tr key={worker.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 py-4">{worker.epf}</td>
                <td className="px-6 py-4">{worker.name}</td>
                <td className="px-6 py-4">
                <Button class="btn btn-danger" onClick={() => handleDelete(worker.epf)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Workerview;
