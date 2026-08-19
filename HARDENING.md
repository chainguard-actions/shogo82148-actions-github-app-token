<!-- markdownlint-disable -->

# Hardening Report: shogo82148--actions-github-app-token/v1.1.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **shogo82148--actions-github-app-token/v1.1.0** was hardened automatically. 1 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### missing-permissions (severity: medium)

The workflow file .github/workflows/test.yaml has no top-level `permissions:` key, and the `action` job (which runs on `push` and `pull_request` triggers) has no job-level `permissions:` key either. Only the `provider` job defines permissions. Without explicit permissions, the `action` job inherits the default repository token permissions, which may be broader than necessary.

Locations:

- `.github/workflows/test.yaml:1`

## Iteration Notes

### Iteration 1

**Fixes applied:** missing-permissions

**Notes:**

Added `permissions: contents: read` to the `action` job in `.github/workflows/test.yaml`. The job only performs checkout, Go/Node.js setup, and test runs — it requires only read access to repository contents. This replaces the implicit default token permissions with an explicit minimal set, following the principle of least privilege.

