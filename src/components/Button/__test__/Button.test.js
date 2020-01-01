import React from 'react';
import ReactDOM from 'react-dom';
import { render, fireEvent, waitForElement } from '@testing-library/react'
import { Button } from '../Button';

it('render Signin without crashing', () => {
    const onClick = jest.fn();
    const label = "Click Me";
    const { getByText, getByTestId } = render(<Button onClick={onClick}>{label}</Button>);
});