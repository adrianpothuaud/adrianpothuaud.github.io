---
title: "React Testing Toolkit"
date: "2024-06-10"
description: "Une collection d'utilitaires et de composants pour simplifier les tests React avec Jest et Testing Library."
technologies: ["React", "Jest", "Testing Library", "TypeScript", "Storybook"]
status: "En cours"
github: "https://github.com/adrianpothuaud/react-testing-toolkit"
---

# React Testing Toolkit

Une boîte à outils complète pour simplifier et standardiser les tests React dans vos projets.

## 🚀 Motivation

Après avoir écrit des milliers de tests React, j'ai remarqué que je recréais souvent les mêmes patterns et utilitaires. Ce toolkit rassemble mes bonnes pratiques en un package réutilisable.

## 📦 Que contient le toolkit ?

### 1. Custom Render avec providers

```typescript
// setup/test-utils.tsx
import { render, RenderOptions } from '@testing-library/react'
import { ReactElement } from 'react'
import { ThemeProvider } from './ThemeProvider'
import { AuthProvider } from './AuthProvider'

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  theme?: 'light' | 'dark'
  user?: User | null
  initialRoute?: string
}

export const customRender = (
  ui: ReactElement,
  options: CustomRenderOptions = {}
) => {
  const {
    theme = 'light',
    user = null,
    initialRoute = '/',
    ...renderOptions
  } = options

  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <ThemeProvider theme={theme}>
      <AuthProvider user={user}>
        <Router initialRoute={initialRoute}>
          {children}
        </Router>
      </AuthProvider>
    </ThemeProvider>
  )

  return render(ui, { wrapper: Wrapper, ...renderOptions })
}

// Re-export everything
export * from '@testing-library/react'
export { customRender as render }
```

### 2. Test data factories

```typescript
// factories/userFactory.ts
import { User } from '../types'

export const createUser = (overrides: Partial<User> = {}): User => ({
  id: faker.datatype.uuid(),
  email: faker.internet.email(),
  name: faker.name.fullName(),
  role: 'user',
  createdAt: faker.date.past(),
  ...overrides
})

export const createAdmin = (overrides: Partial<User> = {}): User =>
  createUser({ role: 'admin', ...overrides })

export const createUsers = (count: number, overrides: Partial<User> = {}): User[] =>
  Array.from({ length: count }, () => createUser(overrides))
```

### 3. Custom hooks pour les tests

```typescript
// hooks/useTestSetup.ts
export const useTestSetup = () => {
  const mockApiCalls = () => {
    fetchMock.mockResponseOnce(JSON.stringify({ success: true }))
  }

  const mockUser = (user: Partial<User> = {}) => {
    const mockUser = createUser(user)
    act(() => {
      authStore.setState({ user: mockUser, isAuthenticated: true })
    })
    return mockUser
  }

  const mockError = (message: string) => {
    console.error = jest.fn() // Silence error logs in tests
    fetchMock.mockRejectOnce(new Error(message))
  }

  const waitForApiCall = async () => {
    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalled()
    })
  }

  return {
    mockApiCalls,
    mockUser,
    mockError,
    waitForApiCall
  }
}
```

### 4. Matchers personnalisés

```typescript
// matchers/accessibility.ts
import { toHaveNoViolations } from 'jest-axe'

expect.extend({
  toHaveNoViolations,
  
  toBeAccessible: async (received: HTMLElement) => {
    const results = await axe(received)
    const violations = results.violations
    
    if (violations.length === 0) {
      return {
        pass: true,
        message: () => 'Element is accessible'
      }
    }
    
    const violationMessages = violations.map(
      violation => `${violation.id}: ${violation.description}`
    ).join('\n')
    
    return {
      pass: false,
      message: () => `Element has accessibility violations:\n${violationMessages}`
    }
  }
})
```

### 5. Page Object pour les tests

```typescript
// pageObjects/LoginPage.ts
export class LoginPageObject {
  constructor(private screen: Screen) {}

  get emailInput() {
    return this.screen.getByLabelText(/email/i)
  }

  get passwordInput() {
    return this.screen.getByLabelText(/password/i)
  }

  get submitButton() {
    return this.screen.getByRole('button', { name: /log in/i })
  }

  get errorMessage() {
    return this.screen.queryByRole('alert')
  }

  async login(email: string, password: string) {
    await userEvent.type(this.emailInput, email)
    await userEvent.type(this.passwordInput, password)
    await userEvent.click(this.submitButton)
  }

  async expectErrorMessage(message: string) {
    await waitFor(() => {
      expect(this.errorMessage).toBeInTheDocument()
      expect(this.errorMessage).toHaveTextContent(message)
    })
  }
}
```

