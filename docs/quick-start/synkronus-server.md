---
sidebar_position: 2
---

# Setting Up Synkronus Server

Set up and configure the Synkronus server backend for your ODE deployment.

## Overview

Synkronus is the server backend for ODE that handles data synchronization, storage, and API requests. This guide covers setting up Synkronus for local development and testing.

:::important[Prerequisites]

Before setting up Synkronus, ensure you have:
- Docker and Docker Compose installed (see [Setup Environment](/docs/quick-start/setup-environment))
- At least 2GB of free disk space
- Basic familiarity with Docker and command line

:::

## Quick Start with Docker

The easiest way to run Synkronus is using Docker Compose.

### Step 1: Clone Repository

```bash
# Clone the ODE repository
git clone https://github.com/opendataensemble/ode.git
cd ode/synkronus

# Verify you're in the right directory
ls -la
# You should see: docker-compose.yml, Dockerfile, README.md, etc.
```

### Step 2: Configure Environment

```bash
# Copy the example configuration
cp docker-compose.example.yml docker-compose.yml

# Generate secure secrets
JWT_SECRET=$(openssl rand -base64 32)
DB_ROOT_PASSWORD=$(openssl rand -base64 24)
ADMIN_PASSWORD=$(openssl rand -base64 16)

# Save these secrets - you'll need them!
echo "JWT_SECRET: $JWT_SECRET"
echo "DB_ROOT_PASSWORD: $DB_ROOT_PASSWORD"
echo "ADMIN_PASSWORD: $ADMIN_PASSWORD"
```

:::warning[Save Your Secrets]

**IMPORTANT:** Save these secrets securely! You'll need the `ADMIN_PASSWORD` to log into the server.

:::

### Step 3: Update Configuration

Update `docker-compose.yml` with your generated secrets:

```bash
# Update docker-compose.yml
sed -i "s/CHANGE_THIS_PASSWORD/$DB_ROOT_PASSWORD/g" docker-compose.yml
sed -i "s/CHANGE_THIS_TO_RANDOM_32_CHAR_STRING/$JWT_SECRET/g" docker-compose.yml
sed -i "s/CHANGE_THIS_ADMIN_PASSWORD/$ADMIN_PASSWORD/g" docker-compose.yml
```

### Step 4: Start Services

```bash
# Start all services
docker compose up -d

# Watch the logs
docker compose logs -f
```

Press `Ctrl+C` to stop watching logs (services continue running).

### Step 5: Verify Installation

```bash
# Check service status
docker compose ps

# Test health endpoint
curl http://localhost/health

# Should return: OK
```

:::success[Server Running]

If the health endpoint returns `OK`, your Synkronus server is running!

:::

## Detailed Setup

### Architecture

Synkronus uses a multi-container setup:

```
┌─────────────────────────────────┐
│      Docker Compose Setup        │
│                                  │
│  ┌─────────┐    ┌───────────┐   │
│  │  Nginx  │───▶│ Synkronus │   │
│  │         │    │ Go Server │   │
│  └─────────┘    └───────────┘   │
│       │                │          │
│       │                │          │
│       ▼                ▼          │
│  ┌─────────┐    ┌───────────┐   │
│  │ Static  │    │PostgreSQL  │   │
│  │   UI    │    │  Database  │   │
│  └─────────┘    └───────────┘   │
└─────────────────────────────────┘
```

### Services

- **Nginx**: Reverse proxy and static file server
- **Synkronus**: Go application server
- **PostgreSQL**: Database for data storage

### Configuration Options

Key environment variables in `docker-compose.yml`:

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | HTTP server port | `8080` |
| `DB_CONNECTION` | PostgreSQL connection string | (required) |
| `JWT_SECRET` | Secret for JWT token signing | (required) |
| `ADMIN_USERNAME` | Admin user username | `admin` |
| `ADMIN_PASSWORD` | Admin user password | (required) |
| `LOG_LEVEL` | Logging level | `info` |

### Database Setup

#### Create Database and User

```bash
# Connect to PostgreSQL
docker compose exec postgres psql -U postgres
```

In the psql prompt:

```sql
-- Create user
CREATE ROLE synkronus_user LOGIN PASSWORD 'synkronus_password_123';

-- Create database
CREATE DATABASE synkronus OWNER synkronus_user;

-- Exit
\q
```

