import './App.css';
import { RouterProvider } from "react-router-dom";
import AppRoutes from './Routes/AppRoutes';

function App() {
  console.log("proceess==", process.env.REACT_APP_BASE_URL)
  return (
    <div className="App">
        <RouterProvider router={AppRoutes} />
    </div>
  );
}

export default App;