## 🎯 Exemples d'utilisation

### Test simple avec le toolkit

```typescript
// LoginForm.test.tsx
import { render, screen, userEvent } from '../test-utils'
import { LoginPageObject } from '../pageObjects/LoginPage'
import { createUser } from '../factories/userFactory'
import LoginForm from './LoginForm'

describe('LoginForm', () => {
  let loginPage: LoginPageObject
  let mockUser: User

  beforeEach(() => {
    mockUser = createUser()
    loginPage = new LoginPageObject(screen)
  })

  it('should login successfully with valid credentials', async () => {
    // Arrange
    render(<LoginForm />)
    mockApiResponse('/auth/login', { user: mockUser, token: 'abc123' })

    // Act
    await loginPage.login(mockUser.email, 'password123')

    // Assert
    await waitFor(() => {
      expect(screen.getByText(`Welcome ${mockUser.name}`)).toBeInTheDocument()
    })
  })

  it('should show error for invalid credentials', async () => {
    // Arrange
    render(<LoginForm />)
    mockApiError('/auth/login', 'Invalid credentials', 401)

    // Act
    await loginPage.login('invalid@email.com', 'wrongpassword')

    // Assert
    await loginPage.expectErrorMessage('Invalid credentials')
  })

  it('should be accessible', async () => {
    render(<LoginForm />)
    await expect(document.body).toBeAccessible()
  })
})
```

### Test d'intégration avec providers

```typescript
// Dashboard.integration.test.tsx
describe('Dashboard Integration', () => {
  it('should display user data when authenticated', async () => {
    // Arrange
    const user = createAdmin()
    const projects = createProjects(3, { ownerId: user.id })
    
    mockApiResponse('/user/me', user)
    mockApiResponse('/projects', projects)

    // Act
    render(<Dashboard />, { 
      user,
      initialRoute: '/dashboard'
    })

    // Assert
    await waitFor(() => {
      expect(screen.getByText(`Hello ${user.name}`)).toBeInTheDocument()
      expect(screen.getAllByTestId('project-card')).toHaveLength(3)
    })
  })
})
```

## 🛠 Configuration

### Installation

```bash
npm install @adrianpothuaud/react-testing-toolkit
```

### Setup

```typescript
// setupTests.ts
import '@adrianpothuaud/react-testing-toolkit/setup'
import './test-utils' // Vos utilitaires spécifiques
```

### Configuration Jest

```javascript
// jest.config.js
module.exports = {
  setupFilesAfterEnv: [
    '@adrianpothuaud/react-testing-toolkit/setup',
    '<rootDir>/src/setupTests.ts'
  ],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  }
}
```

## 📊 Avantages mesurés

### Productivité
- **50% moins de code** de setup par test
- **Réutilisation** des patterns communs
- **Maintenance facilitée** des tests

### Qualité
- **Standardisation** des approches
- **Couverture accessibility** automatique
- **Patterns** éprouvés en production

### Adoption équipe
- **Documentation** intégrée
- **Exemples** nombreux
- **Migration** progressive possible

## 🔮 Roadmap

### Version 2.0
- [ ] Support React 18 features
- [ ] Integration Playwright
- [ ] Visual regression testing
- [ ] Performance assertions

### Version 2.1
- [ ] Storybook integration
- [ ] Mock service worker helpers
- [ ] Advanced accessibility matchers
- [ ] Component snapshot utilities

## 🤝 Contribution

Le projet est open source et accepte les contributions :

- **Issues** : Bugs et feature requests
- **PRs** : Code et documentation
- **Examples** : Cas d'usage réels
- **Feedback** : Retours d'expérience

## 📚 Documentation

- [Guide de démarrage](https://github.com/adrianpothuaud/react-testing-toolkit/wiki/Getting-Started)
- [API Reference](https://github.com/adrianpothuaud/react-testing-toolkit/wiki/API)
- [Exemples](https://github.com/adrianpothuaud/react-testing-toolkit/tree/main/examples)
- [Migration guide](https://github.com/adrianpothuaud/react-testing-toolkit/wiki/Migration)

---

Ce toolkit est le résultat de mon expérience sur des dizaines de projets React. Mon objectif : simplifier les tests pour se concentrer sur la valeur business.

**[Voir sur GitHub →](https://github.com/adrianpothuaud/react-testing-toolkit)**