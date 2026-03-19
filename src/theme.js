export const THEME_STORAGE_KEY = 'salespilot_theme';

export function normalizeTheme(value) {
  return value === 'light' || value === 'dark' ? value : null;
}

export function getSystemTheme() {
  if (typeof window === 'undefined') return 'dark';
  const mql = window.matchMedia?.('(prefers-color-scheme: light)');
  return mql?.matches ? 'light' : 'dark';
}

export function getStoredTheme() {
  if (typeof window === 'undefined') return null;
  return normalizeTheme(window.localStorage?.getItem(THEME_STORAGE_KEY));
}

export function getEffectiveTheme() {
  return getStoredTheme() ?? getSystemTheme();
}

export function applyTheme(theme) {
  if (typeof document === 'undefined') return;
  const nextTheme = normalizeTheme(theme) ?? getSystemTheme();
  document.documentElement.dataset.theme = nextTheme;
}

export function setStoredTheme(theme) {
  if (typeof window === 'undefined') return;
  const nextTheme = normalizeTheme(theme) ?? getSystemTheme();
  window.localStorage?.setItem(THEME_STORAGE_KEY, nextTheme);
}

