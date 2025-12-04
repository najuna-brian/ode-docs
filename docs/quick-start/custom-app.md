---
sidebar_position: 4
---

# Making It Yours

Create your first custom application with ODE.

## Overview

This guide will help you create your first custom application for ODE. Custom applications allow you to build tailored data collection experiences using JSON Forms and React.

:::important[Prerequisites]

Before creating a custom app, make sure:
- You have a local Synkronus instance running (see [Deploy Local Instance](/docs/quick-start/deploy-local-instance))
- You understand basic JSON Schema and JSON Forms (see [Prerequisites](/docs/quick-start/prerequisites))
- Node.js is installed (see [Setup Environment](/docs/quick-start/setup-environment))

:::

## What is a Custom App?

A custom app in ODE is a web application bundle that:
- Defines forms using JSON Schema
- Uses JSON Forms for UI rendering
- Can be deployed to Synkronus server
- Syncs data with mobile apps via Formulus

## Quick Start

### Step 1: Create App Bundle Structure

Create a directory for your custom app:

```bash
mkdir my-custom-app
cd my-custom-app
```

### Step 2: Create Form Schema

Create a `forms` directory and add your first form:

```bash
mkdir forms
```

Create `forms/patient-registration.json`:

```json
{
  "id": "patient-registration",
  "title": "Patient Registration",
  "schema": {
    "type": "object",
    "properties": {
      "patientName": {
        "type": "string",
        "title": "Patient Name"
      },
      "age": {
        "type": "number",
        "title": "Age"
      },
      "gender": {
        "type": "string",
        "title": "Gender",
        "enum": ["Male", "Female", "Other"]
      },
      "dateOfVisit": {
        "type": "string",
        "format": "date",
        "title": "Date of Visit"
      }
    },
    "required": ["patientName", "age", "dateOfVisit"]
  },
  "uischema": {
    "type": "VerticalLayout",
    "elements": [
      {
        "type": "Control",
        "scope": "#/properties/patientName"
      },
      {
        "type": "Control",
        "scope": "#/properties/age"
      },
      {
        "type": "Control",
        "scope": "#/properties/gender"
      },
      {
        "type": "Control",
        "scope": "#/properties/dateOfVisit"
      }
    ]
  }
}
```

### Step 3: Create App Bundle Manifest

Create `manifest.json`:

```json
{
  "id": "my-custom-app",
  "name": "My Custom App",
  "version": "1.0.0",
  "description": "My first custom ODE application",
  "forms": [
    "forms/patient-registration.json"
  ]
}
```

### Step 4: Package App Bundle

Create a ZIP file of your app:

```bash
zip -r my-custom-app-v1.0.0.zip manifest.json forms/
```

### Step 5: Upload to Synkronus

Upload your app bundle to Synkronus:

```bash
# Get authentication token
TOKEN=$(curl -s -X POST http://localhost/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"YOUR_ADMIN_PASSWORD"}' \
  | grep -o '"token":"[^"]*"' | cut -d'"' -f4)

# Upload app bundle
curl -X POST http://localhost/api/v1/app-bundles \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: multipart/form-data" \
  -F "bundle=@my-custom-app-v1.0.0.zip"
```

:::success[App Bundle Uploaded]

Your custom app is now available on the server! Mobile apps can sync and use it.

:::

## Detailed Guide

### Understanding App Bundles

An app bundle is a ZIP file containing:
- `manifest.json` - App metadata and configuration
- `forms/` - Form definitions (JSON Schema + UI Schema)
- `assets/` (optional) - Images, styles, etc.
- `translations/` (optional) - Localization files

### Form Structure

Each form consists of:

1. **JSON Schema**: Defines the data structure
2. **UI Schema**: Defines how the form is rendered

#### JSON Schema Example

```json
{
  "type": "object",
  "properties": {
    "fieldName": {
      "type": "string",
      "title": "Field Label",
      "description": "Field description"
    }
  },
  "required": ["fieldName"]
}
```

#### UI Schema Example

```json
{
  "type": "VerticalLayout",
  "elements": [
    {
      "type": "Control",
      "scope": "#/properties/fieldName"
    }
  ]
}
```

