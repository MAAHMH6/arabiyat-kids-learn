import posthog from 'posthog-js';

// PostHog Configuration
// Project Token: phc_kj8aTogANVXMt7WqTyQpzKo6JqBSNJKY2WwFM7v9awZk
// Project ID: 602727
// Region: US Cloud (https://us.i.posthog.com)
export const POSTHOG_KEY =
  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env['VITE_POSTHOG_KEY']) ||
  'phc_kj8aTogANVXMt7WqTyQpzKo6JqBSNJKY2WwFM7v9awZk';

export const POSTHOG_HOST =
  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env['VITE_POSTHOG_HOST']) ||
  'https://us.i.posthog.com';

export const POSTHOG_PROJECT_ID =
  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env['VITE_POSTHOG_PROJECT_ID']) ||
  '602727';

let isInitialized = false;

/**
 * Initialize PostHog client library.
 * Safe to call multiple times; only initializes once in the browser.
 */
export function initPostHog(): void {
  if (typeof window === 'undefined' || isInitialized) return;

  try {
    posthog.init(POSTHOG_KEY, {
      api_host: POSTHOG_HOST,
      person_profiles: 'always', // Always create and associate person profiles
      capture_pageview: true,
      capture_pageleave: true,
      autocapture: true,
      persistence: 'localStorage+cookie',
    });
    isInitialized = true;
  } catch (err) {
    console.error('Failed to initialize PostHog:', err);
  }
}

/**
 * Identify a user in PostHog when they log in.
 * CRITICAL REQUIREMENT:
 * "when a person logins its email must be visible instead of name in posthog"
 *
 * To ensure the email is displayed everywhere instead of their name:
 * 1. distinct_id is set to user's email.
 * 2. $name and name person properties are set to user's email.
 * 3. $email and email person properties are set to user's email.
 */
export function identifyUser(user: {
  email: string;
  role?: string;
  orgId?: string;
  id?: string;
}): void {
  if (typeof window === 'undefined') return;

  // Ensure PostHog is initialized
  initPostHog();

  const cleanEmail = user.email ? user.email.trim().toLowerCase() : '';
  if (!cleanEmail) return;

  try {
    // PostHog uses $name or name to display the person in the dashboard.
    // By setting $name, name, and distinct_id to the user's email,
    // the email is permanently visible instead of any display name.
    posthog.identify(cleanEmail, {
      $name: cleanEmail,
      name: cleanEmail,
      email: cleanEmail,
      $email: cleanEmail,
      role: user.role || 'user',
      org_id: user.orgId || '',
      internal_id: user.id || '',
    });

    // Register super properties so all subsequent events also carry the email
    posthog.register({
      user_email: cleanEmail,
      user_role: user.role || 'user',
    });

    // Track explicit login event
    posthog.capture('user_logged_in', {
      email: cleanEmail,
      role: user.role || 'user',
    });
  } catch (err) {
    console.error('PostHog identify error:', err);
  }
}

/**
 * Reset PostHog user identity on logout.
 */
export function resetUser(): void {
  if (typeof window === 'undefined') return;
  try {
    posthog.capture('user_logged_out');
    posthog.reset();
  } catch (err) {
    console.error('PostHog reset error:', err);
  }
}

export { posthog };
