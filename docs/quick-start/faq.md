---
sidebar_position: 6
---

# Frequently Asked Questions

Common questions and answers about getting started with ODE.

## Installation

### How do I upgrade to a newer version?

To upgrade your local instance:

```bash
# Pull latest changes
cd /path/to/ode/synkronus
git pull

# Rebuild and restart
docker compose pull
docker compose up -d --build
```

For production deployments, see the [Hosting guide](/docs/host/synkronus-server/production).

:::tip[Backup First]

Always backup your data before upgrading:

```bash
# Backup database
docker compose exec postgres pg_dump -U synkronus_user synkronus > backup.sql
```

:::

### How do I access the instance remotely?

To access your local instance from another device on the same network:

1. **Find your computer's IP address:**
   ```bash
   # Linux/macOS
   hostname -I | awk '{print $1}'
   
   # Windows
   ipconfig | findstr IPv4
   ```

2. **Ensure firewall allows connections:**
   ```bash
   # Linux (UFW)
   sudo ufw allow 80/tcp
   
   # macOS (System Preferences > Security & Privacy > Firewall)
   ```

3. **Access from other device:**
   - Use `http://YOUR_IP` instead of `http://localhost`
   - Example: `http://192.168.1.100`

:::warning[Security]

Only allow remote access on trusted networks. For production, use proper security measures like VPN or SSH tunneling.

:::

### Error when installing Synkronus CLI

**Problem:** Installation fails or command not found

**Solutions:**

1. **Check your platform:**
   - Download the correct binary for your OS and architecture
   - Linux: `synk-linux-amd64`
   - macOS: `synk-darwin-amd64` or `synk-darwin-arm64`
   - Windows: `synk-windows-amd64.exe`

2. **Make binary executable (Linux/macOS):**
   ```bash
   chmod +x synk-linux-amd64
   ```

3. **Add to PATH:**
   ```bash
   # Move to a directory in your PATH
   sudo mv synk-linux-amd64 /usr/local/bin/synk
   
   # Or add current directory to PATH
   export PATH=$PATH:$(pwd)
   ```

4. **Verify installation:**
   ```bash
   synk --version
   ```

For detailed installation instructions, see [Synkronus CLI Installation](/docs/components/synkronus-cli/installation).

### PostgreSQL failed to start properly

**Problem:** PostgreSQL container shows as unhealthy or fails to start

**Solutions:**

1. **Check logs:**
   ```bash
   docker compose logs postgres
   ```

2. **Check disk space:**
   ```bash
   df -h
   ```

3. **Check port conflicts:**
   ```bash
   sudo lsof -i :5432
   ```

4. **Reset PostgreSQL (⚠️ deletes data):**
   ```bash
   docker compose down -v
   docker compose up -d
   ```

5. **Verify database exists:**
   ```bash
   docker compose exec postgres psql -U postgres -c "\l"
   ```

If the database doesn't exist, create it (see [Deploy Local Instance](/docs/quick-start/deploy-local-instance)).

## Development

### How do I create my first form?

See the [Forms guide](/docs/build/forms/overview) for detailed instructions.

Quick start:

1. Create a JSON Schema file
2. Create a UI Schema file
3. Add to your app bundle
4. Upload to server

Example:

```json
{
  "schema": {
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "title": "Name"
      }
    }
  },
  "uischema": {
    "type": "VerticalLayout",
    "elements": [
      {
        "type": "Control",
        "scope": "#/properties/name"
      }
    ]
  }
}
```

### How do I build a custom application?

See the [Custom Applications guide](/docs/build/custom-applications/overview) and [Making It Yours](/docs/quick-start/custom-app).

Basic steps:

1. Create app bundle structure
2. Define forms (JSON Schema + UI Schema)
3. Create manifest.json
4. Package as ZIP
5. Upload to Synkronus

### How do I connect Formulus to my server?

