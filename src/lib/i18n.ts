export type Language = 'az' | 'ru' | 'en';

export const languages: Record<Language, string> = {
  az: 'AZ',
  ru: 'RU',
  en: 'EN',
};

export const defaultLanguage: Language = 'en';

export const getText = (
  text: { az: string; ru: string; en: string },
  lang: Language
): string => {
  return text[lang] || text.en;
};
