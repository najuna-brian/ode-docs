---
sidebar_position: 1
---

# Installing Formulus on Your Device

Install the Formulus mobile application on Android or iOS devices.

## Overview

Formulus is the mobile application for ODE that allows you to collect data offline and sync it with your Synkronus server. This guide will walk you through installing Formulus on your device.

:::important[Prerequisites]

Before installing Formulus, make sure:
- You have a local Synkronus instance running (see [Deploy Local Instance](/docs/quick-start/deploy-local-instance))
- You know your server URL and credentials
- Your device is connected to the same network as your server (for local testing)

:::

## Installation Methods

Formulus can be installed in several ways depending on your platform and needs:

<Tabs groupId="mobile-platform">
  <TabItem value="android" label="Android">

### Android Installation Options

#### Option 1: Pre-release Version (Recommended for Testing)

For testing and development, install the pre-release version using F-Droid and Obtainium:

👉 **See detailed guide:** [Installing Formulus Pre-release (Android)](/docs/quick-start/formulus-prerelease-android)

This method provides:
- Automatic updates
- No Google account required
- Access to latest pre-release versions

#### Option 2: Play Store (When Available)

Once Formulus is published to the Google Play Store:

1. Open Google Play Store on your Android device
2. Search for "Formulus"
3. Tap "Install"
4. Follow the on-screen instructions

#### Option 3: Sideload APK

For direct installation:

