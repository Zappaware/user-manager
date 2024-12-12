import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from "./components/Auth/LoginForm.tsx";
import HomePage from './pages/HomePage';
import UserPage from './pages/UserPage';

const App: React.FC = () => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    return (
        <Router>
            <Routes>
                {/* Redirect to login if not authenticated */}
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<LoginForm />} />
                <Route
                    path="/home"
                    element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />}
                />
                <Route
                    path="/users/:id"
                    element={isAuthenticated ? <UserPage /> : <Navigate to="/login" />}
                />
            </Routes>
        </Router>
    );
};

export default App;

