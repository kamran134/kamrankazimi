import { renderHook, waitFor } from '@testing-library/react';
import { useContent } from '../useContent';

describe('useContent', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  it('fetches all content on mount', async () => {
    const mockHero = { titleAz: 'Test', titleRu: 'Test', titleEn: 'Test' };
    const mockAbout = { titleAz: 'About', titleRu: 'About', titleEn: 'About' };
    const mockProjects = [{ id: '1', titleEn: 'Project 1' }];
    const mockSkills = [{ id: '1', name: 'React' }];
    const mockContact = { email: 'test@test.com' };

    (global.fetch as jest.Mock).mockImplementation((url: string) => {
      if (url.includes('/hero')) return Promise.resolve({ ok: true, json: () => Promise.resolve(mockHero) });
      if (url.includes('/about')) return Promise.resolve({ ok: true, json: () => Promise.resolve(mockAbout) });
      if (url.includes('/projects')) return Promise.resolve({ ok: true, json: () => Promise.resolve(mockProjects) });
      if (url.includes('/skills')) return Promise.resolve({ ok: true, json: () => Promise.resolve(mockSkills) });
      if (url.includes('/contact')) return Promise.resolve({ ok: true, json: () => Promise.resolve(mockContact) });
      return Promise.reject(new Error('Unknown URL'));
    });

    const { result } = renderHook(() => useContent());

    await waitFor(() => {
      expect(result.current.hero).toEqual(mockHero);
      expect(result.current.about).toEqual(mockAbout);
      expect(result.current.projects).toEqual(mockProjects);
      expect(result.current.skills).toEqual(mockSkills);
      expect(result.current.contact).toEqual(mockContact);
    });
  });

  it('handles fetch errors gracefully', async () => {
    (global.fetch as jest.Mock).mockRejectedValue(new Error('Network error'));

    const { result } = renderHook(() => useContent());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.hero).toBeNull();
    });
  });
});
