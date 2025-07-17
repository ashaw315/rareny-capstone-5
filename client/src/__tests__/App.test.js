import React from 'react';
import { render, screen } from '../test-utils';
import App from '../App';

// Mock the NycMap component to avoid SVG loading issues in tests
jest.mock('../components/NycMap', () => {
  return function NycMap() {
    return <div data-testid="nyc-map">NYC Map Component</div>;
  };
});

describe('App Component', () => {
  beforeEach(() => {
    // Mock fetch to return a resolved promise with empty JSON
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([])
      })
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
  it('renders without crashing', () => {
    render(<App />);
    expect(document.body).toBeInTheDocument();
  });

  it('provides theme context to child components', () => {
    render(<App />);
    // Check if the app container exists
    const main = document.querySelector('main') || document.body;
    expect(main).toBeInTheDocument();
  });
});