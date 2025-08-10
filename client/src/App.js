import "./App.css";
import Home from "./pages/Home";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";

ModuleRegistry.registerModules([AllCommunityModule]);
function App() {
  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;
