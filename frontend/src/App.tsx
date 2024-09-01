import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import NavBar from './components/NavBar';
import RegisterPage from './pages/RegisterPage';
import EventsPage from './pages/EventsPage';
import CreateEventPage from './pages/CreateEventPage';


export default function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path='/dashboard' element={<EventsPage/>}/>
        <Route path="/register" element={<RegisterPage />} />
        <Route path='/createvent' element={<CreateEventPage />} />
      </Routes>
    </Router>
  );
}











