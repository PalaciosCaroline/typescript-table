import { render, screen } from '@testing-library/react';
import React from 'react';
import App from './App';

describe('App', () => {
    it('renders without crashing', () => {
      render(
        <React.StrictMode>
            <App />
        </React.StrictMode>,
      );
      const table = screen.getByRole('table');
      expect(table).toBeInTheDocument();
    });
  });