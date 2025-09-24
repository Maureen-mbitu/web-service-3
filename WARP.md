# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is the **BioVision Africa Trust** web service - a Next.js 15 application focused on promoting agroecology and sustainable farming practices across Africa. The platform connects farmers, consumers, and organic product providers through certified outlets, events, training programs, and educational resources.

## Common Development Commands

### Development
```powershell
# Start development server with turbopack (runs on port 8080)
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Lint the codebase
npm run lint
```

### Docker Development
```powershell
# Build and run with Docker Compose
docker-compose up --build -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Build image directly
docker build -t biovision-web-service .

# Run container directly
docker run -d --name biovision-web -p 8080:8080 biovision-web-service
```

### Environment Setup
```powershell
# Copy environment template
copy .env.example .env.local

# Note: Edit .env.local with your API configuration
# Default API runs on localhost:5000
# Web service runs on localhost:8080
```

## Architecture Overview

### Application Structure
- **Next.js 15 App Router**: Uses the modern app directory structure with server/client components
- **TypeScript**: Fully typed codebase with path aliases (`@/*` maps to `./`)
- **Tailwind CSS**: Utility-first CSS framework with custom configuration
- **Component Architecture**: Organized into reusable UI components and page-specific components

### Key Directories
- `app/` - Next.js app router pages and layouts
  - `app/page.tsx` - Main homepage with hero sections, featured products, events, and outlets
  - `app/layout.tsx` - Root layout with header wrapper and global styles
  - Route-based organization (e.g., `app/events/`, `app/mission/`, `app/contact/`)
- `components/` - Reusable React components
  - `components/ui/` - Base UI components (buttons, cards, inputs, etc.)
  - `components/admin/` - Admin-specific components
- `lib/` - Core utilities and business logic
  - `lib/api.ts` - Centralized API client with typed endpoints
  - `lib/constants.ts` - Fallback data and application constants
  - `lib/utils.ts` - Utility functions
  - `lib/validators.ts` - Input validation logic
- `contexts/` - React context providers
- `public/` - Static assets (images, videos)

### API Integration
The frontend integrates with a backend API (expected on port 5000) through a centralized API client:

```typescript
// All API calls go through lib/api.ts
productApi.getAll({ limit: 6 })
eventApi.getUpcoming()
outletApi.getAll({ limit: 4 })
contentApi.getAll()
surveyApi.getAll()
```

**Fallback Data**: The app includes comprehensive fallback data in `lib/constants.ts` for when API calls fail, ensuring the application remains functional during development or API downtime.

### Data Flow
1. **Homepage (`app/page.tsx`)**: Fetches featured products, upcoming events, and outlet data
2. **API Layer (`lib/api.ts`)**: Handles all backend communication with error handling
3. **Fallback System**: Uses static fallback data when APIs are unavailable
4. **Component Rendering**: Client-side rendering with loading states and error boundaries

### TypeScript Configuration
- Target: ES2017
- Strict mode enabled
- Path aliases configured (`@/*` → `./`)
- Next.js plugin integration
- Build errors ignored in production (see `next.config.ts`)

### Styling System
- **Tailwind CSS 4.x**: Latest version with utility-first approach
- **Custom Color Scheme**: Green-focused palette (#2E7D32, #3d8640) reflecting agricultural theme
- **Responsive Design**: Mobile-first approach with breakpoints
- **Component Variants**: Uses `class-variance-authority` for component styling

## Development Patterns

### Component Organization
- Use client components (`"use client"`) for interactive elements
- Server components by default for better performance  
- Organize routes using app directory structure
- Keep page components focused, extract complex logic to separate components

### API Error Handling
Always implement fallback data patterns:
```typescript
const [data, setData] = useState([]);
try {
  const response = await api.getData();
  setData(response.data || FALLBACK_DATA);
} catch (error) {
  console.error('API error:', error);
  setData(FALLBACK_DATA);
}
```

### State Management
- Use React hooks for local state
- Context providers for global state (see `contexts/` directory)
- No external state management library currently in use

### Routing and Navigation
- Use Next.js `useRouter` hook for programmatic navigation
- Implement proper loading states during navigation
- Handle route-specific styling (e.g., header themes based on route)

## Environment Variables

Key environment variables (see `.env.example`):
- `NEXT_PUBLIC_API_URL` - Backend API base URL (default: http://localhost:5000)
- `NEXT_PUBLIC_SERVER_URL` - Server URL for API calls
- `NODE_ENV` - Environment mode
- `NEXT_TELEMETRY_DISABLED` - Disable Next.js telemetry

## Port Configuration

- **Development Server**: 8080 (configured via `--port` flag in package.json)
- **Backend API**: 5000 (expected)
- **Production Docker**: 8080 (mapped from container)

## Testing

Currently no test framework is configured. When implementing tests:
- Consider Jest + React Testing Library for unit tests
- Use Playwright or Cypress for E2E testing
- Test API integration with mock data
- Validate fallback data scenarios

## Docker Deployment

The application is containerized and production-ready:
- Multi-stage Dockerfile optimized for Next.js
- Docker Compose configuration for easy deployment
- Health checks configured
- Environment variable support
- Production-ready with proper logging

## Key Dependencies

**Framework & Core**:
- `next` ^15.3.5 - React framework
- `react` ^19.1.1 - UI library
- `typescript` ^5 - Type safety

**UI & Styling**:
- `tailwindcss` ^4.1.11 - CSS framework
- `@radix-ui/*` - Accessible UI primitives
- `lucide-react` - Icon library

**Mapping & Location**:
- `leaflet` + `react-leaflet` - Interactive maps for outlet locations

**Backend Integration**:
- Native `fetch` API - No external HTTP client
- Express server integration capability

This architecture supports the mission of BioVision Africa Trust by providing a scalable, maintainable platform that connects stakeholders in the agroecological ecosystem across Africa.