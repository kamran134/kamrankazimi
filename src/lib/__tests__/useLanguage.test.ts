import { renderHook, act } from '@testing-library/react';
import { useLanguage } from '../useLanguage';
import { Language } from '../i18n';

describe('useLanguage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should initialize with default language', () => {
    const { result } = renderHook(() => useLanguage());
    expect(result.current.lang).toBe('en');
  });

  it('should load language from localStorage', () => {
    localStorage.setItem('lang', 'ru');
    const { result } = renderHook(() => useLanguage());
    expect(result.current.lang).toBe('ru');
  });

  it('should change language and save to localStorage', () => {
    const { result } = renderHook(() => useLanguage());
    
    act(() => {
      result.current.changeLanguage('en' as Language);
    });

    expect(result.current.lang).toBe('en');
    expect(localStorage.getItem('lang')).toBe('en');
  });

  it('should ignore invalid language from localStorage', () => {
    localStorage.setItem('lang', 'invalid');
    const { result } = renderHook(() => useLanguage());
    expect(result.current.lang).toBe('en'); // default
  });
});
