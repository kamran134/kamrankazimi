import { renderHook } from '@testing-library/react';
import { useScrollAnimation } from '../useScrollAnimation';

// Mock IntersectionObserver
const mockIntersectionObserver = jest.fn();
const mockObserve = jest.fn();
const mockDisconnect = jest.fn();

mockIntersectionObserver.mockReturnValue({
  observe: mockObserve,
  disconnect: mockDisconnect,
  unobserve: jest.fn(),
  takeRecords: jest.fn(),
  root: null,
  rootMargin: '',
  thresholds: [],
});

describe('useScrollAnimation', () => {
  beforeEach(() => {
    mockObserve.mockClear();
    mockDisconnect.mockClear();
    window.IntersectionObserver = mockIntersectionObserver as unknown as typeof IntersectionObserver;
    document.body.innerHTML = '';
  });

  it('should initialize IntersectionObserver with default class', () => {
    const element = document.createElement('div');
    element.className = 'animate-on-scroll';
    document.body.appendChild(element);

    renderHook(() => useScrollAnimation());

    expect(mockIntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      { threshold: 0.2 }
    );
    expect(mockObserve).toHaveBeenCalledWith(element);
  });

  it('should use custom trigger class', () => {
    const element = document.createElement('div');
    element.className = 'custom-animate';
    document.body.appendChild(element);

    renderHook(() => useScrollAnimation('custom-animate'));

    expect(mockObserve).toHaveBeenCalledWith(element);
  });

  it('should observe multiple elements', () => {
    const element1 = document.createElement('div');
    element1.className = 'animate-on-scroll';
    const element2 = document.createElement('div');
    element2.className = 'animate-on-scroll';
    document.body.appendChild(element1);
    document.body.appendChild(element2);

    renderHook(() => useScrollAnimation());

    expect(mockObserve).toHaveBeenCalledTimes(2);
    expect(mockObserve).toHaveBeenCalledWith(element1);
    expect(mockObserve).toHaveBeenCalledWith(element2);
  });

  it('should disconnect observer on unmount', () => {
    const element = document.createElement('div');
    element.className = 'animate-on-scroll';
    document.body.appendChild(element);

    const { unmount } = renderHook(() => useScrollAnimation());
    unmount();

    expect(mockDisconnect).toHaveBeenCalled();
  });

  it('should add animated class when element is intersecting', () => {
    const element = document.createElement('div');
    element.className = 'animate-on-scroll';
    document.body.appendChild(element);

    renderHook(() => useScrollAnimation());

    // Get the callback function passed to IntersectionObserver
    const callback = mockIntersectionObserver.mock.calls[0][0];

    // Simulate intersection
    callback([
      {
        target: element,
        isIntersecting: true,
      },
    ]);

    expect(element.classList.contains('animated')).toBe(true);
  });

  it('should remove animated class when element is not intersecting', () => {
    const element = document.createElement('div');
    element.className = 'animate-on-scroll animated';
    document.body.appendChild(element);

    renderHook(() => useScrollAnimation());

    const callback = mockIntersectionObserver.mock.calls[0][0];

    callback([
      {
        target: element,
        isIntersecting: false,
      },
    ]);

    expect(element.classList.contains('animated')).toBe(false);
  });
});
