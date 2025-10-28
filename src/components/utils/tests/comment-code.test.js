import { render, screen } from '@testing-library/react';
import UpdateDocumentForm from '../update-document-form';
import userEvent from '@testing-library/user-event';

test('renders h2', () => {
    const dummySubmit = jest.fn();
    render(
        <UpdateDocumentForm
            onSubmit={dummySubmit}
            nameProps={'Yoda'}
            contentProps={'In a galaxy far far away'}
            id={'1qwerty'}
        />
    );

    const h2Element = screen.getByTestId('h2-docs');
    expect(h2Element).toBeInTheDocument();
});

test('name label', () => {
    const dummySubmit = jest.fn();
    render(
        <UpdateDocumentForm
            onSubmit={dummySubmit}
            nameProps={'Yoda'}
            contentProps={'In a galaxy far far away'}
            id={'2qwerty'}
        />
    );

    const labelName = screen.getByLabelText('Name');
    expect(labelName).toBeInTheDocument();
});

test('content label', () => {
    const dummySubmit = jest.fn();
    render(
        <UpdateDocumentForm
            onSubmit={dummySubmit}
            nameProps={'Yoda'}
            contentProps={'In a galaxy far far away'}
            id={'3qwerty'}
        />
    );

    const labelName = screen.getByLabelText('Content');
    expect(labelName).toBeInTheDocument();
});

test('name input value', () => {
    const dummySubmit = jest.fn();
    render(
        <UpdateDocumentForm
            onSubmit={dummySubmit}
            nameProps={'Yoda'}
            contentProps={'In a galaxy far far away'}
            id={'2qwerty'}
        />
    );

    const labelName = screen.getByLabelText('Name');
    expect(labelName).toHaveValue('Yoda');
});

test('content input value', () => {
    const dummySubmit = jest.fn();
    render(
        <UpdateDocumentForm
            onSubmit={dummySubmit}
            nameProps={'Yoda'}
            contentProps={'In a galaxy far far away'}
            id={'2qwerty'}
        />
    );

    const labelName = screen.getByLabelText('Content');
    expect(labelName).toHaveValue('In a galaxy far far away');
});

test('h2 preview exist', () => {
    const dummySubmit = jest.fn();
    render(
        <UpdateDocumentForm
            onSubmit={dummySubmit}
            nameProps={'Yoda'}
            contentProps={'In a galaxy far far away'}
            id={'2qwerty'}
        />
    );

    const h2Element = screen.getByText('Preview');
    expect(h2Element).toBeInTheDocument();
});

test('preview row', () => {
    const dummySubmit = jest.fn();
    render(
        <UpdateDocumentForm
            onSubmit={dummySubmit}
            nameProps={'Yoda'}
            contentProps={'In a galaxy far far away'}
            id={'2qwerty'}
        />
    );

    const row = screen.getByTestId('row-test');
    expect(row).toHaveTextContent('In a galaxy far far away');
});

test('comment popup', () => {
    const dummySubmit = jest.fn();
    render(
        <UpdateDocumentForm
            onSubmit={dummySubmit}
            nameProps={'Yoda'}
            contentProps={'In a galaxy far far away'}
            id={'2qwerty'}
        />
    );

    const container = screen.getByTestId('comment-click');

    let popup = screen.queryByTestId('comment-popup');

    expect(popup).not.toBeInTheDocument();

    userEvent.click(container);

    popup = screen.queryByTestId('comment-popup');

    expect(popup).toBeInTheDocument();
});
