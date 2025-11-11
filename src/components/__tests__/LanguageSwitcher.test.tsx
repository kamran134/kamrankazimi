import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { LanguageSwitcher } from '../LanguageSwitcher';
import { LanguageProvider } from '@/lib/LanguageContext';

describe('LanguageSwitcher', () => {
  it('should render all language options', () => {
    render(
      <LanguageProvider>
        <LanguageSwitcher />
      </LanguageProvider>
    );
    
    expect(screen.getByText('AZ')).toBeInTheDocument();
    expect(screen.getByText('RU')).toBeInTheDocument();
    expect(screen.getByText('EN')).toBeInTheDocument();
  });

  it('changes language when clicked', () => {
    render(
      <LanguageProvider>
        <LanguageSwitcher />
      </LanguageProvider>
    );
    
    const ruButton = screen.getByText('RU');
    fireEvent.click(ruButton);
    
    // Check if RU button becomes active
    expect(ruButton.className).toContain('bg-blue');
  });

  it('highlights active language', () => {
    render(
      <LanguageProvider>
        <LanguageSwitcher />
      </LanguageProvider>
    );
    
    // Default language should be highlighted
    const activeButtons = screen.getAllByRole('button').filter(btn => 
      btn.className.includes('bg-blue')
    );
    expect(activeButtons.length).toBeGreaterThan(0);
  });
});
