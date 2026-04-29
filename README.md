# Habu

A web-based budget management application to help users track expenses, set goals, and visualize their financial data.

## Tech Stack

- React 19
- TypeScript
- Vite 8
- React Router 7
- Axios
- Shadcn ui
- Tailwind CSS 4
- Zod + TanStack React Form

## Project Structure

```text
src/
  api/                   # API gateway to backend
    ...
  components/            # Reusable UI components
    ...
  contexts/              # React contexts
    ...
  data/                  # Constant data for project
    ...
  hooks/                 # React hooks
    ...
  lib/                   # Helper functions
    ...
  pages/                 # Application pages
    ...
  schema/                # Schemas for forms etc.
    ...
  types/                 # Typescript types
    ...
```

## Prerequisites

- Node.js (LTS recommended)
- npm

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Configure environment variables by creating `.env` in the project root:

```env
VITE_API_URL=http://localhost:3000/api
```

If `VITE_API_URL` is not set, the app defaults to `http://localhost:3000/api`. You can find backend [here](https://github.com/hammad-iftikhar/habu-backend.git).

3. Start the development server:

```bash
npm run dev
```

The Vite dev server runs with `--host`, so it is accessible on your local network as well.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Type-check and build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint
- `npm run format` - Format files with Prettier
