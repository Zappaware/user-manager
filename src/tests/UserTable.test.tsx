// src/tests/UserTable.test.tsx
import { render, screen } from '@testing-library/react';
import UserTable from '../components/UserTable';

test('renders user table', () => {
    render(<UserTable />);
    const tableElement = screen.getByRole('table');
    expect(tableElement).toBeInTheDocument();
});
