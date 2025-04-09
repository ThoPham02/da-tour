import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import TourDetail from './pages/TourDetail';

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