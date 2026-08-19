<!-- markdownlint-disable -->

# Hardening Report: shogo82148--actions-github-app-token/v1.3.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **shogo82148--actions-github-app-token/v1.3.0** was hardened automatically. 2 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### missing-permissions (severity: medium)

The workflow file check-dist.yaml has no top-level `permissions:` key and the only job (`check-dist`) also has no job-level `permissions:` block. Without explicit permissions, the workflow inherits the default (potentially broad) repository permissions.

Locations:

- `.github/workflows/check-dist.yaml:1`

### missing-permissions (severity: medium)

The workflow file test.yaml has no top-level `permissions:` key. The `provider` job has job-level permissions, but the `action` job does not have any `permissions:` block, leaving it with default (potentially broad) repository permissions.

Locations:

- `.github/workflows/test.yaml:1`

## Iteration Notes

### Iteration 1

**Fixes applied:** missing-permissions

**Notes:**

Fixed missing permissions in two workflow files:
1. `.github/workflows/check-dist.yaml`: Added top-level `permissions: contents: read` and a job-level `permissions` block on `check-dist` with `contents: read` and `actions: write` (the latter required for the `actions/upload-artifact` step).
2. `.github/workflows/test.yaml`: Added top-level `permissions: contents: read` and a job-level `permissions: contents: read` block on the `action` job. The `provider` job already had its own explicit permissions (`id-token: write`, `contents: read`) and was not changed.

