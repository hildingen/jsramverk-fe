import { render, screen } from '@testing-library/react';
import UpdateCode from '../update-code';
import userEvent from '@testing-library/user-event';

test('renders h2', () => {
    render(<UpdateCode />);

    const h2Element = screen.getByText('Create code snippet');
    expect(h2Element).toBeInTheDocument();
});

test('renders run code button', () => {
    render(<UpdateCode />);

    const button = screen.getByText('Run code');
    expect(button).toBeInTheDocument();
});

test('renders save code button', () => {
    render(<UpdateCode />);

    const button = screen.getByText('Save code');
    expect(button).toBeInTheDocument();
});

test('editor to be in document', () => {
    render(<UpdateCode />);

    const editor = screen.getByTestId('editor');

    expect(editor).toBeInTheDocument();
});

test('output container to be in document', () => {
    render(<UpdateCode />);

    const container = screen.getByTestId('output-container');

    expect(container).toBeInTheDocument();
});

test('popup-code to be in document', () => {
    render(<UpdateCode />);

    let container = screen.queryByTestId('popup-code');

    expect(container).not.toBeInTheDocument();

    const button = screen.getByText('Save code');

    userEvent.click(button);

    container = screen.queryByTestId('popup-code');

    expect(container).toBeInTheDocument();
});
