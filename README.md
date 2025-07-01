# Dashboard - React + Vite + Tailwind + shadcn/ui

This project has been converted from Next.js to a modern React + Vite setup with Tailwind CSS and shadcn/ui components.

## 🚀 Features

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **shadcn/ui** for beautiful, accessible components
- **React Router** for client-side routing
- **Dark/Light theme** support
- **Responsive design**

## 📦 Tech Stack

- React 18.3.1
- Vite 5.3.4
- TypeScript 5
- Tailwind CSS 3.4.1
- React Router DOM 6.28.0
- shadcn/ui components
- Lucide React icons
- Recharts for data visualization

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Building for Production

Build the application:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── dashboard/      # Dashboard-specific components
│   ├── courses/        # Course-related components
│   └── ...
├── pages/              # Page components
│   └── Dashboard.tsx   # Main dashboard page
├── data/               # Mock data and types
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── App.tsx             # Main app component
├── main.tsx            # Entry point
└── index.css           # Global styles
```

## 🔧 Configuration Files

- `vite.config.ts` - Vite configuration
- `tailwind.config.ts` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration
- `postcss.config.js` - PostCSS configuration
- `.eslintrc.cjs` - ESLint configuration

## 🎨 Styling

The project uses Tailwind CSS with a custom design system that includes:

- CSS custom properties for theming
- Dark/light mode support
- Custom color palette
- Responsive design utilities

## 🚀 Migration Notes

This project was converted from Next.js to Vite. Key changes include:

- Replaced Next.js routing with React Router
- Removed Next.js specific imports (`next/navigation`, `next/link`, `next/image`)
- Converted from App Router to pages structure
- Updated build configuration for Vite
- Removed "use client" directives (not needed in Vite)

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License. 