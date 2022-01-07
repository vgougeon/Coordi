import Header from './layout/header';
import OrderPage from './pages/order';
import { Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";
import LoginPage from './pages/login';

function App() {
  return (
    <div className="overflow-hidden">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="order/:id" element={<OrderPage />} />
      </Routes>
    </div>
  );
}

export default App;
