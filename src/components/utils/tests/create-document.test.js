import { render, screen } from '@testing-library/react';
import CreateDocumentForm from '../create-document-form';
import userEvent from '@testing-library/user-event';

test('renders h2', () => {
    render(<CreateDocumentForm />);
    
    const h2Element = screen.getByText("Create a new document");
    expect(h2Element).toBeInTheDocument();
    
});

test('renders inputs and labels', () => {
    render(<CreateDocumentForm />);

    const labelName = screen.getByLabelText('Name');
    expect(labelName).toBeInTheDocument();

    const labelContent = screen.getByLabelText('Content');
    expect(labelContent).toBeInTheDocument();
});

test('renders submit button', () => {
    render(<CreateDocumentForm />);

    const btn = screen.getByRole('button', { name: 'Create document' });
    expect(btn).toBeInTheDocument();
})

test('input values empty from start and change with inputs', () => {
    const dummySubmit = jest.fn();
    render(<CreateDocumentForm onSubmit={dummySubmit}/>);

    const labelName = screen.getByLabelText('Name');
    expect(labelName).toHaveValue("");

    userEvent.type(labelName, 'Yoda');
    expect(labelName).toHaveValue('Yoda');

    const labelContent = screen.getByLabelText('Content');
    expect(labelContent).toHaveValue("");

    userEvent.type(labelContent, 'Yoda my name is.');
    expect(labelContent).toHaveValue('Yoda my name is.');

    const btn = screen.getByRole('button', { name: 'Create document' });
    userEvent.click(btn);

    expect(dummySubmit).toHaveBeenCalledWith({
        name: 'Yoda',
        content: 'Yoda my name is.'
    })
})