# Go Green — Firebase Setup

## Status: Credentials Copied from The Green Grower

The Firebase config in `src/firebase.ts` is populated with credentials from the Go Green project (`go-green-622e3`).

## Firestore Rules

Make sure these rules are deployed in The Green Grower Firebase Console → Firestore Database → Rules:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /users/{userId}/data/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## Authentication

Ensure **Email/Password** sign-in is enabled in Firebase Console → Authentication → Sign-in method.

## Build
```bash
npm run build
```
