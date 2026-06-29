# Availity Starter Vite TypeScript

> Template project for React web apps on the Availity Portal using [@availity/workflow-vite](https://github.com/Availity/availity-workflow) and TypeScript

## About Workflow Vite

This template uses `@availity/workflow-vite`, which is powered by [Vite](https://vite.dev/) and [Vitest](https://vitest.dev/) under the hood. Unlike the webpack-based `@availity/workflow`, this provides:

- ⚡ Instant dev server startup via Vite's native ESM support
- 🔥 Lightning-fast HMR (Hot Module Replacement)
- 📦 Optimized production builds using Rollup
- 🧪 Vitest for unit testing (Vite-native, Jest-compatible API)

The `av` CLI wraps Vite's dev server, build, and test tooling with Availity-specific defaults (proxying, mock data, deployment configuration).

## Requirements

- Node.js 22+ or 24+
- Yarn 4+

## Getting Started

```bash
yarn
yarn start
```

## Scripts

| Script                  | Description                  |
| ----------------------- | ---------------------------- |
| `yarn start`            | Start the development server |
| `yarn build`            | Build for development        |
| `yarn build:production` | Build for production         |
| `yarn build:staging`    | Build for staging            |
| `yarn test`             | Run tests (Vitest)           |
| `yarn test:watch`       | Run tests in watch mode      |
| `yarn test:coverage`    | Run tests with coverage      |
| `yarn lint`             | Lint source files (ESLint)   |
| `yarn format`           | Format files (Prettier)      |
| `yarn format:check`     | Check formatting             |

## Project Structure

```
project/
├── app/
│   ├── index.tsx          # App entry point
│   ├── index.html         # HTML template
│   ├── App.tsx            # Root component with routing
│   ├── components/        # Shared components
│   ├── Request/           # Request page feature
│   └── Response/          # Response page feature
├── config/
│   └── workflow.js        # Workflow configuration
└── data/                  # Mock API data for local development
```

## Configuration

| File                         | Purpose                                      |
| ---------------------------- | -------------------------------------------- |
| `project/config/workflow.js` | Dev server, Vite, and build configuration    |
| `eslint.config.js`          | ESLint flat config                           |
| `tsconfig.json`             | TypeScript configuration (type-checking only)|

This project uses ESM (`"type": "module"` in package.json). All config files use `import`/`export` syntax.

## Tech Stack

- **Build/Dev**: [@availity/workflow-vite](https://github.com/Availity/availity-workflow) (Vite + Vitest)
- **Components**: [@availity/element](https://availity.github.io/element/) (MUI-based design system)
- **Data Fetching**: [@tanstack/react-query](https://tanstack.com/query)
- **Forms**: [react-hook-form](https://react-hook-form.com/) + [@availity/yup](https://github.com/Availity/availity-workflow)
- **Routing**: [react-router-dom](https://reactrouter.com/)
- **Testing**: [Vitest](https://vitest.dev/) + [@testing-library/react](https://testing-library.com/docs/react-testing-library/intro/)
- **Linting**: [eslint-config-availity](https://github.com/Availity/eslint-config-availity) (flat config)

## Data Fetching

This template uses `@tanstack/react-query` for server state and data fetching.

### react-query Example

```tsx
import { useQuery } from '@tanstack/react-query';
import AvUsersApi from '@availity/api-axios';

const useCurrentUser = () =>
  useQuery({
    queryKey: ['user'],
    queryFn: () => AvUsersApi.me(),
  });

const Component = () => {
  const { data: user, isLoading } = useCurrentUser();

  if (isLoading) return null;

  return <p>{user ? user.name : 'A user has no name'}</p>;
};
```

> The `useCurrentUser` hook is available in [@availity/hooks](https://github.com/Availity/availity-react/tree/master/packages/hooks)

### Mutations

```tsx
import { useMutation } from '@tanstack/react-query';

const Component = () => {
  const { mutate, isPending, error } = useMutation({
    mutationFn: (variables) => updateUserInfo(variables),
  });

  return <button onClick={() => mutate({ active: false })}>Disable User</button>;
};
```

## Resources

- [Availity Docs Hub](https://availity.github.io/)
- [Availity Workflow Docs](https://availity.github.io/availity-workflow/)
- [Availity Element (Component Library)](https://availity.github.io/element/)
- [Availity React Packages](https://availity.github.io/availity-react/)
- [Availity JavaScript SDK](https://availity.github.io/sdk-js/)
- [TanStack Query Docs](https://tanstack.com/query)
- [Vite Documentation](https://vite.dev/)
- [Vitest Documentation](https://vitest.dev/)
