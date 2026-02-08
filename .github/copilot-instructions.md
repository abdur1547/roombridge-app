# RoomBridge - GitHub Copilot Development Guide

> **Project Type**: React Native Mobile Application (Expo)  
> **Based On**: [Obytes React Native Starter](https://starter.obytes.com/)  
> **Tech Stack**: Expo 54, React Native 0.81, TypeScript, Tailwind CSS (NativeWind/Uniwind)

---

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture & Structure](#architecture--structure)
3. [Code Style & Conventions](#code-style--conventions)
4. [Environment Variables](#environment-variables)
5. [Data Fetching & API](#data-fetching--api)
6. [State Management](#state-management)
7. [UI Components & Styling](#ui-components--styling)
8. [Forms & Validation](#forms--validation)
9. [Navigation & Routing](#navigation--routing)
10. [Internationalization](#internationalization)
11. [Testing](#testing)
12. [VS Code Snippets](#vs-code-snippets)
13. [Common Patterns](#common-patterns)
14. [Important Rules](#important-rules)

---

## 🎯 Project Overview

This is a production-ready React Native application built with:

- **Expo SDK 54** with custom dev client
- **Expo Router v6** for file-based routing
- **TypeScript** for type safety
- **Tailwind CSS** via Uniwind for styling
- **React Query** (TanStack Query) for data fetching
- **Zustand** for state management
- **TanStack Form** + **Zod** for forms and validation
- **React Native MMKV** for fast, secure storage
- **Axios** for HTTP requests
- **i18next** for internationalization

---

## 🏗️ Architecture & Structure

### Feature-Oriented Architecture

The project follows a **feature-oriented architecture** where each feature is self-contained:

```
src/
├── features/              # Feature modules (self-contained)
│   ├── auth/
│   │   ├── login-screen.tsx          # Screen component
│   │   ├── use-auth-store.tsx        # Feature state (Zustand)
│   │   └── components/               # Feature-specific components
│   │       ├── login-form.tsx
│   │       └── login-form.test.tsx
│   ├── feed/
│   │   ├── feed-screen.tsx
│   │   ├── post-detail-screen.tsx
│   │   ├── api.ts                    # Feature API calls
│   │   └── components/
│   │       └── post-card.tsx
│   └── settings/
│       ├── settings-screen.tsx
│       └── components/
│           ├── settings-item.tsx
│           └── theme-item.tsx
├── app/                   # Expo Router routes (thin re-export layer)
│   ├── _layout.tsx
│   ├── login.tsx          # Re-exports LoginScreen
│   ├── (app)/             # Tab group
│   │   ├── _layout.tsx
│   │   ├── index.tsx      # Re-exports FeedScreen
│   │   └── settings.tsx
│   └── feed/
│       ├── [id].tsx       # Dynamic route
│       └── add-post.tsx
├── components/ui/         # Design system (reusable UI components)
│   ├── button.tsx
│   ├── input.tsx
│   ├── select.tsx
│   ├── text.tsx
│   ├── form-utils.ts
│   └── icons/
├── lib/                   # Core infrastructure
│   ├── api/              # API client & utilities
│   │   ├── client.tsx    # Axios instance
│   │   ├── provider.tsx  # React Query provider
│   │   └── utils.tsx     # Helper functions
│   ├── auth/             # Auth utilities (token storage)
│   ├── hooks/            # Global hooks
│   ├── i18n/             # i18n setup
│   ├── storage.tsx       # MMKV wrapper
│   └── utils.ts
└── translations/          # i18n resources
    ├── en.json
    └── ar.json
```

### Key Folder Rules

#### `features/`
- Each feature contains screens, components, API calls, and state
- Screens use `-screen.tsx` suffix
- Only `components/` subfolder is allowed within features
- Use single files (`api.ts`, `use-*-store.tsx`) not folders
- ❌ **NO** `index.ts` barrel exports (prevents fast refresh issues)

#### `app/`
- Contains Expo Router file-based routing
- Routes are **thin re-export layers** that import from features:
  ```tsx
  // app/login.tsx
  export { LoginScreen as default } from '@/features/auth/login-screen';
  ```

#### `components/ui/`
- Design system with reusable UI primitives
- Promote a component here when used in 2+ features
- Contains form utilities, theme config, icons

#### `lib/`
- Core infrastructure and cross-cutting concerns
- API client, auth utils, global hooks, i18n, storage

---

## 📝 Code Style & Conventions

### Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| Files & Folders | `kebab-case` | `login-form.tsx`, `api.ts` |
| Variables & Functions | `camelCase` | `useAuthStore`, `handleSubmit` |
| Components | `PascalCase` | `LoginForm`, `PostCard` |
| Types & Interfaces | `PascalCase` | `Post`, `UserProfile` |
| Constants | `UPPER_SNAKE_CASE` | `API_URL`, `MAX_RETRIES` |

### File Naming

- ✅ **Screens**: `*-screen.tsx` (e.g., `login-screen.tsx`)
- ✅ **Components**: `component-name.tsx` (e.g., `post-card.tsx`)
- ✅ **Tests**: `component-name.test.tsx`
- ✅ **Stores**: `use-*-store.tsx` (e.g., `use-auth-store.tsx`)
- ✅ **API files**: `api.ts` (single file per feature)

### Import Patterns

#### Within the same feature (relative imports):
```tsx
import { LoginForm } from './components/login-form';
import { useAuthStore } from './use-auth-store';
```

#### Cross-feature imports (absolute with full path):
```tsx
import { useAuthStore } from '@/features/auth/use-auth-store';
import { PostCard } from '@/features/feed/components/post-card';
```

#### From design system:
```tsx
import { Button, Input, Text, View } from '@/components/ui';
import { getFieldError } from '@/components/ui/form-utils';
```

#### From lib:
```tsx
import { translate } from '@/lib/i18n';
import { client, APIProvider } from '@/lib/api';
import Env from '@env'; // or import Env from 'env';
```

### TypeScript

- **Prefer `type` over `interface`** (enforced by ESLint)
- Use **inline type imports**:
  ```tsx
  import type { Post, User } from './types';
  ```
- Define types close to usage (avoid separate `types.ts` unless shared)

---

## 🔐 Environment Variables

### Key Principles

- **Single `.env` file** for all environments
- Use `EXPO_PUBLIC_*` prefix for client-accessible variables
- Non-prefixed variables are **build-time only** (never exposed to client)
- Validation with **Zod** schema in `env.ts`

### Environment Types

```
development  → Local development (default)
preview      → Internal testing/staging
production   → Production builds
```

### Adding a New Environment Variable

1. **Add to `.env`**:
   ```env
   # Client-accessible (available in src/)
   EXPO_PUBLIC_API_URL=https://api.example.com
   
   # Build-time only (NOT in src/)
   SECRET_KEY=my-secret
   ```

2. **Add to Zod schema in `env.ts`**:
   ```ts
   const envSchema = z.object({
     EXPO_PUBLIC_API_URL: z.string().url(),
     // Don't add non-prefixed secrets to schema
   });
   ```

3. **Add to `_env` object**:
   ```ts
   const _env: z.infer<typeof envSchema> = {
     EXPO_PUBLIC_API_URL: process.env.EXPO_PUBLIC_API_URL ?? '',
   };
   ```

4. **Run prebuild**: `pnpm prebuild`

5. **Use in code**:
   ```tsx
   import Env from '@env';
   console.log(Env.EXPO_PUBLIC_API_URL);
   ```

### Environment Switching

```bash
# Development
pnpm start

# Preview
pnpm start:preview

# Production
pnpm start:production
```

---

## 🌐 Data Fetching & API

### Stack

- **React Query** (TanStack Query v5) for server state
- **Axios** for HTTP client
- **react-query-kit** for reusable, type-safe hooks

### API Structure

```
src/lib/api/
├── client.tsx      # Axios instance
├── provider.tsx    # QueryClient provider
└── utils.tsx       # Helpers (pagination, etc.)

src/features/{feature}/api.ts  # Feature-specific queries
```

### Axios Client Setup

```tsx
// src/lib/api/client.tsx
import axios from 'axios';
import Env from 'env';

export const client = axios.create({
  baseURL: Env.EXPO_PUBLIC_API_URL,
});
```

### Creating a Query Hook

Use **react-query-kit**'s `createQuery`:

```tsx
// src/features/feed/api.ts
import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';
import { client } from '@/lib/api';

export type Post = {
  id: number;
  title: string;
  body: string;
};

type PostsResponse = Post[];
type PostsVariables = void;

export const usePosts = createQuery<PostsResponse, PostsVariables, AxiosError>({
  queryKey: ['posts'],
  fetcher: () => {
    return client.get(`posts`).then(response => response.data.posts);
  },
});
```

### Query with Variables

```tsx
type PostResponse = Post;
type PostVariables = { id: string };

export const usePost = createQuery<PostResponse, PostVariables, AxiosError>({
  queryKey: ['posts'],
  fetcher: (variables) => {
    return client
      .get(`posts/${variables.id}`)
      .then(response => response.data);
  },
});

// Usage:
const { data, isPending, isError } = usePost({ variables: { id: '123' } });
```

### Creating a Mutation Hook

```tsx
import { createMutation } from 'react-query-kit';

type AddPostResponse = Post;
type AddPostVariables = { title: string; body: string; userId: number };

export const useAddPost = createMutation<AddPostResponse, AddPostVariables, AxiosError>({
  mutationFn: async variables =>
    client({
      url: 'posts/add',
      method: 'POST',
      data: variables,
    }).then(response => response.data),
});

// Usage:
const { mutate: addPost, isPending } = useAddPost();

addPost(
  { title: 'New Post', body: 'Content...', userId: 1 },
  {
    onSuccess: () => {
      showMessage({ message: 'Post added!', type: 'success' });
    },
    onError: () => {
      showErrorMessage('Error adding post');
    },
  }
);
```

### Pagination Helpers

```tsx
import { getNextPageParam, getPreviousPageParam } from '@/lib/api';

export const usePostsPaginated = createInfiniteQuery({
  queryKey: ['posts'],
  fetcher: ({ pageParam = 0 }) => {
    return client.get(`posts?offset=${pageParam}`).then(res => res.data);
  },
  getNextPageParam,
  getPreviousPageParam,
});
```

---

## 🗃️ State Management

### Zustand for Local State

Used for **client-side state** (auth, UI state, etc.)

```tsx
// src/features/auth/use-auth-store.tsx
import { create } from 'zustand';
import { createSelectors } from '@/lib/utils';

type AuthState = {
  token: string | null;
  status: 'idle' | 'signOut' | 'signIn';
  signIn: (token: string) => void;
  signOut: () => void;
};

const _useAuthStore = create<AuthState>((set) => ({
  status: 'idle',
  token: null,
  signIn: (token) => set({ status: 'signIn', token }),
  signOut: () => set({ status: 'signOut', token: null }),
}));

export const useAuthStore = createSelectors(_useAuthStore);

// Standalone actions
export const signIn = (token: string) => _useAuthStore.getState().signIn(token);
export const signOut = () => _useAuthStore.getState().signOut();
```

### Storage with MMKV

```tsx
// src/lib/storage.tsx
import { createMMKV } from 'react-native-mmkv';

export const storage = createMMKV();

export function getItem<T>(key: string): T | null {
  const value = storage.getString(key);
  return value ? JSON.parse(value) || null : null;
}

export async function setItem<T>(key: string, value: T) {
  storage.set(key, JSON.stringify(value));
}

export async function removeItem(key: string) {
  storage.remove(key);
}
```

---

## 🎨 UI Components & Styling

### Styling System

- **Uniwind** (Tailwind CSS for React Native)
- **Tailwind Variants** for component variants
- **Inter** font family (400, 500, 600, 700)
- Dark mode support via `useThemeConfig()`

### Using UI Components

```tsx
import { Button, Input, Text, View } from '@/components/ui';

<View className="flex-1 p-4 bg-white dark:bg-black">
  <Text className="text-xl font-semibold text-black dark:text-white">
    Welcome
  </Text>
  
  <Button 
    label="Submit" 
    variant="default"
    size="lg"
    loading={isPending}
    onPress={handleSubmit}
  />
</View>
```

### Button Variants

```tsx
<Button variant="default" />   // Black bg, white text
<Button variant="secondary" /> // Primary color
<Button variant="outline" />   // Border, transparent bg
<Button variant="destructive" /> // Red bg
<Button variant="ghost" />     // Transparent, underlined
<Button variant="link" />      // Plain text link
```

### Creating a New Component

```tsx
/* eslint-disable better-tailwindcss/no-unknown-classes */
import type { PressableProps } from 'react-native';
import type { VariantProps } from 'tailwind-variants';
import * as React from 'react';
import { Pressable, Text } from 'react-native';
import { tv } from 'tailwind-variants';

const myComponent = tv({
  slots: {
    container: 'flex flex-row items-center',
    label: 'text-base font-medium',
  },
  variants: {
    variant: {
      default: {
        container: 'bg-black',
        label: 'text-white',
      },
    },
    size: {
      default: { container: 'h-10 px-4' },
      lg: { container: 'h-12 px-8' },
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

type Props = VariantProps<typeof myComponent> & PressableProps;

export function MyComponent({ variant, size, ...props }: Props) {
  const styles = myComponent({ variant, size });
  
  return (
    <Pressable className={styles.container()}>
      <Text className={styles.label()}>Label</Text>
    </Pressable>
  );
}
```

---

## 📋 Forms & Validation

### Stack

- **TanStack Form** for form state
- **Zod** for validation
- **getFieldError** utility for error extraction

### Basic Form Example

```tsx
import { useForm } from '@tanstack/react-form';
import * as z from 'zod';
import { Button, Input, View } from '@/components/ui';
import { getFieldError } from '@/components/ui/form-utils';

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Min 6 characters'),
});

export function LoginForm({ onSubmit }) {
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    validators: {
      onChange: schema as any, // Real-time validation
    },
    onSubmit: async ({ value }) => {
      onSubmit(value);
    },
  });

  return (
    <View className="p-4">
      <form.Field
        name="email"
        children={(field) => (
          <Input
            label="Email"
            value={field.state.value}
            onBlur={field.handleBlur}
            onChangeText={field.handleChange}
            error={getFieldError(field)}
          />
        )}
      />
      
      <form.Field
        name="password"
        children={(field) => (
          <Input
            label="Password"
            secureTextEntry
            value={field.state.value}
            onBlur={field.handleBlur}
            onChangeText={field.handleChange}
            error={getFieldError(field)}
          />
        )}
      />
      
      <form.Subscribe
        selector={(state) => [state.isSubmitting]}
        children={([isSubmitting]) => (
          <Button
            label="Login"
            loading={isSubmitting}
            onPress={form.handleSubmit}
          />
        )}
      />
    </View>
  );
}
```

### Form with Select Component

```tsx
<form.Field
  name="category"
  children={(field) => (
    <Select
      label="Category"
      value={field.state.value}
      onSelect={(value) => field.handleChange(value)} // Note: onSelect not onChangeText
      options={categories}
      error={getFieldError(field)}
    />
  )}
/>
```

### Form with API Mutation

```tsx
export function AddPostScreen() {
  const { mutate: addPost, isPending } = useAddPost();
  
  const form = useForm({
    defaultValues: { title: '', body: '' },
    validators: { onChange: schema as any },
    onSubmit: ({ value }) => {
      addPost(
        { ...value, userId: 1 },
        {
          onSuccess: () => {
            showMessage({ message: 'Post added!', type: 'success' });
          },
          onError: () => {
            showErrorMessage('Error adding post');
          },
        }
      );
    },
  });

  return (
    <View className="flex-1 p-4">
      {/* Fields */}
      <form.Subscribe
        selector={(state) => [state.isSubmitting]}
        children={([isSubmitting]) => (
          <Button
            label="Submit"
            loading={isPending || isSubmitting}
            onPress={form.handleSubmit}
          />
        )}
      />
    </View>
  );
}
```

---

## 🧭 Navigation & Routing

### Expo Router (File-Based)

- Routes defined in `app/` directory
- Use **dynamic routes** with `[param].tsx`
- Use **groups** with `(group)/`
- Layout files: `_layout.tsx`

### Route Structure

```
app/
├── _layout.tsx           # Root layout
├── login.tsx             # /login
├── onboarding.tsx        # /onboarding
├── (app)/                # Tab group
│   ├── _layout.tsx       # Tab navigator
│   ├── index.tsx         # /
│   ├── settings.tsx      # /settings
│   └── style.tsx         # /style
└── feed/
    ├── [id].tsx          # /feed/:id
    └── add-post.tsx      # /feed/add-post
```

### Navigation

```tsx
import { router, useLocalSearchParams } from 'expo-router';

// Navigate
router.push('/feed/123');
router.replace('/login');
router.back();

// Get params
const { id } = useLocalSearchParams<{ id: string }>();
```

### Root Layout Example

```tsx
// app/_layout.tsx
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Providers>
      <Stack>
        <Stack.Screen name="(app)" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
      </Stack>
    </Providers>
  );
}
```

### Tab Layout Example

```tsx
// app/(app)/_layout.tsx
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Feed',
          tabBarIcon: ({ color }) => <FeedIcon color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <SettingsIcon color={color} />,
        }}
      />
    </Tabs>
  );
}
```

---

## 🌍 Internationalization

### Stack

- **react-i18next** + **i18next**
- Translation files in `src/translations/`
- Automatic language detection

### Usage

```tsx
import { translate } from '@/lib/i18n';

<Text>{translate('common.welcome')}</Text>
```

### Translation Files

```json
// src/translations/en.json
{
  "common": {
    "welcome": "Welcome",
    "submit": "Submit"
  },
  "auth": {
    "login": "Login",
    "email": "Email"
  }
}
```

---

## 🧪 Testing

### Stack

- **Jest** for unit tests
- **React Testing Library** for component tests
- **Maestro** for E2E tests

### Component Test Example

```tsx
// button.test.tsx
import { render, screen } from '@testing-library/react-native';
import { Button } from './button';

describe('Button', () => {
  it('renders label correctly', () => {
    render(<Button label="Click me" />);
    expect(screen.getByText('Click me')).toBeTruthy();
  });
});
```

### Run Tests

```bash
pnpm test           # Run tests
pnpm test:watch     # Watch mode
pnpm test:ci        # With coverage
```

---

## 🔧 VS Code Snippets

### Available Snippets

| Snippet | Description |
|---------|-------------|
| `useq` | Create a new query hook |
| `useqv` | Create a new query hook with variables |
| `useiq` | Create a new infinite query hook |
| `usem` | Create a new mutation hook |

### Example: `useq` Snippet

Type `useq` and tab to generate:

```tsx
export const usePosts = createQuery<PostsResponse, PostsVariables, AxiosError>({
  queryKey: ['posts'],
  fetcher: () => {
    return client.get(`posts`).then(response => response.data);
  },
});
```

---

## 🎯 Common Patterns

### Feature Creation

```bash
# Create feature structure
mkdir -p src/features/my-feature/components

# Create screen
touch src/features/my-feature/my-feature-screen.tsx

# Create route re-export
echo "export { MyFeatureScreen as default } from '@/features/my-feature/my-feature-screen';" > src/app/my-feature.tsx
```

### API Pattern

```tsx
// src/features/feed/api.ts
import type { AxiosError } from 'axios';
import { createQuery, createMutation } from 'react-query-kit';
import { client } from '@/lib/api';

// 1. Define types
export type Post = {
  id: number;
  title: string;
};

// 2. Create query
export const usePosts = createQuery<Post[], void, AxiosError>({
  queryKey: ['posts'],
  fetcher: () => client.get('posts').then(res => res.data),
});

// 3. Create mutation
export const useAddPost = createMutation<Post, Partial<Post>, AxiosError>({
  mutationFn: async (data) =>
    client.post('posts', data).then(res => res.data),
});
```

### Store Pattern

```tsx
import { create } from 'zustand';
import { createSelectors } from '@/lib/utils';

type State = {
  count: number;
  increment: () => void;
};

const _useStore = create<State>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));

export const useStore = createSelectors(_useStore);
```

### Screen Pattern

```tsx
// src/features/feed/feed-screen.tsx
import { FlashList } from '@shopify/flash-list';
import * as React from 'react';
import { EmptyList, FocusAwareStatusBar, View } from '@/components/ui';
import { usePosts } from './api';
import { PostCard } from './components/post-card';

export function FeedScreen() {
  const { data, isPending, isError } = usePosts();
  
  if (isError) {
    return <View><Text>Error loading data</Text></View>;
  }
  
  return (
    <View className="flex-1">
      <FocusAwareStatusBar />
      <FlashList
        data={data}
        renderItem={({ item }) => <PostCard {...item} />}
        ListEmptyComponent={<EmptyList isLoading={isPending} />}
      />
    </View>
  );
}
```

---

## ⚠️ Important Rules

### DO ✅

1. **Use kebab-case** for file and folder names
2. **Use absolute imports** with direct file paths (no barrel exports)
3. **Define Zod schemas** outside components for performance
4. **Validate on change** for better UX
5. **Use `EXPO_PUBLIC_*` prefix** for client-accessible env vars
6. **Keep screens in features** with `-screen.tsx` suffix
7. **Re-export screens** in `app/` for Expo Router
8. **Use `createQuery` and `createMutation`** from react-query-kit
9. **Use Zustand selectors** for optimized re-renders
10. **Follow feature-oriented structure** for new features

### DON'T ❌

1. ❌ Use `index.ts` barrel exports (breaks fast refresh)
2. ❌ Define types in separate `types.ts` files unless shared across features
3. ❌ Use Prettier (ESLint handles formatting)
4. ❌ Commit directly to `main` branch
5. ❌ Use non-prefixed env vars in client code
6. ❌ Put screens in `components/` folder
7. ❌ Create multiple folders in features (only `components/` allowed)
8. ❌ Mix relative and absolute imports inconsistently
9. ❌ Forget to run `pnpm prebuild` after env changes
10. ❌ Use `interface` instead of `type` (enforced by ESLint)

---

## 🔗 Resources

- **Official Docs**: https://starter.obytes.com/
- **GitHub**: https://github.com/obytes/react-native-template-obytes
- **Expo Docs**: https://docs.expo.dev/
- **React Query**: https://tanstack.com/query/latest
- **TanStack Form**: https://tanstack.com/form/latest
- **Zod**: https://zod.dev/
- **Tailwind CSS**: https://tailwindcss.com/

---

## 📦 Package Manager

**PNPM** is the required package manager (enforced by `preinstall` script).

```bash
pnpm install        # Install dependencies
pnpm start          # Start dev server
pnpm android        # Run on Android
pnpm ios            # Run on iOS
pnpm prebuild       # Generate native code
pnpm lint           # Run linter
pnpm test           # Run tests
```

---

## 🚀 Quick Start Checklist

When starting a new feature:

1. ✅ Create feature folder: `src/features/{feature-name}/`
2. ✅ Create screen: `{feature-name}-screen.tsx`
3. ✅ Create API file if needed: `api.ts`
4. ✅ Create components folder: `components/`
5. ✅ Create route re-export: `app/{feature-name}.tsx`
6. ✅ Add types inline or in feature root
7. ✅ Use absolute imports for cross-feature references
8. ✅ Follow naming conventions (kebab-case)
9. ✅ Add tests: `*.test.tsx`
10. ✅ Update translations if needed

---

**Happy Coding! 🎉**

> For questions or issues, refer to the [official documentation](https://starter.obytes.com/) or the starter's [GitHub discussions](https://github.com/obytes/react-native-template-obytes/discussions).
