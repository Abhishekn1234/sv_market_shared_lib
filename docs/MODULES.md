# Modules Reference

This document provides a high-level reference for the modules included in the `@faizudheen/shared` library.

## Auth (`/src/auth`)
Handles authentication logic, strategies, and guards.
*   **Guards**: `JwtAuthGuard` (protects routes with JWT).
*   **Strategies**: `JwtStrategy` (extracts/validates JWT from headers).
*   **Decorators**: `@GetUser()` (extracts user from request).

## Booking (`/src/booking`)
The core booking domain.
*   **Service**: `BookingService` (Create, cancel, assign workers to bookings).
*   **Models**: `BookingEntity`, `AssignWorkerEntity`.
*   **Events**: `BookingEvents` (lifecycle events like CREATED, COMPLETED).
*   **DTOs**: `CreateBookingInput` (inputs for creating a booking).

## Categories (`/src/categories`)
Service categories management.
*   **Models**: `CategoryEntity`.
*   **DTOs**: Input/Output types for category CRUD operations.

## Cloudinary (`/src/cloudinary`)
Integration helper for Cloudinary media uploads.
*   **Service**: `CloudinaryService` (upload, delete images).
*   **Provider**: `CloudinaryProvider` (configuration setup).

## Common DTOs (`/src/common-dtos`)
Reusable DTOs for standardization.
*   `PaginationQueryDto`: Standard query params for paginated lists.
*   `ApiResponseDto`: Standard API response wrappers.

## Enums (`/src/enums`)
Shared enumerations.
*   `UserRole`: Roles like ADMIN, CUSTOMER, WORKER.
*   `BookingStatus`: Statuses like REQUESTED, SCHEDULED, COMPLETED.

## Services (`/src/services`)
Defines the specific services workers can perform (e.g., "Plumbing", "Cleaning").
*   **Models**: `ServiceEntity`, `ServiceTier`.
*   **DTOs**: `CreateServiceInput`, `UpdateServiceDto`.

## User Groups (`/src/user-groups`)
Management particular for grouping users (e.g., families, corporate accounts).
*   **Models**: `UserGroupEntity`.

## Users (`/src/users`)
Customer user profiles.
*   **Models**: `UserEntity`.
*   **DTOs**: `CreateUserDto`, `UpdateUserProfileDto`.

## Worker (`/src/worker`)
Service Provider (Worker) profiles.
*   **Models**: `WorkerEntity` (profile details, skills).
*   **DTOs**: `RegisterWorkerDto`, `UpdateWorkerStatusDto`.
