// src/services/apiService.ts
// Barrel export file for backward compatibility
// This file maintains the same API surface as the original apiService.ts
// while delegating to the new split implementations

// Re-export all client-side functions (using axios)
// Note: Some functions are duplicated between server and client files
// The client versions take precedence for backward compatibility
export * from './apiService.client';

// Re-export all server-side functions (using fetch)
export * from './apiService.server';

// Re-export all types and interfaces
export * from './apiService.types';
