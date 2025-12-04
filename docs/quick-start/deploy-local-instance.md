---
sidebar_position: 4
---

# Deploy Local Instance

Set up a local ODE environment for development and testing.

## Overview

This guide will help you deploy a local Synkronus server instance for development and testing. By the end of this guide, you'll have a fully functional ODE backend running on your local machine.

:::important[Prerequisites]

Before starting, make sure you have:
- Docker and Docker Compose installed (see [Setup Environment](/docs/quick-start/setup-environment))
- Basic familiarity with command line tools
- At least 2GB of free disk space

:::

## Quick Start

1. Clone the Synkronus repository
2. Configure environment variables
3. Start the Docker containers
4. Access the server at `http://localhost`

:::tip[First Time Setup]

The first time you run this setup, it may take 5-10 minutes to download Docker images and set up the database.

:::

## Detailed Instructions

### Step 1: Clone Repository

```bash
# Clone the ODE repository
git clone https://github.com/opendataensemble/ode.git
cd ode/synkronus

# Verify you're in the right directory
ls -la
# You should see: docker-compose.yml, Dockerfile, README.md, etc.
```

:::note[Repository Location]

If you already have the repository cloned, navigate to the `synkronus` directory:

```bash
cd /path/to/ode/synkronus
```

:::

### Step 2: Configure Environment

Create a `docker-compose.yml` file from the example:

```bash
# Copy the example configuration
cp docker-compose.example.yml docker-compose.yml
```

#### Generate Secure Secrets

Generate secure secrets for your local instance:

```bash
# Generate secure secrets
JWT_SECRET=$(openssl rand -base64 32)
DB_ROOT_PASSWORD=$(openssl rand -base64 24)
ADMIN_PASSWORD=$(openssl rand -base64 16)

# Display the secrets (save them somewhere safe!)
echo "JWT_SECRET: $JWT_SECRET"
echo "DB_ROOT_PASSWORD: $DB_ROOT_PASSWORD"
echo "ADMIN_PASSWORD: $ADMIN_PASSWORD"
```

:::warning[Save Your Secrets]

**IMPORTANT:** Save these secrets securely! You'll need them later, especially the `ADMIN_PASSWORD` for logging into the server.

:::

#### Update docker-compose.yml

Update the `docker-compose.yml` file with your generated secrets:

```bash
# Update docker-compose.yml with the secrets
sed -i "s/CHANGE_THIS_PASSWORD/$DB_ROOT_PASSWORD/g" docker-compose.yml
sed -i "s/CHANGE_THIS_TO_RANDOM_32_CHAR_STRING/$JWT_SECRET/g" docker-compose.yml
sed -i "s/CHANGE_THIS_ADMIN_PASSWORD/$ADMIN_PASSWORD/g" docker-compose.yml

# Verify the changes
grep -E "JWT_SECRET|POSTGRES_PASSWORD|ADMIN_PASSWORD" docker-compose.yml
```

:::tip[Manual Editing]

Alternatively, you can manually edit `docker-compose.yml` and replace the placeholder values with your generated secrets.

:::

### Step 3: Start Services

Start all services using Docker Compose:

```bash
# Start all services in detached mode
docker compose up -d

# Watch the logs to see everything starting up
docker compose logs -f
```

Press `Ctrl+C` to stop watching logs (services continue running).

:::info[First Startup]

The first time you start the services:
- Docker will download required images (PostgreSQL, Nginx, etc.)
- Database migrations will run automatically
- The admin user will be created automatically
- This process may take 5-10 minutes

:::

### Step 4: Verify Installation

#### Check Service Status

```bash
# Check that all services are running and healthy
docker compose ps
```

Expected output:
```
NAME                    STATUS
nginx                   Up X minutes (healthy)
postgres                Up X minutes (healthy)
synkronus               Up X minutes (healthy)
```

:::warning[Unhealthy Services]

If any service shows as `(unhealthy)`, check the logs:

```bash
docker compose logs synkronus
docker compose logs postgres
docker compose logs nginx
```

