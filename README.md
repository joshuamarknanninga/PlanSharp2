# PlanSharp MVP (MERN + React Native)

PlanSharp is an offline-first blueprint/document scanning MVP with React Native + Expo mobile client, optional React web dashboard, and Node/Express/MongoDB backend.

## What works in this MVP
- High-resolution capture flow in Expo Camera (`quality: 1`) and non-lossy PNG enhancement pipeline.
- Local-first storage of enhanced scans + metadata in device storage (`FileSystem` + `AsyncStorage`).
- OCR adapter interface + searchable server metadata index.
- JWT auth + bcrypt hashes + secure route middleware.
- Server-side image normalization/sharpening and OCR fallback through Tesseract.
- Scan upload and text search APIs.

## Monorepo structure
```
.
├── apps
│   ├── mobile
│   │   ├── App.tsx
│   │   ├── app.json
│   │   └── src
│   │       ├── navigation
│   │       ├── screens
│   │       ├── services
│   │       ├── store
│   │       └── types
│   └── web
│       └── src
├── backend
│   └── src
│       ├── config
│       ├── controllers
│       ├── middleware
│       ├── models
│       ├── routes
│       └── services
├── scripts
│   └── setup.sh
└── .env.example
```

## Setup
1. Install Node 20+ and npm 10+.
2. Run:
   ```bash
   ./scripts/setup.sh
   ```
3. Start backend:
   ```bash
   npm run dev:backend
   ```
4. Start mobile app:
   ```bash
   npm run dev:mobile
   ```
5. Optional dashboard:
   ```bash
   npm run dev:web
   ```

## Environment
Root `.env` values:
- `MONGODB_URI`
- `JWT_SECRET`
- `PORT`
- `NODE_ENV`

Mobile `.env` values:
- `EXPO_PUBLIC_API_URL`

## API routes
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/scans` (multipart, auth)
- `GET /api/scans/search?q=...` (auth)

## Mobile pipeline design
1. Capture with camera at full quality.
2. Native adapter slot (VisionKit/ML Kit) for edge and contour detection.
3. Perspective correction adapter.
4. Readability enhancement.
5. OCR adapter.
6. Offline save + sync queue.
7. Export/share.

## EAS build
- Initialize project IDs and credentials:
  ```bash
  npx eas build:configure
  ```
- Build Android AAB:
  ```bash
  npx eas build --platform android --profile production
  ```
- Build iOS IPA:
  ```bash
  npx eas build --platform ios --profile production
  ```

## Testing and quality
- `npm run lint`
- `npm run test`
- Add native adapter tests for VisionKit/ML Kit bridge implementation.

## Production hardening checklist
- Replace OCR placeholder bridge with production native modules.
- Add OpenCV service for contour detection + deskew + perspective warp.
- Add multipage searchable PDF export worker.
- Add SQLite sync queue and conflict resolution.
- Add rate limiting, audit logging, and S3 object storage module.
