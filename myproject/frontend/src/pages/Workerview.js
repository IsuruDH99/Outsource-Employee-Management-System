import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Workerview = () => {
  const [workers, setWorkers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState(null);

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/workeradd/get-workers"
        );
        setWorkers(response.data);
      } catch (error) {
        console.error("Error fetching workers:", error);
        toast.error("❌ Failed to load worker data.");
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
      await axios.delete(
        `http://localhost:3001/workeradd/delete-worker/${selectedWorker.epf}`
      );
      setWorkers((prevWorkers) =>
        prevWorkers.filter((worker) => worker.epf !== selectedWorker.epf)
      );
      toast.success(" Worker successfully deleted!");
    } catch (error) {
      console.error("Error deleting worker:", error);
      toast.error("❌ Failed to delete worker.");
    }
    setShowModal(false);
  };

  return (
    <div className="mx-auto p-6 rounded-lg w-11/12 max-w-4xl">
      <ToastContainer
        position="top-center"
        autoClose={1200}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{ marginTop: "65px" }}
      />

      <h6 className="text-3xl font-semibold text-center text-gray-700 mb-8">
        Outsource Employees
      </h6>

      <div className="relative overflow-x-auto rounded-lg shadow border border-gray-200 bg-white">
        <table className="w-full text-sm text-left text-black">
          <thead className="text-xm text-black uppercase bg-indigo-500">
            <tr>
              <th scope="col" className="px-6 py-3 text-center">EPF</th>
              <th scope="col" className="px-6 py-3 text-center">Name</th>
              <th scope="col" className="px-6 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {workers.length > 0 ? (
              workers.map((worker) => (
                <tr
                  key={worker.epf}
                  className="bg-white border-b hover:bg-gray-50 text-center"
                >
                  <td className="px-6 py-3 text-base">{worker.epf}</td>
                  <td className="px-6 py-3 text-base">{worker.name}</td>
                  <td className="px-6 py-3">
                    <button
                      onClick={() => confirmDelete(worker)}
                      className="text-sm px-3 py-1 bg-red-500 hover:bg-red-300 text-white rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="px-6 py-2 text-center text-gray-500">
                  No workers available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Confirmation Modal */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        size="sm"
      >
        <Modal.Header closeButton className="py-2">
          <Modal.Title className="text-sm">Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-xs">
          Are you sure you want to delete{" "}
          <span className="font-bold">{selectedWorker?.name}</span>?
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
