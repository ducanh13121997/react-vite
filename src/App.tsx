import { useState } from "react";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ModalCheckComments from "./components/ModalCheckComments";
import useStore from "./store/countStore";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { count, increase, decrease } = useStore();

  return (
    <div className="App">
      <h1>Count: {count}</h1>
      <button onClick={increase}>Increase</button>
      <button onClick={decrease}>Decrease</button>

      <button
        className="text-white bg-blue-500 px-4 py-2 rounded-md"
        onClick={() => setIsModalOpen(true)}
      >
        Open Comments
      </button>
      <ToastContainer />
      <ModalCheckComments
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
}

export default App;