See the [Troubleshooting](#troubleshooting) section for common issues.

:::

#### Test Health Endpoint

```bash
# Test the health endpoint
curl http://localhost/health
```

Expected output: `OK`

#### Test Authentication

```bash
# Test login endpoint (replace YOUR_ADMIN_PASSWORD with your actual password)
curl -X POST http://localhost/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"YOUR_ADMIN_PASSWORD"}'
```

Expected output: JSON with `token`, `refreshToken`, and `expiresAt` fields.

:::success[Server Running]

If the health endpoint returns `OK` and authentication works, your server is running correctly!

:::

### Step 5: Create Database and User

If the database doesn't exist yet, create it:

```bash
# Open a psql shell into the Postgres container
docker compose exec postgres psql -U postgres
```

In the psql prompt, run:

```sql
-- Create a role (user) for Synkronus
CREATE ROLE synkronus_user LOGIN PASSWORD 'synkronus_password_123';

-- Create the database owned by that user
CREATE DATABASE synkronus OWNER synkronus_user;

-- Exit psql
\q
```

#### Update Database Connection

Update the database connection in `docker-compose.yml`:

```bash
# Update DB_CONNECTION in docker-compose.yml
# Replace the DB_CONNECTION line with:
# DB_CONNECTION: "postgres://synkronus_user:synkronus_password_123@postgres:5432/synkronus?sslmode=disable"

# Or use sed to update it automatically
sed -i 's|postgres://synkronus_user:CHANGE_THIS_PASSWORD@postgres:5432/synkronus|postgres://synkronus_user:synkronus_password_123@postgres:5432/synkronus|g' docker-compose.yml

# Restart synkronus service to pick up the new database connection
docker compose restart synkronus
```

### Step 6: Verify Database Tables

Check that database migrations ran successfully:

```bash
# Check if migrations ran successfully
docker compose exec postgres psql -U synkronus_user -d synkronus -c "\dt"
```

Expected output: List of tables including:
- `users`
- `observations`
- `attachment_operations`
- `sync_version`
- `goose_db_version`

## Accessing Your Instance

### Web Interface

Once your instance is running, you can access it at:

- **Health Check**: `http://localhost/health`
- **API Base**: `http://localhost/api/v1/`
- **API Documentation**: See [API Reference](/api)

### Default Credentials

- **Username**: `admin`
- **Password**: The `ADMIN_PASSWORD` you generated in Step 2

:::warning[Default Credentials]

For production deployments, change the default admin password immediately!

:::

## Common Operations

### View Logs

```bash
# View all logs
docker compose logs -f

# View logs for a specific service
docker compose logs -f synkronus
docker compose logs -f postgres
docker compose logs -f nginx
```

### Restart Services

```bash
# Restart all services
docker compose restart

# Restart a specific service
docker compose restart synkronus
```

### Stop Services

```bash
# Stop all services (containers remain)
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

**Problem:** Services fail to start or show as unhealthy

**Solutions:**

1. **Check Docker is running:**
   ```bash
   docker ps
   ```

2. **Check logs for errors:**
   ```bash
   docker compose logs
   ```

3. **Verify ports are not in use:**
   ```bash
   # Check if port 80 is in use
   sudo lsof -i :80
   
   # If something is using port 80, stop it or change the port in docker-compose.yml
   ```

4. **Check disk space:**
   ```bash
   df -h
   ```

### Health Checks Failing

**Problem:** Services show as `(unhealthy)` in `docker compose ps`

**Solutions:**

1. **Check health check logs:**
   ```bash
   docker inspect synkronus-synkronus-1 --format='{{json .State.Health}}' | python3 -m json.tool
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

### Complete Reset

If you need to start completely fresh:

```bash
# Stop and remove all containers and volumes
docker compose down -v

# Remove images (optional)
docker compose down --rmi all

# Start from Step 2 (Configure Environment) again
```

:::warning[Data Loss]

The `-v` flag removes all volumes, which will delete all your data. Only use this if you want to start completely fresh.

:::

## Verification Checklist

Before considering setup complete, verify:

- [ ] All services show as "Up" and "healthy" in `docker compose ps`
- [ ] Health endpoint returns `OK` via `curl http://localhost/health`
- [ ] Authentication endpoint works and returns JWT token
- [ ] Database tables exist (check with `\dt` in psql)
- [ ] No errors in logs (`docker compose logs`)

## Next Steps

Once your local instance is running:

1. ✅ [Upload Test Data](/docs/quick-start/upload-test-data) - Add sample data for testing
2. ✅ [Install Formulus App](/docs/quick-start/formulus-app) - Connect the mobile app
3. ✅ [Create Custom App](/docs/quick-start/custom-app) - Build your first application

:::success[Instance Deployed]

Your local ODE instance is now running! You can start developing and testing your applications.

:::