### Advanced Features

#### Conditional Logic

Add conditional visibility:

```json
{
  "type": "Control",
  "scope": "#/properties/fieldName",
  "rule": {
    "effect": "SHOW",
    "condition": {
      "scope": "#/properties/anotherField",
      "schema": {
        "const": "someValue"
      }
    }
  }
}
```

#### Validation

Add custom validation:

```json
{
  "type": "string",
  "title": "Email",
  "format": "email",
  "minLength": 5,
  "maxLength": 100
}
```

#### Custom Renderers

Use custom renderers for special field types:

```json
{
  "type": "Control",
  "scope": "#/properties/photo",
  "options": {
    "format": "uri"
  }
}
```

## Using the Reference App

A good starting point is the reference app included with ODE:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/opendataensemble/ode.git
   cd ode
   ```

2. **Explore the reference app structure:**
   ```bash
   ls -la reference-app/
   ```

3. **Study the forms:**
   ```bash
   cat reference-app/forms/*.json
   ```

4. **Use as a template:**
   - Copy forms you like
   - Modify to fit your needs
   - Create your own variations

## Best Practices

### Form Design

- **Keep forms focused**: One form, one purpose
- **Use clear labels**: Make field names descriptive
- **Add help text**: Use descriptions to guide users
- **Validate input**: Add appropriate validation rules
- **Test thoroughly**: Test forms before deploying

### App Bundle Organization

- **Version your bundles**: Use semantic versioning (1.0.0, 1.1.0, etc.)
- **Document your forms**: Add descriptions and comments
- **Organize files**: Use clear directory structure
- **Keep it simple**: Start simple, add complexity gradually

### Deployment

- **Test locally first**: Test your app bundle before deploying
- **Version control**: Use Git to track changes
- **Backup before updates**: Keep previous versions
- **Monitor usage**: Check how your app is being used

## Testing Your Custom App

### Step 1: Upload Test Bundle

```bash
# Upload your app bundle (see Step 5 above)
```

### Step 2: Sync from Mobile App

1. Open Formulus app
2. Go to Settings
3. Ensure server is configured
4. Go to Sync screen
5. Tap "Sync Now"
6. Your custom app should download

### Step 3: Test Forms

1. Navigate to your custom app in Formulus
2. Open a form
3. Fill it out
4. Submit
5. Sync back to server

### Step 4: Verify Data

```bash
# Check observations were created
curl -X POST http://localhost/sync/pull \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"client_id":"test","since":{"version":0},"schema_types":[]}'
```

## Troubleshooting

### App Bundle Not Uploading

**Problem:** Upload fails

**Solutions:**
- Check file size (should be reasonable)
- Verify ZIP file is valid: `unzip -t my-custom-app.zip`
- Check server logs: `docker compose logs synkronus`
- Verify authentication token is valid

### Forms Not Appearing

**Problem:** Forms don't show in mobile app

**Solutions:**
- Verify app bundle was uploaded successfully
- Check manifest.json is valid JSON
- Ensure forms are listed in manifest
- Sync mobile app again
- Check mobile app logs

### Validation Errors

**Problem:** Forms have validation errors

**Solutions:**
- Validate JSON Schema: Use online JSON Schema validator
- Check UI Schema matches JSON Schema
- Verify all required fields are present
- Test with sample data

## Next Steps

After creating your first custom app:

1. ✅ Learn about [Form Design](/docs/build/forms/design/schema-definition)
2. ✅ Explore [Advanced Features](/docs/build/forms/advanced-features/multimedia)
3. ✅ Study [Custom Renderers](/docs/build/custom-applications/custom-renderers)
4. ✅ Read [App Bundle Format](/docs/reference/app-bundle-format)

## Resources

- [JSON Schema Documentation](https://json-schema.org/)
- [JSON Forms Documentation](https://jsonforms.io/)
- [ODE Forms Guide](/docs/build/forms/overview)
- [Custom Applications Guide](/docs/build/custom-applications/overview)

:::success[Custom App Created]

You've created your first custom application! Continue learning and building more sophisticated apps.

:::
