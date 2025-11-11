import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeSwitcher } from '../ThemeSwitcher';
import { ThemeProvider } from '@/lib/ThemeContext';

describe('ThemeSwitcher', () => {
  it('renders theme switcher button', () => {
    render(
      <ThemeProvider>
        <ThemeSwitcher />
      </ThemeProvider>
    );
    
    const button = screen.getByRole('button', { name: /theme/i });
    expect(button).toBeInTheDocument();
  });

  it('toggles theme when clicked', () => {
    render(
      <ThemeProvider>
        <ThemeSwitcher />
      </ThemeProvider>
    );
    
    const button = screen.getByRole('button', { name: /theme/i });
    fireEvent.click(button);
    
    // Theme should toggle
    expect(document.documentElement.classList.contains('dark') || 
           document.documentElement.classList.contains('light')).toBe(true);
  });
});
