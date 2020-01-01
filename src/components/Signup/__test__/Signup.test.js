import React from 'react';
import ReactDOM from 'react-dom';
import { render, fireEvent, waitForElement } from '@testing-library/react'
import { Signup } from '../Signin';

it('render Signin without crashing', async () => {
    const signinSubmit = jest.fn();
    const onSuccessFn = jest.fn();
    const {
        getByText,
        getByPlaceholderText,
        getByTestId,
        findByRole,
        container
    } = render(
    
    <Signup
        onSuccess={onSuccessFn}
        error={false}
        loading={false} />
        
        );
    fireEvent.change(getByTestId(/email/), { target: { value: "a@a.com" } })
    fireEvent.change(getByTestId(/password/), { target: { value: "123456" } })
    fireEvent.click(getByTestId(/submit/))
});