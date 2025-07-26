import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '../../App';

describe('Smoke: App renders', () => {
  it('renders without crashing', () => {
    render(<App />);
    expect(true).toBe(true); // If render fails, test will error
  });
}); 