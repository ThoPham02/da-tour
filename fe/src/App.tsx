import { Routes, Route } from 'react-router-dom';
import Login from './pages/public/Login';
import SignUp from './pages/public/SignUp';
import Home from './pages/public/Home';
import TourDetail from './pages/public/TourDetail';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/tour/:id" element={<TourDetail />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;