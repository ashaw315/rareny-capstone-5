import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import Button from '../Button';
import { theme } from '../../../theme';

// Helper to render with theme
const renderWithTheme = (ui) => {
  return render(
    <StyledThemeProvider theme={theme}>
      {ui}
    </StyledThemeProvider>
  );
};

describe('Button Component', () => {
  it('renders with children text', () => {
    renderWithTheme(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    renderWithTheme(<Button onClick={handleClick}>Click me</Button>);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    renderWithTheme(<Button disabled>Disabled Button</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('shows loading state', () => {
    renderWithTheme(<Button loading>Loading Button</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('accepts custom className', () => {
    renderWithTheme(<Button className="custom-class">Custom</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
  });

  it('supports different button types', () => {
    renderWithTheme(<Button type="submit">Submit</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', 'submit');
  });

  it('renders with different variants', () => {
    const { rerender } = renderWithTheme(<Button variant="primary">Primary</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();

    rerender(
      <StyledThemeProvider theme={theme}>
        <Button variant="secondary">Secondary</Button>
      </StyledThemeProvider>
    );
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('renders with different sizes', () => {
    const { rerender } = renderWithTheme(<Button size="sm">Small</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();

    rerender(
      <StyledThemeProvider theme={theme}>
        <Button size="lg">Large</Button>
      </StyledThemeProvider>
    );
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});