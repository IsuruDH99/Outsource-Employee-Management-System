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
      setSuccessMessage("✅ Successfully Deleted");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Error deleting worker:", error);
      setError("Failed to delete worker.");
    }
    setShowModal(false);
  };

  return (
    <div className="mx-auto p-8 bg-white shadow-sm rounded-md">
      <h2 className="text-lg font-semibold text-center text-blue-600 mb-3">Outsource Employees</h2>
      <div className="relative overflow-x-auto rounded-md border border-gray-300">
        {error && <p className="text-red-500 text-center text-xs my-1">{error}</p>}
        {successMessage && <p className="text-green-500 text-center text-xs my-1">{successMessage}</p>}
        <table className="w-full text-[16px] text-gray-700">
          <thead className="text-md text-gray-700 uppercase bg-blue-400 text-white text-center">
            <tr>
              <th className="border text-[20px]">EPF</th>
              <th className="border text-[20px]">Name</th>
              <th className="border text-[20px]">Action</th>
            </tr>
          </thead>
          <tbody>
            {workers.map((worker) => (
              <tr key={worker.epf} className="bg-white text-center border-b hover:bg-gray-100">
                <td className="border text-[20px]">{worker.epf}</td>
                <td className="border text-[20px]">{worker.name}</td>
                <td className="border text-[20px]">
                  <button
                    onClick={() => confirmDelete(worker)}
                    className="text-[16px] px-1.5 py-0.5 bg-red-500 hover:bg-red-600 text-white rounded-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Confirmation Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered size="sm">
        <Modal.Header closeButton className="py-2">
          <Modal.Title className="text-sm">Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-xs">
          Are you sure you want to delete <span className="font-bold">{selectedWorker?.name}</span>?
        </Modal.Body>
        <Modal.Footer className="py-2">
          <Button variant="secondary" size="sm" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" size="sm" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Workerview;
