# 📬 Easy Post IA Frontend

Welcome to the **Easy Post IA Frontend**! This is a modern React application built with TypeScript, Vite, and Material-UI that provides the user interface for the Easy Post IA social media management platform.

## 🏗️ Architecture Overview

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **UI Library**: Material-UI (MUI)
- **State Management**: Zustand + React Query
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Testing**: Vitest + Puppeteer (E2E)
- **Mobile**: Capacitor for cross-platform apps
- **Styling**: Emotion + Tailwind CSS

## 📦 Prerequisites

Ensure you have the following installed:

- **Node.js** (v20.17.0 or higher)
- **npm** (v10.8.2 or higher)
- **Docker** (optional, for containerized development)

## 🚀 Quick Start

### Option 1: Local Development

#### 1. Clone the repository
```bash
git clone https://github.com/your-username/easy-post-ia-frontend.git
cd easy-post-ia-frontend
```

#### 2. Install dependencies
```bash
npm install
```

#### 3. Setup environment variables
```bash
cp .env.example .env
# Edit .env with your local configurations
```

#### 4. Start the development server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

### Option 2: Docker Development

#### 1. Build and run with Docker
```bash
# Build the image
docker build -t easy-post-ia-frontend .

# Run the container
docker run -p 5173:5173 -v $(pwd):/app easy-post-ia-frontend
```

#### 2. Or use Docker Compose
```bash
docker-compose up --build
```

## 🧪 Testing

### Run all tests
```bash
npm run test
```

### Run specific test types
```bash
# Unit tests
npm run test:unit

# Integration tests
npm run test:integration

# E2E tests
npm run test:e2e

# E2E tests with custom configuration
VITE_E2E_HEADLESS=false VITE_E2E_SLOWMO=100 npm run test:e2e
```

### Test coverage
```bash
npm run test:coverage
```

## 🏗️ Building for Production

### Build the application
```bash
npm run build
```

### Preview production build
```bash
npm run preview
```

### Build for different environments
```bash
# Development
npm run build:dev

# Staging
npm run build:staging

# Production
npm run build:prod
```

## 📱 Mobile Development

### Build for iOS
```bash
npm run buildIOS
```

### Build for Android
```bash
npm run buildAndroid
```

### Sync with Capacitor
```bash
npx cap sync
```

## 🔧 Key Features

### Authentication & Authorization
- **JWT-based authentication** with automatic token refresh
- **Role-based access control** (Admin, Employer, Employee)
- **Protected routes** with automatic redirects
- **Session management** with persistent login

### Core Modules
- **Dashboard**: Analytics, metrics, and overview
- **Posts Management**: Create, edit, schedule, and publish posts
- **Templates**: Reusable content templates with categories
- **Strategies**: Marketing campaign planning and management
- **User Management**: Profile settings and team management
- **Notifications**: Real-time alerts and status updates

### UI/UX Features
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Dark/Light Mode**: Theme switching with system preference detection
- **Internationalization**: Multi-language support (English, Spanish)
- **Accessibility**: WCAG 2.1 AA compliant
- **Progressive Web App**: Offline capabilities and app-like experience

## 🛡️ Security

### Security Features
- **HTTPS Only**: All API calls use secure connections
- **XSS Protection**: Input sanitization and output encoding
- **CSRF Protection**: Token-based request validation
- **Content Security Policy**: Restrictive CSP headers
- **Secure Headers**: Security-focused HTTP headers

### Environment Variables
```bash
# API Configuration
VITE_BASE_API_URL=http://localhost:3000/api/v1
VITE_BASE_FRONT_URL=http://localhost:5173

# Testing Configuration
VITE_E2E_HEADLESS=false
VITE_E2E_SLOWMO=10

# Feature Flags
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_DEBUG_MODE=false
```

## 🐳 Docker Deployment

### Production Dockerfile
```dockerfile
# Multi-stage build for production
FROM node:20-alpine as builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built assets
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
```

### Nginx Configuration
```nginx
events {
    worker_connections 1024;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;

    server {
        listen 80;
        server_name localhost;
        root /usr/share/nginx/html;
        index index.html;

        # Security headers
        add_header X-Frame-Options "SAMEORIGIN" always;
        add_header X-XSS-Protection "1; mode=block" always;
        add_header X-Content-Type-Options "nosniff" always;
        add_header Referrer-Policy "no-referrer-when-downgrade" always;
        add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:;" always;

        # Handle client-side routing
        location / {
            try_files $uri $uri/ /index.html;
        }

        # Cache static assets
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }

        # API proxy (if needed)
        location /api/ {
            proxy_pass http://backend:3000;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        # Health check
        location /health {
            access_log off;
            return 200 "healthy\n";
            add_header Content-Type text/plain;
        }
    }
}
```

### Docker Compose for Production
```yaml
version: '3.8'
services:
  frontend:
    build: .
    ports:
      - "80:80"
    environment:
      - NODE_ENV=production
    depends_on:
      - backend
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf

  backend:
    image: easy-post-ia-backend:latest
    ports:
      - "3000:3000"
    environment:
      - RAILS_ENV=production
      - DATABASE_URL=postgresql://postgres:password@db:5432/easy_post_ia_production
      - REDIS_URL=redis://redis:6379/0
    depends_on:
      - db
      - redis

  db:
    image: postgres:14
    environment:
      - POSTGRES_DB=easy_post_ia_production
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:6-alpine
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  redis_data:
```

