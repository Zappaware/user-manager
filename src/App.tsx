import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/Auth/LoginForm';
import HomePage from './pages/HomePage';
import UserDetails from './components/UserDetails';
import PrivateRoute from './components/PrivateRoute';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginForm />} />
                <Route
                    path="/home"
                    element={
                        <PrivateRoute>
                            <HomePage />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/users/:id"
                    element={
                        <PrivateRoute>
                            <UserDetails />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </Router>
    );
};

export default App;
