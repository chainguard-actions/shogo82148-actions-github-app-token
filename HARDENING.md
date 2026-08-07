<!-- markdownlint-disable -->

# Hardening Report: shogo82148--actions-github-app-token/v1.3.2

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **shogo82148--actions-github-app-token/v1.3.2** was hardened automatically. 2 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### missing-permissions (severity: medium)

The workflow file .github/workflows/check-dist.yaml has no top-level `permissions:` key and the only job (`check-dist`) also has no job-level `permissions:` key. This means the workflow runs with the default (potentially broad) token permissions.

Locations:

- `.github/workflows/check-dist.yaml:1`

### missing-permissions (severity: medium)

The workflow file .github/workflows/test.yaml has no top-level `permissions:` key, and the `action` job (lines ~30–60) has no job-level `permissions:` key. Only the `provider` job has explicit permissions. Because not every job has a `permissions:` block and there is no top-level block, the `action` job runs with default (potentially broad) token permissions.

Locations:

- `.github/workflows/test.yaml:1`

## Iteration Notes

### Iteration 1

**Fixes applied:** missing-permissions

**Notes:**

Fixed missing permissions in two workflow files:
1. `.github/workflows/check-dist.yaml`: Added top-level `permissions: contents: read` block. The workflow only needs to read repository contents for checkout, build, and diff comparison steps.
2. `.github/workflows/test.yaml`: Added job-level `permissions: contents: read` to the `action` job. This job only checks out code and runs tests. The `provider` job already had explicit permissions (id-token: write, contents: read).