See the [Formulus configuration guide](/docs/components/formulus/configuration) and [Installing Formulus](/docs/quick-start/formulus-app).

Quick steps:

1. Open Formulus app
2. Go to Settings
3. Enter server URL:
   - Local: `http://YOUR_IP` or `http://10.0.2.2` (Android emulator)
   - Production: Your server URL
4. Enter username and password
5. Save and login

## Troubleshooting

### Common issues and solutions

#### Services show as unhealthy

**Problem:** Docker services show `(unhealthy)` status

**Solutions:**

1. **Check logs:**
   ```bash
   docker compose logs
   ```

2. **Restart services:**
   ```bash
   docker compose restart
   sleep 30
   docker compose ps
   ```

3. **Check health endpoints:**
   ```bash
   curl http://localhost/health
   ```

4. **Verify configuration:**
   ```bash
   docker compose config
   ```

#### Cannot connect to server from mobile app

**Problem:** Formulus cannot connect to server

**Solutions:**

1. **Verify server is running:**
   ```bash
   curl http://localhost/health
   ```

2. **Check network:**
   - Ensure device and server are on same network
   - Verify firewall settings
   - Check IP address is correct

3. **Test from device:**
   - Open browser on device
   - Navigate to `http://YOUR_IP/health`
   - Should return `OK`

4. **Check server logs:**
   ```bash
   docker compose logs synkronus
   ```

#### Authentication fails

**Problem:** Login fails with authentication error

**Solutions:**

1. **Verify credentials:**
   - Check username (usually `admin`)
   - Verify password matches `ADMIN_PASSWORD` in docker-compose.yml

2. **Test authentication:**
   ```bash
   curl -X POST http://localhost/auth/login \
     -H "Content-Type: application/json" \
     -d '{"username":"admin","password":"YOUR_PASSWORD"}'
   ```

3. **Check server logs:**
   ```bash
   docker compose logs synkronus | grep -i auth
   ```

#### Sync fails

**Problem:** Data sync fails between mobile app and server

**Solutions:**

1. **Check authentication:**
   - Ensure you're logged in
   - Verify token hasn't expired
   - Try logging out and back in

2. **Check server logs:**
   ```bash
   docker compose logs synkronus
   ```

3. **Verify network:**
   - Ensure device has internet/network access
   - Check server is accessible

4. **Test sync manually:**
   ```bash
   # Get token
   TOKEN=$(curl -s -X POST http://localhost/auth/login \
     -H "Content-Type: application/json" \
     -d '{"username":"admin","password":"YOUR_PASSWORD"}' \
     | grep -o '"token":"[^"]*"' | cut -d'"' -f4)
   
   # Test pull
   curl -X POST http://localhost/sync/pull \
     -H "Authorization: Bearer $TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"client_id":"test","since":{"version":0},"schema_types":[]}'
   ```

### Getting more help

If you're still experiencing issues:

1. **Check documentation:**
   - [Troubleshooting guides](/docs/components/formulus/troubleshooting)
   - [API Reference](/api)
   - [Technical Overview](/docs/technical-overview)

2. **Search existing issues:**
   - [GitHub Issues](https://github.com/opendataensemble/ode/issues)

3. **Ask the community:**
   - [Community Forum](https://forum.opendataensemble.org)
   - [Stack Overflow](https://stackoverflow.com/questions/tagged/opendataensemble)

4. **Report bugs:**
   - [GitHub Issues](https://github.com/opendataensemble/ode/issues/new)

:::tip[Include Details]

When asking for help, include:
- Your operating system
- ODE version
- Error messages
- Steps to reproduce
- Relevant logs

:::

## Next Steps

After resolving your issue:

- Continue with the [Quick Start guide](/docs/quick-start)
- Explore [Tutorials](/docs/tutorials)
- Learn about [Building Forms](/docs/build/forms/overview)
- Check out [Custom Applications](/docs/build/custom-applications/overview)
