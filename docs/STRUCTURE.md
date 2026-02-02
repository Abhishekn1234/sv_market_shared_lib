# Project Structure

The project follows a modular structure where each domain has its own dedicated directory. This internal structure allows for better organization and scalability.

## Root Directory

*   `src/`: Contains the source code.
*   `dist/`: compiled output files (generated after build).
*   `.npmrc`: Configuration for NPM registry interactions.
*   `tsconfig.json` & `tsconfig.build.json`: TypeScript configurations.

## Source Directory (`src/`)

The `src` folder is reorganized by modules. Each module folder typically contains:

*   **Logic**:
    *   `*.service.ts`: Business logic and data manipulation.
    *   `*.module.ts`: NestJS module definitions.
*   **Data Models**:
    *   `dto/`: Data Transfer Objects for API requests/responses.
    *   `schemas/`: Database schemas (Mongoose models).
    *   `interfaces/`: TypeScript interfaces.
*   **Metadata**:
    *   `enums/`: Module-specific enumerations.
    *   `decorators/`: Custom decorators.
    *   `guards/`: Authentication/Authorization guards.

### Key Modules

*   **`auth/`**: Contains `AuthGuard`, `JwtStrategy`, and auth-related DTOs.
*   **`booking/`**: Core booking logic (`BookingService`), event listeners, and models.
*   **`worker/`**: Worker profiles (service providers) logic and schemas.
*   **`users/`**: Customer user profiles.
*   **`services/`**: Definition of services offered (pricing tiers, categories).
*   **`common-dtos/`**: General purpose DTOs used across multiple domains.

## Dependencies

This shared library is "heavy" in that it includes service logic, not just types. Consumers of this library (e.g., API Gateway, Worker Service) must ensure they provide the necessary dependencies (Mongoose connections, Redis instances configurations) for these imported modules to function correctly.
