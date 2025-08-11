import "./App.css";
import Home from "./pages/Home";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ModuleRegistry.registerModules([AllCommunityModule]);
function App() {
  return (
    <div className="App">
      <Home />
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
}

export default App;
