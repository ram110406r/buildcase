# Buildcase

**Buildcase** is a professional decision instrument and project diagnostic suite. It transforms the typical "SaaS dashboard" into a calm, focused, retro-industrial environment reminiscent of analog diagnostic hardware and control consoles.

Built with a precision tech stack for architects, engineers, and high-level project managers who require clarity over clutter.

---

## 🏛️ Visual Philosophy: "The Decision Instrument"

Buildcase departs from generic modern UI trends, opting for a **"Retro Diagnostic Machine"** aesthetic:
- **Parchment & Ink Palette**: Warm backgrounds with sharp, dark-ink typography.
- **Instrument Console Layout**: Sidebar and panels designed as physical hardware modules.
- **Monospaced Utility**: IBM Plex Mono for technical data and labels.
- **Purposeful Motion**: Subtle micro-animations (fade-ups, dot-indicators) that mimic an analog readout.

---

## 🛠️ Modules & Features

Buildcase is organized into specialized diagnostic modules:

- **Dashboard**: High-level telemetry and status overview of all active initiatives.
- **Research**: Repository for market insights, data extraction, and competitive analysis.
- **Analysis**: Deep-dive logic engine for processing complex data and project variables.
- **Specs**: The "Schematics" room — housing technical requirements and architecture blueprints.
- **Build Tasks**: Operational command center for tracking development and engineering progress.
- **Bug Reports**: Diagnostic terminal for identifying and triaging system anomalies.

---

## 🚀 Technical Stack

A robust foundation focused on performance and reliability:

- **Frontend**: [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/)
- **State & Data**: [TanStack Query](https://tanstack.com/query/latest) (v5)
- **Routing**: [React Router](https://reactrouter.com/) (v6)
- **Forms**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Testing**: [Vitest](https://vitest.dev/) & [Playwright](https://playwright.dev/)

---

## 📂 Project Structure

```text
buildcase/
├── src/
│   ├── components/       # UI instrumentation (shadcn + custom console parts)
│   ├── hooks/            # Logic & sensory hooks
│   ├── lib/              # Diagnostic utilities & shared helpers
│   ├── pages/            # Core diagnostic modules (Dashboard, Research, etc.)
│   ├── App.tsx           # Telemetry routing entry
│   └── index.css         # Global aesthetics & hardware themes
├── public/               # Static schematics & assets
├── playwright.config.ts  # E2E diagnostic config
├── tailwind.config.ts    # Aesthetic token definitions
└── vite.config.ts        # Propulsion settings
```

---

## 🛠️ Operational Guide

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- [Bun](https://bun.sh/) (Optional, recommended for performance)

### Installation
1. Clone the instrument:
   ```sh
   git clone <REPOSITORY_URL>
   cd idea-architect
   ```
2. Install components:
   ```sh
   npm install
   # or
   bun install
   ```

### Execution
Start the machine in development mode:
```sh
npm run dev
```
Navigate to `http://localhost:5173`.

### Quality Assurance
- **Unit Tests**: `npm run test`
- **Build Production**: `npm run build`

---

## ⚖️ License

Distributed under the MIT License. See `LICENSE` for more information.
