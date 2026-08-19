<!-- markdownlint-disable -->

# Hardening Report: shogo82148--actions-github-app-token/v1.1.1

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **shogo82148--actions-github-app-token/v1.1.1** was hardened automatically. 1 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### missing-permissions (severity: medium)

The workflow file test.yaml has no top-level `permissions:` block, and the `action` job (which runs the npm test suite across ubuntu-latest, macos-latest, and windows-latest) has no job-level `permissions:` key either. Only the `provider` job has explicit permissions. Without a permissions declaration, the `action` job inherits the default repository permissions, which may be broader than necessary.

Locations:

- `.github/workflows/test.yaml:24`

## Iteration Notes

### Iteration 1

**Fixes applied:** missing-permissions

**Notes:**

Added `permissions: contents: read` to the `action` job in `.github/workflows/test.yaml`. The job only performs code checkout and runs npm tests, so `contents: read` is the minimum necessary permission. This prevents the job from inheriting potentially broader default repository permissions.

