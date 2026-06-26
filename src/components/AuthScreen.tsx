import { useState } from 'react';
import { auth } from '../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import type { UserProfile } from '../data/types';
import { saveUserProfile, loadUserProfile } from '../services/firestoreService';

interface AuthScreenProps {
  onAuth: (profile: UserProfile) => void;
}

export default function AuthScreen({ onAuth }: AuthScreenProps) {
  const [isSignUp, setIsSignUp] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    const trimmedName = name.trim();

    if (!trimmedEmail || !trimmedPassword) {
      setErrorMsg('Please enter your email and password.');
      return;
    }
    if (trimmedPassword.length < 6) {
      setErrorMsg('Password must be at least 6 characters.');
      return;
    }

    if (isSignUp && !trimmedName) {
      setErrorMsg('Please enter your name.');
      return;
    }

    setIsSubmitting(true);

    try {
      let fbUser = null;
      if (isSignUp) {
        const cred = await createUserWithEmailAndPassword(auth, trimmedEmail, trimmedPassword);
        fbUser = cred.user;
      } else {
        const cred = await signInWithEmailAndPassword(auth, trimmedEmail, trimmedPassword);
        fbUser = cred.user;
      }

      const profile: UserProfile = {
        uid: fbUser.uid,
        email: fbUser.email || trimmedEmail,
        name: isSignUp ? trimmedName : undefined,
      };

      // Save profile to Firestore on signup, or load existing name on signin
      if (isSignUp) {
        await saveUserProfile(fbUser.uid, profile);
      } else {
        const existingProfile = await loadUserProfile(fbUser.uid);
        if (existingProfile?.name) {
          profile.name = existingProfile.name;
        }
      }

      onAuth(profile);
    } catch (err: any) {
      console.error('[Firebase Auth]', err);
      const msg = err?.message || '';
      if (msg.includes('email-already-in-use')) {
        setErrorMsg('That email is already registered. Try signing in instead.');
      } else if (msg.includes('invalid-credential') || msg.includes('wrong-password') || msg.includes('user-not-found')) {
        setErrorMsg('Invalid email or password. Please check and try again.');
      } else if (msg.includes('weak-password')) {
        setErrorMsg('Password is too weak. Use at least 6 characters.');
      } else if (msg.includes('invalid-email')) {
        setErrorMsg('Please enter a valid email address.');
      } else {
        setErrorMsg('Authentication failed. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-screen">
      <div className="auth-card">
        <h2>Go Green</h2>
        <p className="auth-sub">Elite Autoflower Grow Guide</p>

        <div className="auth-toggle">
          <button
            type="button"
            className={isSignUp ? 'active' : ''}
            onClick={() => { setIsSignUp(true); setErrorMsg(null); }}
          >
            Sign Up
          </button>
          <button
            type="button"
            className={!isSignUp ? 'active' : ''}
            onClick={() => { setIsSignUp(false); setErrorMsg(null); }}
          >
            Sign In
          </button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {isSignUp && (
            <label>
              Name
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                autoComplete="name"
                required={isSignUp}
              />
            </label>
          )}

          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              required
            />
          </label>

          <label>
            Password
            <div className="password-wrap">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                autoComplete={isSignUp ? 'new-password' : 'current-password'}
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword((v) => !v)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </label>

          {errorMsg && <p className="auth-error">{errorMsg}</p>}

          <button type="submit" className="btn-primary auth-submit" disabled={isSubmitting}>
            {isSubmitting ? 'Please wait...' : isSignUp ? 'Create Account' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}

export { signOut };
