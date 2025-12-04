---
sidebar_position: 5
---

# Upload Test Data

Upload sample data to your local ODE instance for testing.

## Overview

This guide shows you how to upload test data to your local Synkronus instance. Test data helps you verify that your setup is working correctly and provides sample data for development and testing.

:::important[Prerequisites]

Before uploading test data, make sure:
- Your local instance is running (see [Deploy Local Instance](/docs/quick-start/deploy-local-instance))
- You have authentication credentials (admin username and password)
- Synkronus CLI is installed (see [Setup Environment](/docs/quick-start/setup-environment))

:::

## Using Synkronus CLI

The easiest way to upload test data is using the Synkronus CLI.

### Step 1: Get Authentication Token

First, authenticate and get your token:

```bash
# Get authentication token
TOKEN=$(curl -s -X POST http://localhost/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"YOUR_ADMIN_PASSWORD"}' \
  | grep -o '"token":"[^"]*"' | cut -d'"' -f4)

# Verify token was obtained
echo "Token: $TOKEN"
```

:::tip[Save Your Token]

You'll need this token for subsequent API calls. The token is valid for a limited time (check the `expiresAt` field in the login response).

:::

### Step 2: Prepare Test Data

Create a test data file in JSON format. Here's an example `test-data.json`:

```json
{
  "observations": [
    {
      "id": "obs-001",
      "form_id": "test-form",
      "data": {
        "name": "Test Observation",
        "value": 42,
        "timestamp": "2025-01-01T00:00:00Z"
      },
      "created_at": "2025-01-01T00:00:00Z",
      "updated_at": "2025-01-01T00:00:00Z"
    },
    {
      "id": "obs-002",
      "form_id": "test-form",
      "data": {
        "name": "Another Test",
        "value": 100,
        "timestamp": "2025-01-02T00:00:00Z"
      },
      "created_at": "2025-01-02T00:00:00Z",
      "updated_at": "2025-01-02T00:00:00Z"
    }
  ]
}
```

### Step 3: Upload Using CLI

```bash
# Using Synkronus CLI
synk data upload --file test-data.json --url http://localhost --token $TOKEN
```

:::info[CLI Options]

For more information about Synkronus CLI commands, see the [CLI Reference](/docs/components/synkronus-cli/commands-reference).

:::

## Manual Upload via API

You can also upload data manually using the API directly.

### Step 1: Authenticate

```bash
# Get authentication token
TOKEN=$(curl -s -X POST http://localhost/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"YOUR_ADMIN_PASSWORD"}' \
  | grep -o '"token":"[^"]*"' | cut -d'"' -f4)
```

### Step 2: Upload Observations

```bash
# Upload observations via sync/push endpoint
curl -X POST http://localhost/sync/push \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d @test-data.json
```

### Step 3: Verify Upload

```bash
# Pull data to verify upload
curl -X POST http://localhost/sync/pull \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"client_id":"test","since":{"version":0},"schema_types":[]}'
```

## Data Format

### Observation Structure

Observations should follow this structure:

```json
{
  "id": "unique-observation-id",
  "form_id": "form-identifier",
  "data": {
    "field1": "value1",
    "field2": "value2"
  },
  "created_at": "ISO 8601 timestamp",
  "updated_at": "ISO 8601 timestamp",
  "deleted": false
}
```

### Required Fields

- `id`: Unique identifier for the observation
- `form_id`: Identifier for the form this observation belongs to
- `data`: JSON object containing the observation data
- `created_at`: ISO 8601 timestamp
- `updated_at`: ISO 8601 timestamp

### Optional Fields

- `deleted`: Boolean indicating if the observation is deleted (default: `false`)

## Example Test Data

Here's a more complete example with different types of observations:

```json
{
  "observations": [
    {
      "id": "health-check-001",
      "form_id": "health-assessment",
      "data": {
        "patient_name": "John Doe",
        "temperature": 98.6,
        "blood_pressure": "120/80",
        "notes": "Patient is healthy"
      },
      "created_at": "2025-01-15T10:00:00Z",
      "updated_at": "2025-01-15T10:00:00Z"
    },
    {
      "id": "survey-001",
      "form_id": "community-survey",
      "data": {
        "respondent_name": "Jane Smith",
        "age": 35,
        "location": "Village A",
        "responses": {
          "question1": "Yes",
          "question2": "No",
          "question3": "Maybe"
        }
      },
      "created_at": "2025-01-15T11:00:00Z",
      "updated_at": "2025-01-15T11:00:00Z"
    }
  ]
}
```

## Verifying Upload

### Check via API

```bash
# Pull all observations
curl -X POST http://localhost/sync/pull \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"client_id":"test","since":{"version":0},"schema_types":[]}' \
  | jq '.'
```

### Check via Database

```bash
# Connect to database
docker compose exec postgres psql -U synkronus_user -d synkronus

# Query observations
SELECT id, form_id, created_at FROM observations LIMIT 10;
```

## Troubleshooting

### Authentication Fails

**Problem:** Getting 401 Unauthorized errors

**Solutions:**
- Verify your username and password are correct
- Check that the token hasn't expired
- Make sure you're including the token in the Authorization header: `Bearer $TOKEN`

### Upload Fails

**Problem:** Upload returns error

**Solutions:**
1. **Check data format:**
   ```bash
   # Validate JSON
   cat test-data.json | jq .
   ```

2. **Check server logs:**
   ```bash
   docker compose logs synkronus
   ```

3. **Verify server is running:**
   ```bash
   curl http://localhost/health
   ```

### Data Not Appearing

**Problem:** Upload succeeds but data doesn't appear

**Solutions:**
1. **Check sync version:**
   ```bash
   curl -H "Authorization: Bearer $TOKEN" http://localhost/version
   ```

2. **Pull data to verify:**
   ```bash
   curl -X POST http://localhost/sync/pull \
     -H "Authorization: Bearer $TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"client_id":"test","since":{"version":0},"schema_types":[]}'
   ```

3. **Check database directly:**
   ```bash
   docker compose exec postgres psql -U synkronus_user -d synkronus -c "SELECT COUNT(*) FROM observations;"
   ```

## Best Practices

### Data Organization

- Use meaningful `form_id` values to organize observations
- Include timestamps in ISO 8601 format
- Use consistent field names across observations

### Testing Workflow

1. Upload a small test dataset first
2. Verify the upload was successful
3. Test syncing from a mobile app
4. Gradually add more complex data

### Data Cleanup

To remove test data:

```bash
# Delete observations via API (if supported)
# Or directly in database:
docker compose exec postgres psql -U synkronus_user -d synkronus -c "DELETE FROM observations WHERE form_id = 'test-form';"
```

:::warning[Data Deletion]

Be careful when deleting data. Make sure you're deleting test data, not production data!

:::

## Next Steps

After uploading test data:

1. ✅ [Install Formulus App](/docs/quick-start/formulus-app) - Connect the mobile app to sync data
2. ✅ [Create Custom App](/docs/quick-start/custom-app) - Build your first custom application
3. ✅ Learn about [Forms](/docs/build/forms/overview) - Create your own forms

:::success[Test Data Uploaded]

Your test data is now available in your local instance! You can start testing your applications.

:::
