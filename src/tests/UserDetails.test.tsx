import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import UserDetails from '../components/UserDetails';

const mockStore = configureStore([thunk]);
const initialState = {
    users: {
        loading: false,
        // Add other necessary initial state properties here
    }
};
const store = mockStore(initialState);

test('renders UserDetails correctly', () => {
    render(
        <Provider store={store}>
            <Router>
                <UserDetails />
            </Router>
        </Provider>
    );

    const userDetailsElement = screen.getByText(/user details/i);
    expect(userDetailsElement).toBeInTheDocument();
});