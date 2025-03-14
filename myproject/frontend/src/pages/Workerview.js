import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";

const Workerview = () => {
  const [workers, setWorkers] = useState([]);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

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

  const confirmDelete = (worker) => {
    setSelectedWorker(worker);
    setShowModal(true);
  };

  const handleDelete = async () => {
    if (!selectedWorker) return;
    try {
      await axios.delete(`http://localhost:3001/workeradd/delete-worker/${selectedWorker.epf}`);
      setWorkers(workers.filter(worker => worker.epf !== selectedWorker.epf));
      setSuccessMessage("Successfully Deleted");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Error deleting worker:", error);
      setError("Failed to delete worker.");
    }
    setShowModal(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Outsource Employees</h2>
      <div className="relative overflow-x-auto">
        {error && <p className="text-red-500">{error}</p>}
        {successMessage && <p className="text-green-500">{successMessage}</p>}
        <table className="w-full text-sm text-left text-gray-500 border border-gray-300">
          <thead className="text-xs text-gray-700 uppercase bg-blue-500 text-white">
            <tr>
              <th scope="col" className="px-4 py-2 border">EPF</th>
              <th scope="col" className="px-4 py-2 border">Name</th>
              <th scope="col" className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {workers.map((worker) => (
              <tr key={worker.epf} className="bg-white border-b text-center">
                <td className="px-3 py-2 border">{worker.epf}</td>
                <td className="px-3 py-2 border">{worker.name}</td>
                <td className="px-3 py-2 border">
                  <Button variant="danger" className="px-2 py-1 rounded-lg bg-red-600 text-white hover:bg-red-700" onClick={() => confirmDelete(worker)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Confirmation Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete <span className="font-bold">{selectedWorker?.name}</span>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className="px-2 py-1 rounded-lg bg-gray-400 text-white hover:bg-gray-500" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="danger" className="px-2 py-1 rounded-lg bg-red-600 text-white hover:bg-red-700" onClick={handleDelete}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Workerview;
