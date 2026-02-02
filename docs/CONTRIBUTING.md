# Contributing Guide

We welcome contributions to the shared library! This guide will help you get started.

## Development Workflow

1.  **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd sv_shared
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Make changes**:
    *   Create a new branch for your feature or fix.
    *   Follow the existing directory structure (create new folders for new modules).
    *   Ensure all DTOs have `class-validator` decorators.
    *   Ensure all API-facing classes have `@nestjs/swagger` decorators.

4.  **Build**:
    Verify that the project builds correctly:
    ```bash
    npm run build
    ```

## Publishing (CI/CD)

This package is published to the GitHub Package Registry. Publishing is typically handled by CI/CD pipelines, but if manual publishing is required:

1.  Increment the version in `package.json`.
2.  Run `npm run build`.
3.  Run `npm publish`.

## Coding Standards

*   **DTOs**: Use `class-validator` for validation rules.
*   **Swagger**: Use `@ApiProperty`, `@ApiOperation`, etc., for all DTOs and Controllers.
*   **Imports**: Use relative imports within the internal modules, but ensure `index.ts` files properly export public members.
