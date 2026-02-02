# Shared Library (`@faizudheen/shared`)

This repository contains shared DTOs, schemas, interfaces, and utility modules for the SV (Service Vendor) projects. It serves as a central location for common types and logic used across multiple microservices or applications.

## Installation

To install this package in your project:

```bash
npm install @faizudheen/shared
```

**Note**: You may need to configure your `.npmrc` to point to the GitHub Package Registry if this package is hosted there.

## Modules

The library exports the following modules:

*   **Auth**: Authentication strategies, guards, and DTOs.
*   **Booking**: Booking-related DTOs, enums, and schemas.
*   **Categories**: Category management definitions.
*   **Cloudinary**: Cloudinary integration helpers.
*   **Common DTOs**: Shared Data Transfer Objects used across multiple modules.
*   **Enums**: Common enumerations.
*   **Interfaces**: Shared TypeScript interfaces.
*   **Services**: Service definitions and DTOs.
*   **User Groups**: Types and schemas for user group management.
*   **Users**: User profile and management definitions.
*   **Worker**: Worker-related definitions and schemas.

## Usage

Import the necessary types or utilities directly from the package:

```typescript
import { CreateBookingDto, BookingStatus } from '@faizudheen/shared';
import { UserRole } from '@faizudheen/shared';

// Use in your service or controller
const booking: CreateBookingDto = {
  // ...
};
```

## Development

### Build

To build the project:

```bash
npm run build
```

This will compile the TypeScript code into the `dist` directory.

### Project Structure

The source code is located in `src/`. Each module has its own directory containing specific logic, DTOs, and schemas.

For more detailed documentation, checking the `docs/` folder (if available) or the source code in `src/`.
