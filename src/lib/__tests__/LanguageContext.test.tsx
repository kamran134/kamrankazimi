import '@testing-library/jest-dom';
import { render, screen, act } from '@testing-library/react';
import { LanguageProvider, useLanguage as useLanguageContext } from '../LanguageContext';
import { Language } from '../i18n';

// Test component that uses the context
function TestComponent() {
  const { lang, changeLanguage } = useLanguageContext();
  
  return (
    <div>
      <div data-testid="current-lang">{lang}</div>
      <button onClick={() => changeLanguage('ru' as Language)}>Change to Russian</button>
      <button onClick={() => changeLanguage('az' as Language)}>Change to Azerbaijani</button>
    </div>
  );
}

describe('LanguageContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should provide default language', () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );

    expect(screen.getByTestId('current-lang')).toHaveTextContent('en');
  });

  it('should change language through context', () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );

    act(() => {
      screen.getByText('Change to Russian').click();
    });

    expect(screen.getByTestId('current-lang')).toHaveTextContent('ru');
    expect(localStorage.getItem('lang')).toBe('ru');
  });

  it('should load language from localStorage', () => {
    localStorage.setItem('lang', 'az');

    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );

    expect(screen.getByTestId('current-lang')).toHaveTextContent('az');
  });

  it('should throw error when useLanguage is used outside provider', () => {
    // Suppress console.error for this test
    const consoleError = console.error;
    console.error = jest.fn();

    expect(() => {
      render(<TestComponent />);
    }).toThrow('useLanguage must be used within a LanguageProvider');

    console.error = consoleError;
  });
});
