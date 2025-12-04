---
sidebar_position: 2
---

# Prerequisites

Tools and skills needed for developing ODE applications.

## Overview

Before you begin setting up ODE, ensure you have the necessary tools, software, and skills. This guide outlines everything you'll need.

:::important[Before You Start]

Make sure you have completed all prerequisites before proceeding to the [Setup Environment](/docs/quick-start/setup-environment) guide.

:::

## Test Instance

To build your own application using ODE, you will need an instance set up for testing. You can set up a local instance by following the [local setup instructions](/docs/quick-start/deploy-local-instance).

:::tip[Local vs. Remote]

For development and testing, a local instance is recommended. For production deployments, see the [Hosting guide](/docs/host).

:::

## Required Software

### Build Tools

The build tools for ODE applications include:

- **Synkronus CLI**: Command-line interface for managing and deploying applications
  - Installation guide: [Synkronus CLI Installation](/docs/components/synkronus-cli/installation)
- **Node.js**: For building custom applications
  - Version: **18 or higher** (20+ recommended)
  - Installation: [Node.js Downloads](https://nodejs.org/)
- **Docker**: For running local Synkronus instances
  - Installation: [Docker Installation Guide](https://docs.docker.com/get-docker/)
- **Git**: For version control and cloning repositories
  - Installation: [Git Downloads](https://git-scm.com/downloads)

### Platform-Specific Tools

#### For Android Development

- **Android Studio**: For Android app development
  - Download: [Android Studio](https://developer.android.com/studio)
- **Android SDK**: Included with Android Studio
- **Java JDK**: Version 17 or higher
  - Usually included with Android Studio

#### For iOS Development (macOS only)

- **Xcode**: For iOS app development
  - Download from: [Mac App Store](https://apps.apple.com/us/app/xcode/id497799835)
- **CocoaPods**: Dependency manager for iOS
  - Installation: `sudo gem install cocoapods`

:::warning[Platform Requirements]

- **Android development** can be done on Linux, macOS, or Windows
- **iOS development** requires macOS and Xcode
- **Windows users** should use WSL2 for the best experience

:::

## Required Skills

Building an ODE application requires a technical skillset. The level of technical knowledge needed depends on what you want to accomplish.

### To Build an App

- **Command line tools**: Ability to use terminal/command prompt to compile and deploy configuration code
- **JSON Schema**: Understanding of JSON Schema for building forms
- **JSON Forms UI Schema**: Familiarity with JSON Forms UI Schema for form layouts
- **JavaScript/TypeScript**: Basic to intermediate knowledge for custom applications
- **React**: Understanding of React for custom application development

:::info[Learning Resources]

If you're new to these technologies:
- [JSON Schema Tutorial](https://json-schema.org/learn/)
- [JSON Forms Documentation](https://jsonforms.io/)
- [React Documentation](https://react.dev/)

:::

### To Deploy an App

- **System administration**: Basic knowledge of server management
- **Database administration**: Familiarity with PostgreSQL for data management
- **Docker**: Understanding of containerization concepts
- **Service monitoring**: Ability to monitor and troubleshoot services
- **Command line tools**: Proficiency with terminal commands

### To Configure an App

ODE applications consist of JSON files, form schemas, custom applications, and translations. The following technical skills are necessary:

#### JSON Schema

Forms in ODE are defined using JSON Schema. Understanding JSON Schema is essential for building forms.

**Key concepts:**
- Schema structure and validation
- Data types and constraints
- Conditional logic

#### JSON Forms

Form layouts are defined using JSON Forms UI Schema. Familiarity with JSON Forms is important for creating user interfaces.

**Key concepts:**
- UI Schema structure
- Control rendering
- Layout configuration

#### JavaScript/TypeScript

Custom applications are built using JavaScript or TypeScript. A good understanding of these languages is required for building custom applications.

**Key concepts:**
- ES6+ features
- TypeScript types (if using TypeScript)
- Async/await patterns
- React hooks and components

#### PostgreSQL

ODE uses PostgreSQL for data storage. Familiarity with SQL and PostgreSQL is useful for data management and analytics.

**Key concepts:**
- Basic SQL queries
- Database schema design
- Data relationships

:::tip[Start Simple]

You don't need to be an expert in all these areas to get started. Begin with the basics and learn as you build your application.

:::

## Quick Checklist

Before proceeding, verify you have:

- [ ] Node.js 18+ installed
- [ ] Docker and Docker Compose installed
- [ ] Git installed
- [ ] Synkronus CLI installed (or ready to install)
- [ ] Basic understanding of command line tools
- [ ] (Optional) Android Studio for Android development
- [ ] (Optional) Xcode for iOS development (macOS only)

## Next Steps

Once you have all prerequisites in place:

1. Proceed to [Setup Environment](/docs/quick-start/setup-environment)
2. Follow the platform-specific instructions
3. Continue with [Deploy Local Instance](/docs/quick-start/deploy-local-instance)

:::note[Questions?]

If you're unsure about any prerequisites or need help installing tools, check the [FAQ](/docs/quick-start/faq) or reach out on our [community forum](https://forum.opendataensemble.org).

:::