#### Update Database Connection

Update `DB_CONNECTION` in `docker-compose.yml`:

```yaml
DB_CONNECTION: "postgres://synkronus_user:synkronus_password_123@postgres:5432/synkronus?sslmode=disable"
```

Restart the service:

```bash
docker compose restart synkronus
```

### Health Checks

Synkronus includes health checks to ensure services are running correctly:

```bash
# Check health status
docker compose ps

# All services should show as (healthy)
```

If services are unhealthy, check logs:

```bash
docker compose logs synkronus
docker compose logs postgres
docker compose logs nginx
```

## Accessing Your Server

### Web Interface

- **Health Check**: `http://localhost/health`
- **API Base**: `http://localhost/api/v1/`
- **API Documentation**: See [API Reference](/api)

### Default Credentials

- **Username**: `admin`
- **Password**: The `ADMIN_PASSWORD` you generated

### Testing Authentication

```bash
# Get authentication token
curl -X POST http://localhost/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"YOUR_ADMIN_PASSWORD"}'
```

Expected response:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "...",
  "expiresAt": "2025-01-01T12:00:00Z"
}
```

## Common Operations

### View Logs

```bash
# All services
docker compose logs -f

# Specific service
docker compose logs -f synkronus
docker compose logs -f postgres
docker compose logs -f nginx
```

### Restart Services

```bash
# Restart all
docker compose restart

# Restart specific service
docker compose restart synkronus
```

### Stop Services

```bash
# Stop (containers remain)
docker compose stop

# Stop and remove containers
docker compose down

# Stop and remove containers and volumes (⚠️ deletes data)
docker compose down -v
```

### Update Services

```bash
# Pull latest images
docker compose pull

# Rebuild and restart
docker compose up -d --build
```

## Troubleshooting

### Services Not Starting

**Problem:** Services fail to start

**Solutions:**

1. **Check Docker is running:**
   ```bash
   docker ps
   ```

2. **Check logs:**
   ```bash
   docker compose logs
   ```

3. **Verify ports are available:**
   ```bash
   sudo lsof -i :80
   ```

### Health Checks Failing

**Problem:** Services show as `(unhealthy)`

**Solutions:**

1. **Check health check logs:**
   ```bash
   docker inspect synkronus-synkronus-1 --format='{{json .State.Health}}' | jq .
   ```

2. **Manually test health endpoint:**
   ```bash
   docker compose exec synkronus wget --no-verbose --tries=1 -O - http://localhost:8080/health
   ```

3. **Restart services:**
   ```bash
   docker compose restart
   sleep 30
   docker compose ps
   ```

### Database Connection Issues

**Problem:** Cannot connect to database

**Solutions:**

1. **Check PostgreSQL is running:**
   ```bash
   docker compose ps postgres
   ```

2. **Check PostgreSQL logs:**
   ```bash
   docker compose logs postgres
   ```

3. **Test connection:**
   ```bash
   docker compose exec postgres psql -U synkronus_user -d synkronus
   ```

4. **Verify database exists:**
   ```bash
   docker compose exec postgres psql -U postgres -c "\l"
   ```

### Port Already in Use

**Problem:** `bind: address already in use`

**Solutions:**

1. **Find what's using the port:**
   ```bash
   sudo lsof -i :80
   ```

2. **Stop conflicting service:**
   ```bash
   sudo systemctl stop apache2  # or nginx, etc.
   ```

3. **Or change the port in docker-compose.yml:**
   ```yaml
   ports:
     - "8080:80"  # Use port 8080 instead of 80
   ```

## Production Deployment

For production deployments, see the [Hosting guide](/docs/host/synkronus-server/production).

:::warning[Production Considerations]

- Use strong, unique secrets
- Enable HTTPS/TLS
- Set up proper backups
- Configure monitoring and logging
- Use a managed database service for production

:::

## Next Steps

After setting up Synkronus:

1. ✅ [Upload Test Data](/docs/quick-start/upload-test-data) - Add sample data
2. ✅ [Install Formulus App](/docs/quick-start/formulus-app) - Connect mobile app
3. ✅ [Create Custom App](/docs/quick-start/custom-app) - Build your first app

:::success[Synkronus Configured]

Your Synkronus server is now set up and ready to use!

:::
