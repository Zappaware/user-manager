import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import UserTable from '../components/UserTable';

const mockStore = configureStore([]);
const initialState = {
    users: {
        loading: false,
        // Add other necessary initial state properties here
    }
};
const store = mockStore(initialState);

test('renders user table', () => {
    render(
        <Provider store={store}>
            <Router>
                <UserTable />
            </Router>
        </Provider>
    );
    const tableElement = screen.getByRole('table');
    expect(tableElement).toBeInTheDocument();
});