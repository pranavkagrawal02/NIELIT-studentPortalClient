export function initialTheme() {
  const saved = window.localStorage.getItem('sp-theme');
  if (saved) return saved;
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}
