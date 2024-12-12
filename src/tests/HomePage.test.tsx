import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import HomePage from '../pages/HomePage';

const mockStore = configureStore([thunk]);
const initialState = {
    users: {
        loading: false,
        // Add other necessary initial state properties here
    }
};
const store = mockStore(initialState);

test('renders HomePage correctly', () => {
    render(
        <Provider store={store}>
            <Router>
                <HomePage />
            </Router>
        </Provider>
    );

    const titleElement = screen.getByText(/User Management/i);
    expect(titleElement).toBeInTheDocument();
});