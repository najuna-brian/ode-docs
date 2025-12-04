---
sidebar_position: 2
---

# Synkronus Installation

Install and set up Synkronus server.

## Overview

Synkronus is the server backend for ODE that handles data synchronization, storage, and API requests. This guide covers different installation methods depending on your needs.

:::important[Before You Begin]

Make sure you have:
- Docker and Docker Compose installed (see [Setup Environment](/docs/quick-start/setup-environment))
- At least 2GB of free disk space
- Basic familiarity with Docker and command line

:::

## Installation Methods

<Tabs groupId="deployment">
  <TabItem value="docker" label="Docker (Recommended)">

### Docker Installation

The easiest way to run Synkronus is using Docker Compose. This is the recommended method for development and production.

#### Quick Start

1. **Clone the repository:**
   ```bash
   git clone https://github.com/opendataensemble/ode.git
   cd ode/synkronus
   ```

2. **Configure environment:**
   ```bash
   cp docker-compose.example.yml docker-compose.yml
   # Edit docker-compose.yml with your settings
   ```

3. **Start services:**
   ```bash
   docker compose up -d
   ```

4. **Verify installation:**
   ```bash
   curl http://localhost/health
   # Should return: OK
   ```

:::tip[Detailed Guide]

For a complete step-by-step guide, see [Deploy Local Instance](/docs/quick-start/deploy-local-instance).

:::

### Docker Requirements

<div>

- Docker 20.10 or higher
- Docker Compose 2.0 or higher
- 2GB+ RAM available
- 5GB+ disk space

</div>

  </TabItem>
  <TabItem value="source" label="From Source">

### Building from Source

For development or custom builds, you can build Synkronus from source.

#### Prerequisites

- Go 1.22 or higher
- PostgreSQL 12 or higher
- Make (optional, for build scripts)

#### Build Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/opendataensemble/ode.git
   cd ode/synkronus
   ```

2. **Install dependencies:**
   ```bash
   go mod download
   ```

3. **Build the binary:**
   ```bash
   go build -o bin/synkronus cmd/synkronus/main.go
   ```

4. **Configure environment:**
   ```bash
   export DB_CONNECTION="postgres://user:password@localhost:5432/synkronus?sslmode=disable"
   export JWT_SECRET="your-secret-key"
   export PORT=8080
   ```

5. **Run the server:**
   ```bash
   ./bin/synkronus
   ```

:::info[Development Setup]

For development, you may want to use `go run` instead of building:

```bash
go run cmd/synkronus/main.go
```

:::

### Source Build Requirements

<div>

- Go 1.22+
- PostgreSQL 12+
- 1GB+ RAM
- 2GB+ disk space

</div>

  </TabItem>
  <TabItem value="production" label="Production">

### Production Deployment

For production deployments, see the comprehensive hosting guide.

:::important[Production Considerations]

Production deployments require:
- Proper security configuration
- TLS/SSL certificates
- Database backups
- Monitoring and logging
- Load balancing (if needed)

:::

#### Quick Links

- [Production Deployment Guide](/docs/host/synkronus-server/production)
- [Docker Deployment](/docs/host/synkronus-server/docker)
- [Kubernetes Deployment](/docs/host/synkronus-server/kubernetes)
- [Cloud Deployment](/docs/host/synkronus-server/cloud)

### Production Requirements

<div>

- Docker or container orchestration
- PostgreSQL database (managed or self-hosted)
- TLS/SSL certificates
- Monitoring tools
- Backup solution

</div>

  </TabItem>
</Tabs>

## Prerequisites

### Required Software

- **Docker** (for Docker installation)
  - Version: 20.10 or higher
  - Installation: [Docker Installation Guide](https://docs.docker.com/get-docker/)

- **PostgreSQL** (for source builds)
  - Version: 12 or higher
  - Installation: [PostgreSQL Downloads](https://www.postgresql.org/download/)

- **Go** (for source builds)
  - Version: 1.22 or higher
  - Installation: [Go Downloads](https://golang.org/dl/)

### System Requirements

- **RAM**: 2GB minimum, 4GB+ recommended
- **Disk Space**: 5GB minimum, 20GB+ recommended
- **CPU**: 2 cores minimum, 4+ cores recommended

## Verification

After installation, verify Synkronus is working:

```bash
# Check health endpoint
curl http://localhost/health

# Expected output: OK

# Test authentication
curl -X POST http://localhost/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"YOUR_PASSWORD"}'

# Expected output: JSON with token
```

:::success[Installation Complete]

Synkronus is now installed and running! Next, configure it for your use case.

:::

## Next Steps

After installing Synkronus:

1. ✅ [Configure Synkronus](/docs/components/synkronus/configuration) - Set up your server
2. ✅ [Upload Test Data](/docs/quick-start/upload-test-data) - Add sample data
3. ✅ [Connect Formulus](/docs/components/formulus/configuration) - Connect mobile app
4. ✅ [API Reference](/docs/components/synkronus/api-reference) - Explore the API

## Troubleshooting

### Services Not Starting

**Problem:** Docker services fail to start

**Solutions:**
- Check Docker is running: `docker ps`
- Check logs: `docker compose logs`
- Verify ports are available: `sudo lsof -i :80`
- Check disk space: `df -h`

### Database Connection Issues

**Problem:** Cannot connect to database

**Solutions:**
- Verify PostgreSQL is running
- Check connection string format
- Verify database exists
- Check firewall settings

### Port Already in Use

**Problem:** Port 80 or 8080 already in use

**Solutions:**
- Find what's using the port: `sudo lsof -i :80`
- Stop conflicting service
- Change port in configuration

## Related Content

- [Configuration](/docs/components/synkronus/configuration) - Configure your Synkronus instance
- [Quick Start](/docs/quick-start/synkronus-server) - Complete setup guide
- [API Reference](/docs/components/synkronus/api-reference) - API documentation
- [Hosting Guide](/docs/host/synkronus-server/overview) - Production deployment
