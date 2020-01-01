import React from 'react';
import { Router } from 'react-router-dom'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import { Routes } from "./Routes";

describe("App", () => {
  let component;
  beforeEach(() => {
    component = render(
      <Routes />
    )
  })
  it('render routes without crashing', () => {
    const { container, getByText, getByTestId } = component;
    expect(container.innerHTML).toMatch('Sign in')
  });
  it('render routes without crashing', () => {
    const { container, getByText, getByTestId } = component;
    expect(getByTestId(/a-signup/i).closest('a')).toBeDefined()
    expect(container.innerHTML).toMatch('Sign in')
  });
})
