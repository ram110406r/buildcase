# Buildcase

Welcome to **Buildcase**! This is a modern frontend React application bootstrapped with [Vite](https://vitejs.dev/) and configured with a top-tier tech stack for performance, developer experience, and beautiful UI.

## 🚀 Tech Stack

This project leverages the following modern tools and frameworks:

### Core
- **[React](https://react.dev/) (v18)**: Core UI library.
- **[TypeScript](https://www.typescriptlang.org/)**: For robust type safety and excellent developer tooling.
- **[Vite](https://vitejs.dev/)**: Next-generation, lightning-fast frontend tooling and development server.

### Styling & UI Components
- **[Tailwind CSS](https://tailwindcss.com/)**: A utility-first CSS framework for rapid UI development.
- **[shadcn-ui](https://ui.shadcn.com/)** & **[Radix UI](https://www.radix-ui.com/)**: Accessible, unstyled component primitives combined with Tailwind for building high-quality design systems.
- **[Framer Motion](https://www.framer.com/motion/)**: Production-ready animation library for React.
- **[Lucide React](https://lucide.dev/)**: Beautiful and consistent icons.

### Data & State Management
- **[React Query](https://tanstack.com/query/latest) (@tanstack/react-query)**: Powerful asynchronous state management, caching, and synchronization for server data.
- **[React Router](https://reactrouter.dom/) (v6)**: Client-side routing for seamless page navigation.

### Forms & Validation
- **[React Hook Form](https://react-hook-form.com/)**: Performant, flexible, and extensible forms with easy-to-use validation.
- **[Zod](https://zod.dev/)**: TypeScript-first schema declaration and validation library.

### Testing & QA
- **[Vitest](https://vitest.dev/)**: A blazing fast unit test framework powered by Vite.
- **[Playwright](https://playwright.dev/)**: Reliable end-to-end testing for modern web apps.
- **[ESLint](https://eslint.org/)**: Pluggable linting utility for catching errors early.

## 📂 Project Structure

```text
buildcase/
├── src/
│   ├── components/       # Reusable UI components (including shadcn-ui in `ui/`)
│   │   ├── ui/           # Foundational shadcn components
│   │   ├── AppLayout.tsx # Main application layout wrapper
│   │   └── AppSidebar.tsx# Navigation sidebar component
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions and shared helpers
│   ├── pages/            # Application route views (e.g., Dashboard, Research, Specs)
│   ├── test/             # Test utilities and configurations
│   ├── App.tsx           # Root React component and routing setup
│   ├── index.css         # Global styles and Tailwind directives
│   └── main.tsx          # Application entry point
├── public/               # Static assets
├── eslint.config.js      # ESLint configuration
├── playwright.config.ts  # Playwright E2E configuration 
├── tailwind.config.ts    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configurations
├── vite.config.ts        # Vite configuration
└── vitest.config.ts      # Vitest configuration
```

## 🛠️ Getting Started

To get a local copy up and running, follow these steps.

### Prerequisites
Make sure you have Node.js and npm (or Bun, which has a lockfile included) installed. We recommend Node.js v18 or later.

### Installation

1. **Clone the repository:**
   ```sh
   git clone <YOUR_GIT_URL>
   cd buildcase
   ```

2. **Install the dependencies:**
   ```sh
   npm install
   # or with bun: bun install
   ```

### Running the App

Start the development server with Hot Module Replacement (HMR):

```sh
npm run dev
# or with bun: bun run dev
```

Open your browser and navigate to `http://localhost:5173` (or the port specified in your terminal).

## 🧪 Testing

The project is configured for both unit tests and end-to-end testing.

**Run unit tests (Vitest):**
```sh
npm run test
```

**Watch mode for unit tests:**
```sh
npm run test:watch
```

*(For E2E tests, refer to `playwright.config.ts` and ensure Playwright browsers are installed via `npx playwright install`)*

## 📦 Building for Production

To create a production-ready build:

```sh
npm run build
```

This command bundles the app using Vite, minifying assets and optimizing them for deployment. You can test the production build locally with:

```sh
npm run preview
```
