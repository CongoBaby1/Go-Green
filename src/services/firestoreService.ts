import { db } from '../firebase';
import {
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  serverTimestamp,
} from 'firebase/firestore';
import type { PersistedState, UserProfile } from '../data/types';
import type { PhotoPersistedState } from '../photoperiod/data/types';

const STATE_DOC = 'growState';
const PHOTO_STATE_DOC = 'photoGrowState';
const PROFILE_DOC = 'profile';

export function userStateRef(uid: string) {
  return doc(db, 'users', uid, 'data', STATE_DOC);
}

export function userPhotoStateRef(uid: string) {
  return doc(db, 'users', uid, 'data', PHOTO_STATE_DOC);
}

export function userProfileRef(uid: string) {
  return doc(db, 'users', uid, 'data', PROFILE_DOC);
}

/**
 * Save user profile (name, email) to Firestore.
 */
export async function saveUserProfile(uid: string, profile: UserProfile): Promise<void> {
  const ref = userProfileRef(uid);
  const payload: Record<string, any> = {};
  Object.entries(profile).forEach(([k, v]) => {
    if (v !== undefined) payload[k] = v;
  });
  payload.updatedAt = serverTimestamp();
  await setDoc(ref, payload, { merge: true });
}

/**
 * Load user profile from Firestore.
 */
export async function loadUserProfile(uid: string): Promise<UserProfile | null> {
  const ref = userProfileRef(uid);
  const snap = await getDoc(ref);
  if (snap.exists()) {
    const data = snap.data() as any;
    return {
      uid: data.uid || uid,
      email: data.email || '',
      name: data.name || undefined,
    };
  }
  return null;
}

/**
 * Load the user's persisted grow state from Firestore.
 */
export async function loadGrowState(uid: string): Promise<PersistedState | null> {
  const ref = userStateRef(uid);
  const snap = await getDoc(ref);
  if (snap.exists()) {
    const data = snap.data() as any;
    // Firestore may have stripped undefined values, so we sanitize
    const state: PersistedState = {
      breederLifecycle: data.breederLifecycle ?? 80,
      startDate: data.startDate ?? '',
      currentDay: data.currentDay ?? 1,
      completedCheckpoints: data.completedCheckpoints ?? {},
      timestamps: data.timestamps ?? {},
      setupComplete: data.setupComplete ?? false,
      germPath: data.germPath ?? null,
      subzeroActive: data.subzeroActive ?? false,
      readings: data.readings ?? [],
      feedings: data.feedings ?? [],
    };
    return state;
  }
  return null;
}

/**
 * Save (overwrite) the user's grow state to Firestore.
 */
export async function saveGrowState(uid: string, state: PersistedState): Promise<void> {
  const ref = userStateRef(uid);
  // Remove any undefined values before saving
  const payload: Record<string, any> = {};
  Object.entries(state).forEach(([k, v]) => {
    if (v !== undefined) payload[k] = v;
  });
  payload.updatedAt = serverTimestamp();
  await setDoc(ref, payload, { merge: true });
}

/**
 * Delete the user's grow state from Firestore.
 */
export async function deleteGrowState(uid: string): Promise<void> {
  const ref = userStateRef(uid);
  await deleteDoc(ref);
}

/**
 * Load the user's photoperiod grow state from Firestore.
 */
export async function loadPhotoGrowState(uid: string): Promise<PhotoPersistedState | null> {
  const ref = userPhotoStateRef(uid);
  const snap = await getDoc(ref);
  if (snap.exists()) {
    const data = snap.data() as any;
    const state: PhotoPersistedState = {
      completedCheckpoints: data.completedCheckpoints ?? {},
      timestamps: data.timestamps ?? {},
      flipped: data.flipped ?? false,
    };
    return state;
  }
  return null;
}

/**
 * Save (overwrite) the user's photoperiod grow state to Firestore.
 */
export async function savePhotoGrowState(uid: string, state: PhotoPersistedState): Promise<void> {
  const ref = userPhotoStateRef(uid);
  const payload: Record<string, any> = {};
  Object.entries(state).forEach(([k, v]) => {
    if (v !== undefined) payload[k] = v;
  });
  payload.updatedAt = serverTimestamp();
  await setDoc(ref, payload, { merge: true });
}
