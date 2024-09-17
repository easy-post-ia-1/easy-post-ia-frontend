// src/App.test.js
import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { expect, test } from 'vitest';
import App from '../App';

test('increments count on button click', () => {
  render(<App />);

  // Check that the button starts with 0
  const button = screen.getByRole('button', { name: '0' });
  expect(button).toBeInTheDocument();

  // Simulate a button click
  fireEvent.click(button);

  // Check that the button now displays 1
  expect(button).toHaveTextContent('1');
});
