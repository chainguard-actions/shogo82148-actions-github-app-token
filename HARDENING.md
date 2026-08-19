<!-- markdownlint-disable -->

# Hardening Report: shogo82148--actions-github-app-token/v1.1.2

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **shogo82148--actions-github-app-token/v1.1.2** was hardened automatically. 1 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### missing-permissions (severity: medium)

The workflow file test.yaml has no top-level `permissions:` key, and the `action` job (which runs on ubuntu-latest, macos-latest, and windows-latest via matrix) has no job-level `permissions:` key. Only the `provider` job defines permissions. Without explicit permissions, the `action` job inherits the default repository permissions (which may include write access to contents and other scopes), violating the principle of least privilege.

Locations:

- `.github/workflows/test.yaml:1`

## Iteration Notes

### Iteration 1

**Fixes applied:** missing-permissions

**Notes:**

Added a job-level `permissions:` block to the `action` job in `.github/workflows/test.yaml` with `contents: read`. This is the minimum permission required for the job, which only checks out the repository and runs tests (setup-go, setup-node, npm ci, npm test). The `provider` job already had its own permissions block and was not modified.

