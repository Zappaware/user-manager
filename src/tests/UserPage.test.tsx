import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import UserPage from '../pages/UserPage';

test('renders UserPage correctly', () => {
    render(
        <Provider store={store}>
            <MemoryRouter initialEntries={['/users/1']}>
                <Routes>
                    <Route path="/users/:id" element={<UserPage />} />
                </Routes>
            </MemoryRouter>
        </Provider>
    );

    const detailsElement = screen.getByRole('heading', { level: 4 });
    expect(detailsElement).toBeInTheDocument();
});
