# Testing Guide

## Overview
This project uses Jest and React Testing Library for testing.

## Running Tests

### Run all tests
```bash
npm test
```

### Run tests in watch mode
```bash
npm run test:watch
```

### Run tests with coverage
```bash
npm run test:coverage
```

## Test Structure

### Component Tests
- Located in `src/components/__tests__/`
- Tests for ThemeSwitcher and LanguageSwitcher components
- Verify UI rendering and user interactions

### Hook Tests
- Located in `src/lib/__tests__/`
- Tests for custom hooks (useContent, useTheme, useLanguage)
- Tests for utility functions (i18n)

### API Tests
- Located in `src/app/api/__tests__/`
- Tests for API routes
- Mock database interactions
- Verify authentication and authorization

## Coverage Thresholds
- Branches: 80%
- Functions: 80%
- Lines: 80%
- Statements: 80%

## Writing Tests

### Component Test Example
```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import MyComponent from '../MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
```

### API Test Example
```typescript
import { GET } from '../route';

describe('API Route', () => {
  it('returns data', async () => {
    const response = await GET();
    const data = await response.json();
    expect(data).toBeDefined();
  });
});
```

## Mocking

### Mocking Next.js Router
Already configured in `jest.setup.js`

### Mocking NextAuth
Already configured in `jest.setup.js`

### Mocking Fetch
```typescript
(global.fetch as jest.Mock).mockResolvedValue({
  ok: true,
  json: () => Promise.resolve({ data: 'test' }),
});
```

### Mocking Prisma
```typescript
jest.mock('@/lib/prisma', () => ({
  prisma: {
    user: {
      findMany: jest.fn(),
    },
  },
}));
```

## Best Practices

1. **Arrange-Act-Assert**: Structure tests in three parts
2. **One assertion per test**: Keep tests focused
3. **Use descriptive names**: Test names should explain what they test
4. **Clean up**: Clear mocks after each test
5. **Test user behavior**: Focus on what users see and do
6. **Avoid implementation details**: Test outcomes, not internals

## Troubleshooting

### Tests failing due to async operations
Use `waitFor` from Testing Library:
```typescript
await waitFor(() => {
  expect(screen.getByText('Loaded')).toBeInTheDocument();
});
```

### Mock not working
Ensure mock is called before importing the module:
```typescript
jest.mock('./module');
import { function } from './module';
```

### Coverage not reaching threshold
Run with `--verbose` to see which lines are not covered:
```bash
npm test -- --coverage --verbose
```
