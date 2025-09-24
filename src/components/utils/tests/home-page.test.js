import { render, screen } from '@testing-library/react';
import Home from '../../pages/Home';

test('renders welcome text', () => {
    render(<Home />);
    
    const h1Element = screen.getByText("Jsramverk - FE (DV1677)");
    expect(h1Element).toBeInTheDocument();
});