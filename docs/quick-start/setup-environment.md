---
sidebar_position: 3
---

# Setup Environment

Set up your development environment for ODE application development.

## Overview

This guide will help you configure your development environment for ODE. The setup process varies slightly depending on your operating system.

:::important[Before You Begin]

Make sure you've reviewed the [Prerequisites](/docs/quick-start/prerequisites) guide and have all required software ready to install.

:::

## Development Platforms

ODE app development can be done on **Linux**, **macOS**, or **Windows** (using WSL2).

:::tip[Windows Users]

For the best experience on Windows, we recommend using [WSL2](https://learn.microsoft.com/en-us/windows/wsl/install). All Linux instructions will work in WSL2.

:::

## Required Tools

Before you begin, ensure you have the following tools installed:

- [Git](https://git-scm.com/downloads) - Version control
- [Docker](https://www.docker.com/get-started) and Docker Compose - Containerization
- [Node.js](https://nodejs.org/) - Version 18 or higher (20+ recommended)
- [Synkronus CLI](/docs/components/synkronus-cli/installation) - Command-line interface

## Installation Steps

### Step 1: Install Git

<Tabs groupId="platform">
  <TabItem value="linux" label="Linux">

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install git -y

# Verify installation
git --version
```

  </TabItem>
  <TabItem value="macos" label="macOS">

```bash
# Git is usually pre-installed on macOS
# Verify installation
git --version

# If not installed, install via Homebrew
brew install git
```

  </TabItem>
  <TabItem value="windows" label="Windows">

Download and install from [Git for Windows](https://git-scm.com/download/win)

Or use package manager:
```powershell
# Using Chocolatey
choco install git

# Verify installation
git --version
```

  </TabItem>
</Tabs>

### Step 2: Install Docker and Docker Compose

<Tabs groupId="platform">
  <TabItem value="linux" label="Linux">

```bash
# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Add your user to docker group (optional, to run without sudo)
sudo usermod -aG docker $USER

# Install Docker Compose plugin
sudo apt install docker-compose-plugin -y

# Verify installation
docker --version
docker compose version

# Log out and back in for group changes to take effect
```

:::important[Docker Group]

After adding your user to the docker group, you may need to log out and back in, or restart your session for the changes to take effect.

:::

  </TabItem>
  <TabItem value="macos" label="macOS">

```bash
# Install Docker Desktop for Mac
# Download from: https://www.docker.com/products/docker-desktop/

# Or install via Homebrew
brew install --cask docker

# Start Docker Desktop from Applications

# Verify installation
docker --version
docker compose version
```

  </TabItem>
  <TabItem value="windows" label="Windows">

1. Install [Docker Desktop for Windows](https://www.docker.com/products/docker-desktop/)
2. Make sure WSL2 backend is enabled in Docker Desktop settings
3. Verify installation:

```powershell
docker --version
docker compose version
```

:::note[WSL2 Required]

Docker Desktop for Windows requires WSL2. If you haven't installed WSL2 yet, Docker Desktop will guide you through the installation.

:::

  </TabItem>
</Tabs>

### Step 3: Install Node.js

<Tabs groupId="platform">
  <TabItem value="linux" label="Linux">

**Recommended: Using NVM (Node Version Manager)**

```bash
# Install NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Reload shell configuration
source ~/.bashrc

# Install Node.js 20
nvm install 20
nvm use 20
nvm alias default 20

# Verify installation
node --version
npm --version
```

**Alternative: Using package manager**

```bash
# Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version
npm --version
```

  </TabItem>
  <TabItem value="macos" label="macOS">

**Recommended: Using NVM**

```bash
# Install NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Reload shell configuration
source ~/.zshrc  # or ~/.bash_profile

# Install Node.js 20
nvm install 20
nvm use 20
nvm alias default 20

# Verify installation
node --version
npm --version
```

**Alternative: Using Homebrew**

```bash
brew install node@20

# Verify installation
node --version
npm --version
```

  </TabItem>
  <TabItem value="windows" label="Windows">

**Using NVM for Windows:**

1. Download and install [nvm-windows](https://github.com/coreybutler/nvm-windows/releases)
2. Open a new terminal/PowerShell window
3. Install Node.js:

```powershell
nvm install 20
nvm use 20

# Verify installation
node --version
npm --version
```

**Alternative: Direct Install**

Download and install from [Node.js Downloads](https://nodejs.org/)

  </TabItem>
</Tabs>

### Step 4: Install Synkronus CLI

The Synkronus CLI is a command-line tool for managing and deploying ODE applications.

<Tabs groupId="platform">
  <TabItem value="linux" label="Linux">

```bash
# Download and install (see installation guide for latest version)
# Visit: /docs/components/synkronus-cli/installation

# Example installation (adjust version as needed)
wget https://github.com/opendataensemble/synkronus-cli/releases/latest/download/synk-linux-amd64
chmod +x synk-linux-amd64
sudo mv synk-linux-amd64 /usr/local/bin/synk

# Verify installation
synk --version
```

  </TabItem>
  <TabItem value="macos" label="macOS">

```bash
# Download and install (see installation guide for latest version)
# Visit: /docs/components/synkronus-cli/installation

# Example installation (adjust version as needed)
wget https://github.com/opendataensemble/synkronus-cli/releases/latest/download/synk-darwin-amd64
chmod +x synk-darwin-amd64
sudo mv synk-darwin-amd64 /usr/local/bin/synk

# Verify installation
synk --version
```

  </TabItem>
  <TabItem value="windows" label="Windows">

1. Download the Windows binary from the [Synkronus CLI releases](https://github.com/opendataensemble/synkronus-cli/releases)
2. Extract and add to your PATH, or place in a directory that's in your PATH
3. Verify installation:

```powershell
synk --version
```

  </TabItem>
</Tabs>

:::info[CLI Installation]

For detailed installation instructions and the latest version information, see the [Synkronus CLI Installation guide](/docs/components/synkronus-cli/installation).

:::

## Verify Your Installation

After installing all tools, verify everything is working:

```bash
# Check Git
git --version

# Check Docker
docker --version
docker compose version

# Check Node.js
node --version  # Should be 18.x or higher
npm --version

# Check Synkronus CLI
synk --version
```

:::tip[All Set?]

If all commands return version numbers, you're ready to proceed to the next step!

:::

## Platform-Specific Notes

### Linux

- Make sure Docker daemon is running: `sudo systemctl start docker`
- You may need to configure Docker to start on boot: `sudo systemctl enable docker`
- If using WSL2 on Windows, follow Linux instructions

### macOS

- Docker Desktop must be running before using Docker commands
- You may need to allow Docker Desktop in System Preferences > Security & Privacy
- Xcode Command Line Tools are required (install with: `xcode-select --install`)

### Windows

- Use WSL2 for the best experience
- Docker Desktop must be running
- Some commands may need to be run in WSL2 terminal, not PowerShell

## Troubleshooting

### Docker Issues

**Problem:** `docker: command not found`

**Solution:**
- Make sure Docker is installed and running
- On Linux, check if Docker daemon is running: `sudo systemctl status docker`
- On macOS/Windows, make sure Docker Desktop is running

**Problem:** Permission denied when running Docker

**Solution (Linux):**
```bash
# Add user to docker group
sudo usermod -aG docker $USER
# Log out and back in
```

### Node.js Issues

**Problem:** Wrong Node.js version

**Solution:**
- If using NVM: `nvm install 20 && nvm use 20`
- If using package manager, uninstall and reinstall the correct version

**Problem:** npm command not found

**Solution:**
- npm comes with Node.js, reinstall Node.js
- On Linux, you may need: `sudo apt install npm`

### Synkronus CLI Issues

**Problem:** Command not found

**Solution:**
- Make sure the binary is in your PATH
- Try using the full path to the binary
- Check the [installation guide](/docs/components/synkronus-cli/installation) for your platform

## Next Steps

Once your environment is set up:

1. ✅ Verify all tools are installed correctly
2. ✅ Proceed to [Deploy Local Instance](/docs/quick-start/deploy-local-instance)
3. ✅ Follow the Docker setup instructions

:::success[Environment Ready]

Your development environment is now configured! You're ready to deploy your first local ODE instance.

:::
