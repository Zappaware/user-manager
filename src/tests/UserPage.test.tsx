import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import UserPage from '../pages/UserPage';

const mockStore = configureStore([thunk]);
const initialState = {
    users: {
        loading: false,
        // Add other necessary initial state properties here
    }
};
const store = mockStore(initialState);

test('renders UserPage correctly', () => {
    render(
        <Provider store={store}>
            <Router>
                <UserPage />
            </Router>
        </Provider>
    );

    const userPageElement = screen.getByText(/user page/i);
    expect(userPageElement).toBeInTheDocument();
});