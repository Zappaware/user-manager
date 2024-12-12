import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../redux/reducers.ts'; // Adjust the import according to your project structure
import LoginForm from '../components/Auth/LoginForm';

const initialState = {
    users: {
        loading: false,
        // Add other necessary initial state properties here
    }
};

const store = createStore(rootReducer, initialState, applyMiddleware(thunk));

test('renders LoginForm correctly', () => {
    render(
        <Provider store={store}>
            <Router>
                <LoginForm />
            </Router>
        </Provider>
    );

    const loginButton = screen.getByRole('button', { name: /login/i });
    expect(loginButton).toBeInTheDocument();
});