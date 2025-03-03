# GiftNub Shared Gift Data

This module contains shared gift data constants and interfaces that are used by both the frontend Angular application and backend Lambda functions. It ensures consistency across the application and prevents duplication of data.

## Usage

The module is automatically included in the TypeScript compilation process using path mapping in the tsconfig files. No separate build step is required.

### In Frontend Angular Code

```typescript
import { Gift, GIFT_DATA, getGiftsByCategory } from '@giftnub/gift-data';

// Use the exported constants and functions
const luxuryGifts = getGiftsByCategory('luxury');
```

### In Lambda Functions

```typescript
import { Gift, GIFT_DATA } from '@giftnub/gift-data';

// Use the gift interface for typing
const formatGift = (data): Gift => {
  // Implementation
};
```

## Structure

- `index.ts`: Main entry point that exports all gift data
- Types:
  - `Gift`: Interface for gift objects

## Maintenance

When modifying the gift data:
1. Make changes only in this shared module (libs/shared/gift-data/index.ts)
2. The changes will be automatically included in both frontend and backend builds 