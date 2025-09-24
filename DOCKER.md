# BioVision Web Service - Docker Deployment

This document explains how to deploy the BioVision Web Service using Docker.

## Quick Start

### Using Docker Compose (Recommended)

```bash
# Build and start the service
docker-compose up --build -d

# View logs
docker-compose logs -f

# Stop the service
docker-compose down
```

### Using Docker directly

```bash
# Build the image
docker build -t biovision-web-service .

# Run the container
docker run -d \
  --name biovision-web \
  -p 8080:8080 \
  -e NODE_ENV=production \
  -e NEXT_PUBLIC_API_URL=http://localhost:5000 \
  biovision-web-service

# View logs
docker logs -f biovision-web

# Stop the container
docker stop biovision-web && docker rm biovision-web
```

## Environment Variables

Create a `.env.local` file based on `.env.example`:

```bash
cp .env.example .env.local
# Edit .env.local with your configuration
```

## Production Deployment

### Environment Variables

- `NODE_ENV=production`
- `NEXT_PUBLIC_API_URL` - Backend API URL
- `NEXT_PUBLIC_SERVER_URL` - Server URL for API calls
- `NEXT_TELEMETRY_DISABLED=1` - Disable Next.js telemetry

### Health Check

The service includes a health check endpoint:
- URL: `http://localhost:8080`
- Interval: 30s
- Timeout: 10s
- Retries: 3

### Ports

- **8080**: Web service port (mapped from container)

## Development

For development, use the regular npm commands:

```bash
npm run dev    # Start development server
npm run build  # Build for production
npm run start  # Start production server
```

## Troubleshooting

### Container won't start
- Check logs: `docker logs biovision-web`
- Verify environment variables
- Ensure port 8080 is not already in use

### Build fails
- Clear Docker cache: `docker system prune`
- Check Node.js version compatibility
- Verify all dependencies are properly installed

### Service not accessible
- Check if port 8080 is mapped correctly
- Verify firewall settings
- Ensure the backend API is running on port 5000