## 🔄 CI/CD Pipeline

### GitHub Actions Example
```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '20'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run linting
      run: npm run lint
    
    - name: Run tests
      run: npm run test
    
    - name: Run E2E tests
      run: npm run test:e2e
      env:
        VITE_E2E_HEADLESS: true
    
    - name: Build application
      run: npm run build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
    - name: Deploy to production
      run: |
        echo "Deploying to production..."
        # Add your deployment commands here
```

## 📊 Performance Optimization

### Bundle Optimization
```javascript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          mui: ['@mui/material', '@mui/icons-material'],
          router: ['react-router-dom'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
})
```

### Code Splitting
```typescript
// Lazy load components
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Posts = lazy(() => import('./pages/Posts'));
const Templates = lazy(() => import('./pages/Templates'));
```

### Image Optimization
```typescript
// Use WebP format when supported
const ImageComponent = ({ src, alt, ...props }) => {
  const [imageSrc, setImageSrc] = useState(src);
  
  useEffect(() => {
    if (window.Modernizr && window.Modernizr.webp) {
      setImageSrc(src.replace(/\.(jpg|png)$/, '.webp'));
    }
  }, [src]);
  
  return <img src={imageSrc} alt={alt} {...props} />;
};
```

## 🔧 Development Tools

### Code Quality
```bash
# Linting with ESLint
npm run lint

# Oxlint for additional checks
npm run lintox

# Formatting with Prettier
npm run format

# Type checking
npm run type-check
```

### Development Commands
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run E2E tests
npm run test:e2e

# Generate mobile builds
npm run buildIOS
npm run buildAndroid
```

### Useful Scripts
```bash
# Prepare Husky hooks
npm run prepare

# Clean build artifacts
npm run clean

# Analyze bundle size
npm run analyze

# Generate API types
npm run generate:types
```

## 📚 Component Architecture

### Directory Structure
```
src/
├── components/          # Reusable components
│   ├── auth/           # Authentication components
│   ├── posts/          # Post management components
│   ├── templates/      # Template components
│   ├── strategy/       # Strategy components
│   ├── dashboard/      # Dashboard components
│   ├── navbar/         # Navigation components
│   ├── loading/        # Loading states
│   └── notifications/  # Notification components
├── hooks/              # Custom React hooks
├── services/           # API services
├── stores/             # State management (Zustand)
├── utils/              # Utility functions
├── models/             # TypeScript type definitions
├── pages/              # Page components
└── router/             # Routing configuration
```

### State Management
```typescript
// Zustand store example
interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
}

const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  login: async (credentials) => {
    const response = await authService.login(credentials);
    set({ user: response.user, isAuthenticated: true });
  },
  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
}));
```

## 🌐 Browser Support

- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+
- **Mobile**: iOS Safari 14+, Chrome Mobile 90+

## 📱 Progressive Web App

### PWA Features
- **Offline Support**: Service worker for offline functionality
- **App-like Experience**: Full-screen mode and native feel
- **Push Notifications**: Real-time updates
- **Install Prompt**: Add to home screen functionality

### Service Worker Configuration
```typescript
// vite.config.ts
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\./,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24, // 24 hours
              },
            },
          },
        ],
      },
    }),
  ],
});
```

## 📈 Monitoring & Analytics

### Performance Monitoring
- **Web Vitals**: Core Web Vitals tracking
- **Error Tracking**: Sentry integration
- **User Analytics**: Google Analytics 4
- **Performance Monitoring**: New Relic Browser

### Error Boundaries
```typescript
class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    // Send to error tracking service
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }

    return this.props.children;
  }
}
```

## 🔧 Environment Configuration

### Development Environment
```bash
# .env.development
VITE_BASE_API_URL=http://localhost:3000/api/v1
VITE_BASE_FRONT_URL=http://localhost:5173
VITE_ENABLE_DEBUG_MODE=true
VITE_ENABLE_ANALYTICS=false
```

### Production Environment
```bash
# .env.production
VITE_BASE_API_URL=https://api.easy-post-ia.com/api/v1
VITE_BASE_FRONT_URL=https://easy-post-ia.com
VITE_ENABLE_DEBUG_MODE=false
VITE_ENABLE_ANALYTICS=true
```

## 📚 Additional Documentation

- **Technical Documentation**: [DOCUMENTACION_TECNICA.md](../easy-post-ia-backend/DOCUMENTACION_TECNICA.md)
- **API Documentation**: https://easy-post-ia.com/api/docs
- **Component Library**: Storybook (if available)
- **Design System**: Material-UI documentation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Write unit tests for new components
- Use conventional commits
- Ensure accessibility compliance
- Test on multiple browsers and devices

## 📄 License

Easy Post IA © 2024 by Santiago Toquica Yanguas is licensed under Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International. To view a copy of this license, visit [https://creativecommons.org/licenses/by-nc-nd/4.0/](https://creativecommons.org/licenses/by-nc-nd/4.0/).

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/your-username/easy-post-ia-frontend/issues)
- **Documentation**: [Technical Documentation](../easy-post-ia-backend/DOCUMENTACION_TECNICA.md)
- **Email**: frontend@easy-post-ia.com
