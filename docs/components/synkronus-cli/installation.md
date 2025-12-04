---
sidebar_position: 2
---

# Synkronus CLI Installation

Install the Synkronus CLI tool for managing and deploying ODE applications.

## Overview

The Synkronus CLI is a command-line interface tool that helps you manage app bundles, upload data, and interact with your Synkronus server. This guide covers installation for different platforms.

:::tip[Quick Start]

If you're following the Quick Start guide, you can install the CLI as part of [Setting Up Your Environment](/docs/quick-start/setup-environment).

:::

## Installation Methods

<Tabs groupId="platform">
  <TabItem value="linux" label="Linux">

### Linux Installation

#### Method 1: Direct Download (Recommended)

1. **Download the latest release:**
   ```bash
   # Get the latest version URL (replace with actual release URL)
   wget https://github.com/opendataensemble/synkronus-cli/releases/latest/download/synk-linux-amd64
   ```

2. **Make it executable:**
   ```bash
   chmod +x synk-linux-amd64
   ```

3. **Move to a directory in your PATH:**
   ```bash
   sudo mv synk-linux-amd64 /usr/local/bin/synk
   ```

4. **Verify installation:**
   ```bash
   synk --version
   ```

#### Method 2: Using Package Manager

If available through your distribution's package manager:

```bash
# Example for Debian/Ubuntu (if package available)
sudo apt install synkronus-cli

# Or using snap (if available)
sudo snap install synkronus-cli
```

### Linux Requirements

<div>

- Linux x86_64 or ARM64
- glibc 2.31 or higher
- No additional dependencies required

</div>

  </TabItem>
  <TabItem value="macos" label="macOS">

### macOS Installation

#### Method 1: Direct Download (Recommended)

1. **Download the latest release:**
   ```bash
   # For Intel Macs
   wget https://github.com/opendataensemble/synkronus-cli/releases/latest/download/synk-darwin-amd64
   
   # For Apple Silicon (M1/M2/M3)
   wget https://github.com/opendataensemble/synkronus-cli/releases/latest/download/synk-darwin-arm64
   ```

2. **Make it executable:**
   ```bash
   chmod +x synk-darwin-amd64  # or synk-darwin-arm64
   ```

3. **Move to a directory in your PATH:**
   ```bash
   sudo mv synk-darwin-amd64 /usr/local/bin/synk
   # or
   sudo mv synk-darwin-arm64 /usr/local/bin/synk
   ```

4. **Verify installation:**
   ```bash
   synk --version
   ```

#### Method 2: Using Homebrew (If Available)

```bash
brew install synkronus-cli
```

### macOS Requirements

<div>

- macOS 10.15 (Catalina) or higher
- Intel or Apple Silicon processor
- No additional dependencies required

</div>

:::info[Apple Silicon]

If you have an Apple Silicon Mac (M1/M2/M3), make sure to download the ARM64 version for best performance.

:::

  </TabItem>
  <TabItem value="windows" label="Windows">

### Windows Installation

#### Method 1: Direct Download

1. **Download the latest release:**
   - Visit [GitHub Releases](https://github.com/opendataensemble/synkronus-cli/releases)
   - Download `synk-windows-amd64.exe`

2. **Add to PATH:**
   - Extract the executable
   - Add the directory containing `synk.exe` to your system PATH
   - Or place it in a directory already in your PATH (e.g., `C:\Windows\System32`)

3. **Verify installation:**
   ```powershell
   synk --version
   ```

#### Method 2: Using Package Manager

**Using Chocolatey (if available):**
```powershell
choco install synkronus-cli
```

**Using Scoop (if available):**
```powershell
scoop install synkronus-cli
```

### Windows Requirements

<div>

- Windows 10 or higher
- x86_64 architecture
- No additional dependencies required

</div>

:::tip[WSL2 Users]

If you're using WSL2, follow the Linux installation instructions instead.

:::

  </TabItem>
</Tabs>

## Verification

After installation, verify the CLI is working:

```bash
# Check version
synk --version

# Check help
synk --help

# Test connection (if you have a server running)
synk status --url http://localhost
```

:::success[Installation Complete]

The Synkronus CLI is now installed and ready to use!

:::

## Configuration

After installation, you may want to configure the CLI:

1. **Set default server URL:**
   ```bash
   synk config set server http://localhost
   ```

2. **Set default credentials:**
   ```bash
   synk config set username admin
   synk config set password YOUR_PASSWORD
   ```

:::warning[Security]

Be careful when storing credentials. Consider using environment variables or secure credential storage instead of config files.

:::

## Troubleshooting

### Command Not Found

**Problem:** `synk: command not found`

**Solutions:**
- Verify the binary is in your PATH
- Check the file is executable (Linux/macOS): `chmod +x synk`
- Try using the full path to the binary
- Restart your terminal after adding to PATH

### Permission Denied

**Problem:** Permission denied when running synk

**Solutions:**
- Make sure the file is executable: `chmod +x synk`
- On Linux/macOS, you may need `sudo` for system-wide installation
- Check file permissions: `ls -l synk`

### Wrong Architecture

**Problem:** Binary won't run or shows architecture error

**Solutions:**
- Download the correct binary for your platform
- Check your system architecture:
  - Linux: `uname -m`
  - macOS: `uname -m` (should be `x86_64` or `arm64`)
  - Windows: Check System Information

## Next Steps

After installing the CLI:

1. ✅ [Configure the CLI](/docs/components/synkronus-cli/commands-reference) - Learn about available commands
2. ✅ [Quick Start Guide](/docs/quick-start) - Set up your first ODE instance
3. ✅ [Commands Reference](/docs/components/synkronus-cli/commands-reference) - Explore all CLI commands

## Related Content

- [Commands Reference](/docs/components/synkronus-cli/commands-reference) - Complete list of CLI commands
- [Synkronus CLI Documentation](/docs/documentation/synkronus-cli/cli) - Detailed CLI documentation
- [Quick Start](/docs/quick-start) - Get started with ODE
