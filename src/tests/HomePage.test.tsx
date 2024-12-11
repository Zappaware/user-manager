import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import HomePage from '../pages/HomePage';

test('renders HomePage correctly', () => {
    render(
        <Provider store={store}>
            <HomePage />
        </Provider>
    );

    const titleElement = screen.getByText(/User Management/i);
    expect(titleElement).toBeInTheDocument();
});