1. Download the APK file from [GitHub Releases](https://github.com/opendataensemble/ode/releases)
2. Enable "Install from unknown sources" in your device settings
3. Open the downloaded APK file
4. Follow the installation prompts

:::warning[Unknown Sources]

Only install APKs from trusted sources. The official source is the GitHub repository.

:::

### Android Requirements

- **Android Version**: 5.0 (API level 21) or higher
- **Storage**: At least 100MB free space
- **Permissions**: Internet access (for syncing)

### First Launch (Android)

1. Open the Formulus app
2. Navigate to **Settings**
3. Enter your server configuration:
   - **Server URL**: 
     - For local testing: `http://YOUR_COMPUTER_IP` (e.g., `http://192.168.1.100`)
     - For Android Emulator: `http://10.0.2.2`
   - **Username**: `admin` (or your username)
   - **Password**: Your admin password
4. Tap **Save Settings**
5. Tap **Login** to authenticate

:::tip[Finding Your IP Address]

To find your computer's IP address:

```bash
# Linux/macOS
hostname -I | awk '{print $1}'

# Or
ip addr show | grep "inet " | grep -v 127.0.0.1
```

:::

### Android Development Setup

If you want to build Formulus from source for Android:

1. **Install Android Studio:**
   - Download from [Android Studio](https://developer.android.com/studio)
   - Install Android SDK and NDK

2. **Clone the repository:**
   ```bash
   git clone https://github.com/opendataensemble/ode.git
   cd ode/formulus
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Generate required files:**
   ```bash
   npm run generate:api
   npm run generate
   ```

5. **Run on device/emulator:**
   ```bash
   npm run android
   ```

For detailed Android development setup, see the [Formulus Setup Guide](https://github.com/opendataensemble/ode/tree/main/formulus/personal-docs).

  </TabItem>
  <TabItem value="ios" label="iOS">

### iOS Installation Options

#### Option 1: App Store (When Available)

Once Formulus is published to the Apple App Store:

1. Open the App Store on your iOS device
2. Search for "Formulus"
3. Tap "Get" or the download button
4. Follow the on-screen instructions

#### Option 2: TestFlight (Beta Testing)

For beta testing versions:

1. Install TestFlight from the App Store
2. Accept the TestFlight invitation (if you have one)
3. Install Formulus from TestFlight
4. Follow the on-screen instructions

#### Option 3: Build from Source (Development)

For development and testing:

1. **Install Xcode:**
   - Download from [Mac App Store](https://apps.apple.com/us/app/xcode/id497799835)
   - Install Command Line Tools: `xcode-select --install`

2. **Install CocoaPods:**
   ```bash
   sudo gem install cocoapods
   ```

3. **Clone the repository:**
   ```bash
   git clone https://github.com/opendataensemble/ode.git
   cd ode/formulus
   ```

4. **Install dependencies:**
   ```bash
   npm install
   cd ios
   bundle install  # If using Bundler
   bundle exec pod install
   cd ..
   ```

5. **Run on device/simulator:**
   ```bash
   npm run ios
   ```

:::info[iOS Development]

iOS development requires:
- macOS with Xcode
- Apple Developer account (for device testing)
- CocoaPods for dependency management

:::

### iOS Requirements

- **iOS Version**: 13.0 or higher
- **Device**: iPhone or iPad
- **Storage**: At least 100MB free space
- **Permissions**: Internet access (for syncing)

### First Launch (iOS)

1. Open the Formulus app
2. Navigate to **Settings**
3. Enter your server configuration:
   - **Server URL**: 
     - For local testing: `http://YOUR_COMPUTER_IP` (e.g., `http://192.168.1.100`)
     - For iOS Simulator: `http://localhost`
   - **Username**: `admin` (or your username)
   - **Password**: Your admin password
4. Tap **Save Settings**
5. Tap **Login** to authenticate

:::tip[Network Configuration]

For iOS Simulator, `localhost` works directly. For physical devices, use your computer's IP address.

:::

  </TabItem>
</Tabs>

## Configuration

### Server Connection Settings

After installing Formulus, you need to configure it to connect to your Synkronus server.

#### For Local Development

<Tabs groupId="mobile-platform">
  <TabItem value="android" label="Android (Local)">

<div>

**Server URL Options:**

- **Physical Device**: `http://YOUR_COMPUTER_IP` (e.g., `http://192.168.1.100`)
- **Android Emulator**: `http://10.0.2.2` (special IP that maps to host machine)

**Credentials:**

- **Username**: `admin`
- **Password**: Your admin password from docker-compose.yml

</div>

  </TabItem>
  <TabItem value="ios" label="iOS (Local)">

<div>

**Server URL Options:**

- **iOS Simulator**: `http://localhost`
- **Physical Device**: `http://YOUR_COMPUTER_IP` (e.g., `http://192.168.1.100`)

**Credentials:**

- **Username**: `admin`
- **Password**: Your admin password from docker-compose.yml

</div>

  </TabItem>
</Tabs>

### Getting Your Computer's IP Address

<Tabs groupId="platform">
  <TabItem value="linux" label="Linux">

```bash
hostname -I | awk '{print $1}'
```

Or:

```bash
ip addr show | grep "inet " | grep -v 127.0.0.1 | awk '{print $2}' | cut -d/ -f1
```

  </TabItem>
  <TabItem value="macos" label="macOS">

```bash
ipconfig getifaddr en0
```

Or:

```bash
ifconfig | grep "inet " | grep -v 127.0.0.1 | awk '{print $2}'
```

  </TabItem>
  <TabItem value="windows" label="Windows">

```powershell
ipconfig | findstr IPv4
```

Or in WSL2:

```bash
hostname -I | awk '{print $1}'
```

  </TabItem>
</Tabs>

## Testing the Connection

### Step 1: Verify Server is Running

```bash
# Check server health
curl http://localhost/health

# Should return: OK
```

### Step 2: Test Authentication

```bash
# Test login
curl -X POST http://localhost/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"YOUR_PASSWORD"}'
```

### Step 3: Configure in App

1. Open Formulus app
2. Go to Settings
3. Enter server URL and credentials
4. Tap "Save Settings"
5. Tap "Login"

### Step 4: Test Sync

1. Navigate to Sync screen
2. Tap "Sync Now"
3. Verify sync completes successfully

:::success[Connection Successful]

If sync completes without errors, your Formulus app is successfully connected to your server!

:::

## Troubleshooting

### Cannot Connect to Server

**Problem:** App cannot connect to server

**Solutions:**

1. **Verify server is running:**
   ```bash
   docker compose ps
   curl http://localhost/health
   ```

2. **Check network connectivity:**
   - Ensure device and server are on the same network
   - Check firewall settings
   - Verify IP address is correct

3. **Check URL format:**
   - Use `http://` (not `https://`) for local development
   - Include port if not using default (e.g., `http://192.168.1.100:8080`)

### Authentication Fails

**Problem:** Login fails with authentication error

**Solutions:**

1. **Verify credentials:**
   - Check username is correct (usually `admin`)
   - Verify password matches `ADMIN_PASSWORD` in `docker-compose.yml`

2. **Check server logs:**
   ```bash
   docker compose logs synkronus | grep -i auth
   ```

3. **Test authentication directly:**
   ```bash
   curl -X POST http://localhost/auth/login \
     -H "Content-Type: application/json" \
     -d '{"username":"admin","password":"YOUR_PASSWORD"}'
   ```

### Sync Fails

**Problem:** Sync operation fails

**Solutions:**

1. **Check server logs:**
   ```bash
   docker compose logs synkronus
   ```

2. **Verify authentication token:**
   - Make sure you're logged in
   - Try logging out and back in

3. **Check network connection:**
   - Ensure device has internet/network access
   - Verify server is accessible from device

### App Crashes

**Problem:** App crashes on launch or during use

**Solutions:**

1. **Check device compatibility:**
   - Android: Android 5.0+ required
   - iOS: iOS 13.0+ required

2. **Clear app data:**
   - Android: Settings > Apps > Formulus > Storage > Clear Data
   - iOS: Delete and reinstall app

3. **Check logs:**
   - Android: `adb logcat | grep Formulus`
   - iOS: Check Xcode console if running from source

## Next Steps

After successfully installing and configuring Formulus:

1. ✅ [Upload Test Data](/docs/quick-start/upload-test-data) - Add sample data to test with
2. ✅ [Create Custom App](/docs/quick-start/custom-app) - Build your first custom application
3. ✅ Learn about [Forms](/docs/build/forms/overview) - Create data collection forms

:::success[Formulus Installed]

Formulus is now installed and configured! You can start collecting and syncing data.

:::
