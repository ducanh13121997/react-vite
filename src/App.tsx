import { useState } from "react";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ModalCheckComments from "./components/ModalCheckComments";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="App">
      <button className="text-white" onClick={() => setIsModalOpen(true)}>Open Comments</button>
      <ToastContainer />
      <ModalCheckComments
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
}

export default App;
