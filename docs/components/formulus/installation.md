---
sidebar_position: 2
---

# Formulus Installation

Install Formulus on Android or iOS devices.

## Overview

Formulus is the mobile application for ODE that allows you to collect data offline and sync it with your Synkronus server. This guide covers installation methods for both Android and iOS platforms.

:::important[Prerequisites]

Before installing Formulus, ensure:
- You have a Synkronus server instance running (see [Synkronus Installation](/docs/components/synkronus/installation))
- Your device meets the system requirements
- You have the necessary permissions for installation

:::

## Installation Methods

<Tabs groupId="mobile-platform">
  <TabItem value="android" label="Android">

### Android Installation

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

<div>

- **Android Version**: 5.0 (API level 21) or higher
- **Storage**: At least 100MB free space
- **Permissions**: Internet access (for syncing)

</div>

  </TabItem>
  <TabItem value="ios" label="iOS">

### iOS Installation

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

3. **Clone and build:**
   ```bash
   git clone https://github.com/opendataensemble/ode.git
   cd ode/formulus
   npm install
   cd ios
   pod install
   cd ..
   npm run ios
   ```

### iOS Requirements

<div>

- **iOS Version**: 13.0 or higher
- **Device**: iPhone or iPad
- **Storage**: At least 100MB free space
- **Permissions**: Internet access (for syncing)

</div>

:::info[iOS Development]

iOS development requires:
- macOS with Xcode
- Apple Developer account (for device testing)
- CocoaPods for dependency management

:::

  </TabItem>
</Tabs>

## System Requirements

### Minimum Requirements

- **Storage**: 100MB free space
- **Network**: Internet connection for syncing
- **Permissions**: Network access

### Recommended

- **Storage**: 500MB+ free space (for offline data)
- **Network**: Stable internet connection
- **Device**: Modern smartphone or tablet

## Verification

After installation, verify Formulus is working:

1. Open the Formulus app
2. Navigate to Settings
3. Check that the app loads without errors
4. Proceed to [Configuration](/docs/components/formulus/configuration) to connect to your server

:::success[Installation Complete]

Formulus is now installed! Next, configure it to connect to your Synkronus server.

:::

## Troubleshooting

### Installation Fails

**Problem:** Installation fails or app won't install

**Solutions:**
- Check device meets minimum requirements
- Ensure sufficient storage space
- Verify installation source is trusted
- Check device settings allow installation

### App Crashes on Launch

**Problem:** App crashes immediately after opening

**Solutions:**
- Check device compatibility
- Clear app data and reinstall
- Update device operating system
- Check device logs for errors

## Related Content

- [Configuration](/docs/components/formulus/configuration) - Configure Formulus to connect to your server
- [Quick Start Guide](/docs/quick-start/formulus-app) - Complete setup guide
- [Features](/docs/components/formulus/features) - Learn about Formulus features
- [Troubleshooting](/docs/components/formulus/troubleshooting) - Common issues and solutions
