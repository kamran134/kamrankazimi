import { getText } from '../i18n';

describe('i18n', () => {
  it('returns correct translation for Azerbaijani', () => {
    const text = { az: 'Salam', ru: 'Привет', en: 'Hello' };
    expect(getText(text, 'az')).toBe('Salam');
  });

  it('returns correct translation for Russian', () => {
    const text = { az: 'Salam', ru: 'Привет', en: 'Hello' };
    expect(getText(text, 'ru')).toBe('Привет');
  });

  it('returns correct translation for English', () => {
    const text = { az: 'Salam', ru: 'Привет', en: 'Hello' };
    expect(getText(text, 'en')).toBe('Hello');
  });

  it('falls back to English for unknown language', () => {
    const text = { az: 'Salam', ru: 'Привет', en: 'Hello' };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(getText(text, 'fr' as any)).toBe('Hello');
  });
});
