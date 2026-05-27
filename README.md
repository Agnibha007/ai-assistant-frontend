# AI Desktop Assistant - Web UI

Modern interface for interacting with the AI Desktop Assistant. Built with Next.js 15, React, Tailwind CSS, and shadcn/ui.

## 🚀 Features

- **Live Chat**: Interact with the assistant in real-time.
- **Task History**: View past tasks and their execution results.
- **System Monitoring**: Live logs and status of the Host Bridge connection.
- **Permission Management**: Toggle permissions for sensitive OS-level operations.

## 🛠️ Technology Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Components**: [shadcn/ui](https://ui.shadcn.com/)
- **State Management**: React Context / Hooks

## 🚦 Getting Started

### Prerequisites

- Node.js 18.17.0 or later
- `npm` or `pnpm`

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env.local` file in this directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Development

```bash
npm run dev
```

### Building for Production

```bash
npm run build
npm run start
```

## 🧪 Linting & Testing

```bash
npm run lint
```

## 📄 Production Deployment

This application is optimized for deployment on **Vercel**. Ensure `NEXT_PUBLIC_API_URL` is set to your production backend URL in the Vercel dashboard.
